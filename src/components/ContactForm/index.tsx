"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { fadeUpAnimation } from "@/lib/animations";
import { Button } from "../Button";
import { SectionTitle } from "../SectionTitle";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFormCopy {
  buttons: {
    send: string;
    sent: string;
  };
  feedback: {
    errorMessage: string;
    successMessage: string;
  };
  fields: {
    emailPlaceholder?: string;
    messagePlaceholder: string;
    namePlaceholder: string;
  };
}

type ContactFormStatus = "idle" | "success";

interface ContactFormContextValue {
  copy: ContactFormCopy;
  handleSubmit: ReturnType<typeof useForm<ContactFormData>>["handleSubmit"];
  isSubmitting: boolean;
  onSubmit: (data: ContactFormData) => Promise<void>;
  register: ReturnType<typeof useForm<ContactFormData>>["register"];
  status: ContactFormStatus;
}

const ContactFormContext = createContext<ContactFormContextValue | undefined>(
  undefined
);

function useContactFormContext() {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error(
      "ContactForm compound components must be inside ContactForm.Root"
    );
  }

  return context;
}

interface ContactFormRootProps {
  children: ReactNode;
  copy: ContactFormCopy;
}

function ContactFormRoot({ children, copy }: ContactFormRootProps) {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
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
        toast.success(copy.feedback.successMessage);
        reset();
        setTimeout(() => setStatus("idle"), 1500);
      } catch {
        toast.error(copy.feedback.errorMessage);
      }
    },
    [copy.feedback.errorMessage, copy.feedback.successMessage, reset]
  );

  const contextValue = useMemo(
    () => ({
      copy,
      handleSubmit,
      isSubmitting,
      onSubmit,
      register,
      status,
    }),
    [copy, handleSubmit, isSubmitting, onSubmit, register, status]
  );

  return (
    <ContactFormContext.Provider value={contextValue}>
      <section className="py-20 sm:py-24" id="contact">
        <div className="container">
          <div className="mx-auto max-w-2xl">{children}</div>
        </div>
      </section>
    </ContactFormContext.Provider>
  );
}

interface ContactFormTitleProps {
  className?: string;
  subtitle: string;
  title: string;
}

function ContactFormTitle({
  title,
  subtitle,
  className = "items-center text-center",
}: ContactFormTitleProps) {
  return (
    <SectionTitle className={className} subtitle={subtitle} title={title} />
  );
}

interface ContactFormPanelProps {
  children: ReactNode;
}

function ContactFormPanel({ children }: ContactFormPanelProps) {
  return (
    <motion.div className="mt-10" {...fadeUpAnimation}>
      <Card className="glass-panel">
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

interface ContactFormFormProps {
  children: ReactNode;
}

function ContactFormForm({ children }: ContactFormFormProps) {
  const { handleSubmit, onSubmit } = useContactFormContext();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}

function ContactFormFields() {
  const { copy, register } = useContactFormContext();

  return (
    <>
      <Input
        autoComplete="name"
        placeholder={copy.fields.namePlaceholder}
        {...register("name")}
      />
      <Input
        autoComplete="email"
        placeholder={copy.fields.emailPlaceholder ?? "Email"}
        type="email"
        {...register("email")}
      />
      <Textarea
        maxLength={500}
        placeholder={copy.fields.messagePlaceholder}
        {...register("message")}
      />
    </>
  );
}

function ContactFormSubmitButton() {
  const { copy, isSubmitting, status } = useContactFormContext();

  return (
    <Button className="mt-2 self-start" disabled={isSubmitting}>
      {status === "success" ? (
        <>
          <CheckCircle className="h-4 w-4" />
          {copy.buttons.sent}
        </>
      ) : (
        <>
          {copy.buttons.send}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export const ContactForm = {
  Root: ContactFormRoot,
  Title: ContactFormTitle,
  Panel: ContactFormPanel,
  Form: ContactFormForm,
  Fields: ContactFormFields,
  SubmitButton: ContactFormSubmitButton,
};
