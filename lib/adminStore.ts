import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import {
  seedBoardPosts,
  seedContactEntries,
  seedWorks,
  type ContactEntry,
  type EventPost,
  type WorkDraft,
  summarizeContactInsights,
} from "@/lib/adminData";

export type AdminStore = {
  works: WorkDraft[];
  boardPosts: EventPost[];
  contacts: ContactEntry[];
};

const storePath = path.join(process.cwd(), "data", "admin-store.json");

const defaultStore: AdminStore = {
  works: seedWorks,
  boardPosts: seedBoardPosts,
  contacts: seedContactEntries,
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function persistArtworkImage(image: string, id: string) {
  if (!supabase || !image.startsWith("data:")) {
    return image;
  }

  const match = image.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/);
  if (!match) {
    throw new Error("Artwork images must be PNG, JPG, JPEG, or WebP files.");
  }

  const contentType = match[1] === "image/jpg" ? "image/jpeg" : match[1];
  const extension = contentType === "image/jpeg" ? "jpg" : contentType.split("/")[1];
  const path = `works/${id}.${extension}`;
  const { error } = await supabase.storage.from("artwork-images").upload(path, Buffer.from(match[2], "base64"), {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new Error(`Artwork image upload failed: ${error.message}`);
  }

  return supabase.storage.from("artwork-images").getPublicUrl(path).data.publicUrl;
}

async function ensureLocalStore() {
  await fs.mkdir(path.dirname(storePath), { recursive: true });

  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(defaultStore, null, 2), "utf8");
  }
}

async function readLocalStore(): Promise<AdminStore> {
  await ensureLocalStore();

  const raw = await fs.readFile(storePath, "utf8");

  try {
    const parsed = JSON.parse(raw) as Partial<AdminStore>;
    return {
      works: parsed.works ?? defaultStore.works,
      boardPosts: parsed.boardPosts ?? defaultStore.boardPosts,
      contacts: parsed.contacts ?? defaultStore.contacts,
    };
  } catch {
    await fs.writeFile(storePath, JSON.stringify(defaultStore, null, 2), "utf8");
    return defaultStore;
  }
}

async function writeLocalStore(nextStore: AdminStore) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(nextStore, null, 2), "utf8");
}

async function getRemoteStore(): Promise<AdminStore | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("admin_store").select("content").maybeSingle();

  if (error) {
    if (error.code !== "PGRST116") {
      console.warn("Supabase admin_store read failed:", error.message);
    }
    return null;
  }

  if (!data?.content) {
    return null;
  }

  const parsed = data.content as Partial<AdminStore>;

  // Supabase's initial seed row is intentionally empty. Bootstrap it from the
  // repository seed once, then persist the first admin action back remotely.
  const isEmptySeed =
    Array.isArray(parsed.works) && parsed.works.length === 0 &&
    Array.isArray(parsed.boardPosts) && parsed.boardPosts.length === 0 &&
    Array.isArray(parsed.contacts) && parsed.contacts.length === 0;

  if (isEmptySeed) {
    return defaultStore;
  }

  return {
    works: parsed.works ?? defaultStore.works,
    boardPosts: parsed.boardPosts ?? defaultStore.boardPosts,
    contacts: parsed.contacts ?? defaultStore.contacts,
  };
}

async function saveRemoteStore(nextStore: AdminStore) {
  if (!supabase) {
    return false;
  }

  const { error } = await supabase
    .from("admin_store")
    .upsert({ id: "default", content: nextStore }, { onConflict: "id" });

  if (error) {
    console.warn("Supabase admin_store write failed:", error.message);
    throw new Error(`Supabase admin_store write failed: ${error.message}`);
  }

  return true;
}

export async function getAdminStore(): Promise<AdminStore> {
  const remoteStore = await getRemoteStore();
  if (remoteStore) {
    return remoteStore;
  }

  return readLocalStore();
}

export async function saveAdminStore(nextStore: AdminStore) {
  const remoteSaved = await saveRemoteStore(nextStore);
  if (remoteSaved) {
    return;
  }

  await writeLocalStore(nextStore);
}

export async function listWorks() {
  const store = await getAdminStore();
  return store.works;
}

export async function listBoardPosts() {
  const store = await getAdminStore();
  return store.boardPosts;
}

export async function createWork(input: Partial<WorkDraft>) {
  const store = await getAdminStore();
  const id = input.id ?? `w-${Date.now()}`;
  const image = await persistArtworkImage(input.image ?? "/works/devilish-face.svg", id);

  const work: WorkDraft = {
    id,
    slug: input.slug ?? `${(input.title ?? "untitled-work").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`,
    source: input.source ?? "admin",
    submitter: input.submitter,
    artworkSlug: input.artworkSlug,
    title: input.title ?? "Untitled work",
    year: input.year ?? new Date().getFullYear(),
    technique: input.technique ?? "Community submission",
    image,
    imageWidth: input.imageWidth ?? 1200,
    imageHeight: input.imageHeight ?? 1500,
    description: input.description ?? { en: "A community-submitted unfinished work.", ja: "コミュニティから投稿された未完成の作品です。" },
    status: input.status ?? "Pending",
  };

  store.works = [work, ...store.works];
  await saveAdminStore(store);
  return work;
}

export async function deleteWork(id: string) {
  const store = await getAdminStore();
  store.works = store.works.filter((item) => item.id !== id);
  await saveAdminStore(store);
}

export async function updateWorkStatus(id: string, status: WorkDraft["status"]) {
  const store = await getAdminStore();
  const work = store.works.find((item) => item.id === id);

  if (!work) return null;

  work.status = status;
  await saveAdminStore(store);
  return work;
}

export async function createBoardPost(input: Partial<EventPost>) {
  const store = await getAdminStore();

  const post: EventPost = {
    id: input.id ?? `b-${Date.now()}`,
    title: input.title ?? "Untitled event",
    date: input.date ?? new Date().toISOString().slice(0, 10),
    type: input.type ?? "Workshop",
    description: input.description ?? "",
  };

  store.boardPosts = [post, ...store.boardPosts];
  await saveAdminStore(store);
  return post;
}

export async function getDashboardSnapshot() {
  const store = await getAdminStore();

  return {
    insights: summarizeContactInsights(store.contacts),
    works: store.works,
    boardPosts: store.boardPosts,
  };
}
