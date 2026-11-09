import { type NextRequest, NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { isRateLimited } from "@/lib/rate-limit";

const MAX_MESSAGES = 5;
const WINDOW_MS = 10 * 60 * 1000;

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const parsed = contactSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dados de contato invalidos." },
        { status: 400 }
      );
    }

    const { email, message, name, website } = parsed.data;

    // Bots get a normal answer, but nothing is delivered.
    if (website) {
      return NextResponse.json({ message: "Mensagem enviada com sucesso!" });
    }

    // Only messages that would really be delivered count towards the limit.
    if (isRateLimited(getClientIp(request), MAX_MESSAGES, WINDOW_MS)) {
      return NextResponse.json(
        { message: "Muitas mensagens em pouco tempo. Tente mais tarde." },
        { status: 429 }
      );
    }

    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { message: "Webhook URL nao configurada no ambiente." },
        { status: 503 }
      );
    }

    const messageData = {
      embeds: [
        {
          color: 0x49_83_f5,
          fields: [
            {
              inline: true,
              name: "Nome",
              value: name,
            },
            {
              inline: true,
              name: "E-mail",
              value: email,
            },
            {
              name: "Mensagem",
              value: message,
            },
          ],
          title: "Mensagem de Contato",
        },
      ],
    };

    const webhookResponse = await fetch(webhookUrl, {
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { message: "Falha ao enviar a mensagem para o webhook." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Mensagem enviada com sucesso!",
    });
  } catch {
    return NextResponse.json(
      { message: "Erro interno ao processar a solicitacao." },
      { status: 500 }
    );
  }
}
