"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fadeUpAnimation } from "@/lib/animations";
import { Button } from "../Button";
import { SectionTitle } from "../SectionTitle";

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  buttonSend: string;
  buttonSent: string;
  messageError: string;
  messageSuccess: string;
  nameMessage: string;
  subtitleContactForm: string;
  textMessage: string;
  titleContactForm: string;
}

export function ContactForm({
  titleContactForm,
  subtitleContactForm,
  messageSuccess,
  messageError,
  nameMessage,
  textMessage,
  buttonSent,
  buttonSend,
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setStatus("success");
      toast.success(messageSuccess);
      reset();
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      toast.error(messageError);
    }
  }

  return (
    <section className="py-20 sm:py-24" id="contact">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <SectionTitle
            className="items-center text-center"
            subtitle={subtitleContactForm}
            title={titleContactForm}
          />

          <motion.div className="mt-10" {...fadeUpAnimation}>
            <Card className="glass-panel">
              <CardContent className="pt-6">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    autoComplete="name"
                    placeholder={nameMessage}
                    {...register("name")}
                  />
                  <Input
                    autoComplete="email"
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  />
                  <Textarea
                    maxLength={500}
                    placeholder={textMessage}
                    {...register("message")}
                  />

                  <Button className="mt-2 self-start" disabled={isSubmitting}>
                    {status === "success" ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        {buttonSent}
                      </>
                    ) : (
                      <>
                        {buttonSend}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
