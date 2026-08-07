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

const messages: ContactMessageRecord[] = [];

export function createContactMessage(input: ContactMessageInput): ContactMessageRecord {
  const record: ContactMessageRecord = {
    ...input,
    id: crypto.randomUUID(),
    status: "queued",
    createdAt: new Date().toISOString(),
  };
  messages.unshift(record);
  return record;
}

export function listContactMessages() {
  return [...messages];
}
