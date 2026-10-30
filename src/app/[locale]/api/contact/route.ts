import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  message: z.string(),
  name: z.string(),
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
