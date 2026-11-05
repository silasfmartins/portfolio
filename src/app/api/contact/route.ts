import { type NextRequest, NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";

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
