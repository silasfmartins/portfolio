import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { message: "Webhook URL nao configurada no ambiente." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, message } = bodySchema.parse(body);

    const messageData = {
      embeds: [
        {
          title: "Mensagem de Contato",
          color: 0x49_83_f5,
          fields: [
            {
              name: "Nome",
              value: name,
              inline: true,
            },
            {
              name: "E-mail",
              value: email,
              inline: true,
            },
            {
              name: "Mensagem",
              value: message,
            },
          ],
        },
      ],
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
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
