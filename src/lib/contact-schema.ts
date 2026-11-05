import { z } from "zod";

/** Shared by the form and the API route, so both accept exactly the same data. */
export const contactSchema = z.object({
  email: z.email(),
  message: z.string().trim().min(1).max(500),
  name: z.string().trim().min(3).max(100),
  /** Honeypot: hidden from people, so a filled value means a bot. */
  website: z.string().optional(),
});

export type ContactData = z.infer<typeof contactSchema>;
