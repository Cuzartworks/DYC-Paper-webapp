import { getAdminStore } from "@/lib/adminStore";
import { communityPosts, works, type Artwork, type CommunityPost } from "@/lib/content";

function toArtwork(work: {
  slug?: string;
  title: string;
  year: number;
  technique: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  description?: { en: string; ja: string };
}): Artwork | null {
  if (!work.slug) return null;

  return {
    slug: work.slug,
    title: work.title,
    year: work.year,
    technique: work.technique,
    description: work.description ?? { en: "A community-submitted unfinished work.", ja: "コミュニティから投稿された未完成の作品です。" },
    image: work.image,
    width: work.imageWidth ?? 1200,
    height: work.imageHeight ?? 1500,
    download: { jpg: work.image, png: work.image },
  };
}

export async function getPublishedWorks(): Promise<Artwork[]> {
  const store = await getAdminStore();
  const submittedWorks = store.works
    .filter((work) => work.status === "Approved")
    .map(toArtwork)
    .filter((work): work is Artwork => work !== null);

  return [...works, ...submittedWorks.filter((work) => !works.some((existing) => existing.slug === work.slug))];
}

export async function getPublishedWorkBySlug(slug: string): Promise<Artwork | undefined> {
  const publishedWorks = await getPublishedWorks();
  return publishedWorks.find((work) => work.slug === slug);
}

export async function getPublishedFanArt(): Promise<CommunityPost[]> {
  const store = await getAdminStore();
  const submittedFanArt = store.works
    .filter((work) => work.status === "Approved" && work.source === "visitor" && work.artworkSlug)
    .map((work) => ({
      slug: work.slug ?? work.id,
      artworkSlug: work.artworkSlug as string,
      name: work.submitter || "Community artist",
      handle: work.submitter || "community submission",
      image: work.image,
      message: work.description ?? { en: "A community interpretation.", ja: "コミュニティによる解釈です。" },
    }));

  return [...communityPosts, ...submittedFanArt];
}