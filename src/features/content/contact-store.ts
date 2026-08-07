import "server-only";

import { createContactMessage as createContactMessageDb } from "@/server/db";

import type { ContactMessageInput, ContactMessageRecord } from "./schemas";

export type { ContactMessageInput, ContactMessageRecord } from "./schemas";
export { contactMessageSchema } from "./schemas";

const fallback: ContactMessageRecord[] = [];

export async function createContactMessage(
  input: ContactMessageInput,
): Promise<ContactMessageRecord> {
  const row = await createContactMessageDb(input);
  if (row) {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      status: "queued",
      createdAt: row.createdAt.toISOString(),
    };
  }
  const record: ContactMessageRecord = {
    ...input,
    id: crypto.randomUUID(),
    status: "queued",
    createdAt: new Date().toISOString(),
  };
  fallback.unshift(record);
  return record;
}

export function listContactMessages() {
  return [...fallback];
}
