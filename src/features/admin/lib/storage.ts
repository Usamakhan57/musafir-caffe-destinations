import "server-only";

import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type UploadResult = {
  url: string;
  storagePath: string;
  provider: "supabase" | "local";
};

function supabaseReady() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Upload an image buffer to Supabase Storage when configured,
 * otherwise persist under public/uploads for local/dev fallback.
 */
export async function uploadAdminMedia(input: {
  bytes: Buffer;
  filename: string;
  mimeType: string;
  folder: string;
}): Promise<UploadResult> {
  const safeFolder = input.folder.replace(/[^a-zA-Z0-9/_-]/g, "") || "uploads";
  const safeName = `${Date.now()}-${input.filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const storagePath = `${safeFolder}/${safeName}`;

  if (supabaseReady()) {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "media";
    const { error } = await supabase.storage.from(bucket).upload(storagePath, input.bytes, {
      contentType: input.mimeType,
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
    return { url: data.publicUrl, storagePath, provider: "supabase" };
  }

  const publicDir = path.join(process.cwd(), "public", "uploads", safeFolder);
  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, safeName), input.bytes);
  return {
    url: `/uploads/${safeFolder}/${safeName}`,
    storagePath,
    provider: "local",
  };
}

export async function deleteAdminMediaObject(storagePath: string | null | undefined, provider?: string) {
  if (!storagePath) return;
  if (provider === "supabase" && supabaseReady()) {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "media";
    await supabase.storage.from(bucket).remove([storagePath]);
  }
}
