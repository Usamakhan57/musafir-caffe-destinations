import "server-only";

import { isDatabaseReady, prisma } from "@/lib/prisma";

function requireDb() {
  return isDatabaseReady();
}

function paginateMeta(total: number, page: number, pageSize: number) {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function dbListHomepage(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q ? { key: { contains: q, mode: "insensitive" as const } } : {};
  const [total, rows] = await Promise.all([
    prisma.homepageContent.count({ where }),
    prisma.homepageContent.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      key: row.key,
      payload: JSON.stringify(row.payload ?? {}, null, 2),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbUpsertHomepage(input: { key: string; payload: string }) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  let parsed: object = {};
  try {
    parsed = JSON.parse(input.payload) as object;
  } catch {
    throw new Error("Invalid JSON payload");
  }
  const row = await prisma.homepageContent.upsert({
    where: { key: input.key },
    create: { key: input.key, payload: parsed },
    update: { payload: parsed },
  });
  return {
    id: row.id,
    key: row.key,
    payload: JSON.stringify(row.payload ?? {}, null, 2),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateHomepage(id: string, patch: { key?: string; payload?: string }) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.homepageContent.findUnique({ where: { id } });
  if (!existing) return null;
  let payload = existing.payload as object;
  if (patch.payload) {
    try {
      payload = JSON.parse(patch.payload) as object;
    } catch {
      throw new Error("Invalid JSON payload");
    }
  }
  const row = await prisma.homepageContent.update({
    where: { id },
    data: { key: patch.key ?? existing.key, payload },
  });
  return {
    id: row.id,
    key: row.key,
    payload: JSON.stringify(row.payload ?? {}, null, 2),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteHomepage(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.homepageContent.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListSeo(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { path: { contains: q, mode: "insensitive" as const } },
          { title: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.seoPage.count({ where }),
    prisma.seoPage.findMany({ where, orderBy: { path: "asc" }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      path: row.path,
      title: row.title,
      description: row.description,
      ogImage: row.ogImage ?? "",
      canonicalUrl: row.canonicalUrl ?? "",
      noIndex: String(row.noIndex),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbCreateSeo(input: {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean | string;
}) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.seoPage.create({
    data: {
      path: input.path,
      title: input.title,
      description: input.description,
      ogImage: input.ogImage || null,
      canonicalUrl: input.canonicalUrl || null,
      noIndex: input.noIndex === true || input.noIndex === "true",
    },
  });
  return {
    id: row.id,
    path: row.path,
    title: row.title,
    description: row.description,
    ogImage: row.ogImage ?? "",
    canonicalUrl: row.canonicalUrl ?? "",
    noIndex: String(row.noIndex),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateSeo(
  id: string,
  patch: Partial<{
    path: string;
    title: string;
    description: string;
    ogImage: string;
    canonicalUrl: string;
    noIndex: boolean | string;
  }>,
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.seoPage.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.seoPage.update({
    where: { id },
    data: {
      path: patch.path ?? existing.path,
      title: patch.title ?? existing.title,
      description: patch.description ?? existing.description,
      ogImage: patch.ogImage === undefined ? existing.ogImage : patch.ogImage || null,
      canonicalUrl:
        patch.canonicalUrl === undefined ? existing.canonicalUrl : patch.canonicalUrl || null,
      noIndex:
        patch.noIndex === undefined
          ? existing.noIndex
          : patch.noIndex === true || patch.noIndex === "true",
    },
  });
  return {
    id: row.id,
    path: row.path,
    title: row.title,
    description: row.description,
    ogImage: row.ogImage ?? "",
    canonicalUrl: row.canonicalUrl ?? "",
    noIndex: String(row.noIndex),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteSeo(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.seoPage.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListSettings(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { key: { contains: q, mode: "insensitive" as const } },
          { label: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.websiteSetting.count({ where }),
    prisma.websiteSetting.findMany({
      where,
      orderBy: { key: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      key: row.key,
      label: row.label,
      value: JSON.stringify(row.value ?? {}, null, 2),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbUpsertSetting(input: { key: string; label: string; value: string }) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  let parsed: object = {};
  try {
    parsed = JSON.parse(input.value) as object;
  } catch {
    parsed = { text: input.value };
  }
  const row = await prisma.websiteSetting.upsert({
    where: { key: input.key },
    create: { key: input.key, label: input.label, value: parsed },
    update: { label: input.label, value: parsed },
  });
  return {
    id: row.id,
    key: row.key,
    label: row.label,
    value: JSON.stringify(row.value ?? {}, null, 2),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateSetting(
  id: string,
  patch: Partial<{ key: string; label: string; value: string }>,
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.websiteSetting.findUnique({ where: { id } });
  if (!existing) return null;
  let value = existing.value as object;
  if (patch.value !== undefined) {
    try {
      value = JSON.parse(patch.value) as object;
    } catch {
      value = { text: patch.value };
    }
  }
  const row = await prisma.websiteSetting.update({
    where: { id },
    data: {
      key: patch.key ?? existing.key,
      label: patch.label ?? existing.label,
      value,
    },
  });
  return {
    id: row.id,
    key: row.key,
    label: row.label,
    value: JSON.stringify(row.value ?? {}, null, 2),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteSettings(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.websiteSetting.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListContact(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
          { message: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbUpdateContact(id: string, patch: Partial<{ status: string }>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.contactMessage.update({
    where: { id },
    data: { status: patch.status ?? existing.status },
  });
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteContact(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.contactMessage.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListNewsletter(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { email: { contains: q, mode: "insensitive" as const } },
          { name: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.newsletterSubscriber.count({ where }),
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      email: row.email,
      name: row.name ?? "",
      status: row.status,
      source: row.source,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbCreateNewsletter(input: {
  email: string;
  name?: string;
  status?: string;
  source?: string;
}) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.newsletterSubscriber.create({
    data: {
      email: input.email,
      name: input.name || null,
      status: input.status ?? "active",
      source: input.source ?? "admin",
    },
  });
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    status: row.status,
    source: row.source,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateNewsletter(
  id: string,
  patch: Partial<{ email: string; name: string; status: string; source: string }>,
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.newsletterSubscriber.update({
    where: { id },
    data: {
      email: patch.email ?? existing.email,
      name: patch.name === undefined ? existing.name : patch.name || null,
      status: patch.status ?? existing.status,
      source: patch.source ?? existing.source,
    },
  });
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    status: row.status,
    source: row.source,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteNewsletter(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.newsletterSubscriber.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListNotifications(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { message: { contains: q, mode: "insensitive" as const } },
          { userId: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.appNotification.count({ where }),
    prisma.appNotification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      kind: row.kind,
      title: row.title,
      message: row.message,
      href: row.href ?? "",
      unread: String(row.unread),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbCreateNotification(input: {
  userId: string;
  kind: string;
  title: string;
  message: string;
  href?: string;
}) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.appNotification.create({
    data: {
      userId: input.userId,
      kind: input.kind,
      title: input.title,
      message: input.message,
      href: input.href || null,
    },
  });
  return {
    id: row.id,
    userId: row.userId,
    kind: row.kind,
    title: row.title,
    message: row.message,
    href: row.href ?? "",
    unread: String(row.unread),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateNotification(
  id: string,
  patch: Partial<{ title: string; message: string; href: string; unread: boolean | string }>,
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.appNotification.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.appNotification.update({
    where: { id },
    data: {
      title: patch.title ?? existing.title,
      message: patch.message ?? existing.message,
      href: patch.href === undefined ? existing.href : patch.href || null,
      unread:
        patch.unread === undefined
          ? existing.unread
          : patch.unread === true || patch.unread === "true",
    },
  });
  return {
    id: row.id,
    userId: row.userId,
    kind: row.kind,
    title: row.title,
    message: row.message,
    href: row.href ?? "",
    unread: String(row.unread),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteNotifications(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.appNotification.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListPayments(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { providerId: { contains: q, mode: "insensitive" as const } },
          { description: { contains: q, mode: "insensitive" as const } },
          { status: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.paymentIntentRecord.count({ where }),
    prisma.paymentIntentRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      providerId: row.providerId,
      userId: row.userId ?? "",
      amount: row.amount,
      currency: row.currency,
      status: row.status,
      description: row.description,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbUpdatePayment(id: string, patch: Partial<{ status: string }>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.paymentIntentRecord.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.paymentIntentRecord.update({
    where: { id },
    data: { status: patch.status ?? existing.status },
  });
  return {
    id: row.id,
    providerId: row.providerId,
    userId: row.userId ?? "",
    amount: row.amount,
    currency: row.currency,
    status: row.status,
    description: row.description,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbListAffiliates(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { network: { contains: q, mode: "insensitive" as const } },
          { category: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.affiliatePartner.count({ where }),
    prisma.affiliatePartner.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      name: row.name,
      network: row.network,
      category: row.category,
      commissionLabel: row.commissionLabel,
      trackingParam: row.trackingParam,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbCreateAffiliate(input: {
  name: string;
  network: string;
  category: string;
  commissionLabel: string;
  trackingParam: string;
}) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.affiliatePartner.create({ data: input });
  return {
    id: row.id,
    name: row.name,
    network: row.network,
    category: row.category,
    commissionLabel: row.commissionLabel,
    trackingParam: row.trackingParam,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateAffiliate(
  id: string,
  patch: Partial<{
    name: string;
    network: string;
    category: string;
    commissionLabel: string;
    trackingParam: string;
  }>,
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.affiliatePartner.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.affiliatePartner.update({
    where: { id },
    data: {
      name: patch.name ?? existing.name,
      network: patch.network ?? existing.network,
      category: patch.category ?? existing.category,
      commissionLabel: patch.commissionLabel ?? existing.commissionLabel,
      trackingParam: patch.trackingParam ?? existing.trackingParam,
    },
  });
  return {
    id: row.id,
    name: row.name,
    network: row.network,
    category: row.category,
    commissionLabel: row.commissionLabel,
    trackingParam: row.trackingParam,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteAffiliates(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.affiliatePartner.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}
