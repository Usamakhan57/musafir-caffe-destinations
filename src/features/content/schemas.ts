import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(4000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export interface ContactMessageRecord extends ContactMessageInput {
  id: string;
  status: "new" | "queued" | "closed";
  createdAt: string;
}
