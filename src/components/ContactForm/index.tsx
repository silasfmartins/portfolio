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
import { type FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardContent,
  Field,
  Input,
  Textarea,
} from "@/components/ui";
import { fadeUpAnimation } from "@/lib/animations";
import { type ContactData, contactSchema } from "@/lib/contact-schema";
import { Link } from "@/navigation";
import { SectionTitle } from "../SectionTitle";

export interface ContactFormCopy {
  buttons: {
    send: string;
    sent: string;
  };
  errors: {
    email: string;
    message: string;
    name: string;
  };
  feedback: {
    errorMessage: string;
    successMessage: string;
  };
  fields: {
    email: string;
    message: string;
    name: string;
  };
  privacy: {
    link: string;
    notice: string;
  };
}

type ContactFormStatus = "idle" | "success";

interface ContactFormContextValue {
  copy: ContactFormCopy;
  errors: FieldErrors<ContactData>;
  handleSubmit: ReturnType<typeof useForm<ContactData>>["handleSubmit"];
  isSubmitting: boolean;
  onSubmit: (data: ContactData) => Promise<void>;
  register: ReturnType<typeof useForm<ContactData>>["register"];
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

export function ContactFormRoot({ children, copy }: ContactFormRootProps) {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = useCallback(
    async (data: ContactData) => {
      try {
        const response = await fetch("/api/contact", {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
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
      errors,
      handleSubmit,
      isSubmitting,
      onSubmit,
      register,
      status,
    }),
    [copy, errors, handleSubmit, isSubmitting, onSubmit, register, status]
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

export function ContactFormTitle({
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

export function ContactFormPanel({ children }: ContactFormPanelProps) {
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

export function ContactFormForm({ children }: ContactFormFormProps) {
  const { handleSubmit, onSubmit } = useContactFormContext();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}

export function ContactFormFields() {
  const { copy, errors, register } = useContactFormContext();

  return (
    <>
      <Field error={errors.name && copy.errors.name} label={copy.fields.name}>
        <Input
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
          {...register("name")}
        />
      </Field>
      <Field
        error={errors.email && copy.errors.email}
        label={copy.fields.email}
      >
        <Input
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          type="email"
          {...register("email")}
        />
      </Field>
      <Field
        error={errors.message && copy.errors.message}
        label={copy.fields.message}
      >
        <Textarea
          aria-invalid={Boolean(errors.message)}
          maxLength={500}
          {...register("message")}
        />
      </Field>
      <input
        aria-hidden
        autoComplete="off"
        className="hidden"
        tabIndex={-1}
        {...register("website")}
      />
      <p className="text-muted-foreground text-xs">
        {copy.privacy.notice}{" "}
        <Link className="text-primary underline" href="/privacy">
          {copy.privacy.link}
        </Link>
      </p>
    </>
  );
}

export function ContactFormSubmitButton() {
  const { copy, isSubmitting, status } = useContactFormContext();

  return (
    <Button className="mt-2 self-start" disabled={isSubmitting} type="submit">
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
