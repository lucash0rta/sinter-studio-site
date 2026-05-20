import { createClient, type ClientConfig } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "astro:env/server";

const config: ClientConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: import.meta.env.PROD,
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);

export type ProjectSummary = {
  _id: string;
  title: string;
  slug: { current: string };
  year?: number;
  client?: string;
  summary?: string;
  cover?: SanityImageSource;
  coverUrl?: string;
  mediaType?: "image" | "video";
  member?: "lucas" | "rory" | "both";
  tags?: string[];
  roles?: string[];
};

export type ProjectDetail = ProjectSummary & {
  roles?: string[];
  body?: unknown;
  gallery?: Array<{ _key: string; asset: SanityImageSource; caption?: string }>;
  externalGallery?: string[];
  videos?: Array<{ _key: string; url: string; caption?: string }>;
  links?: Array<{ _key: string; label: string; url: string }>;
};

export const projectsQuery = /* groq */ `
  *[_type == "project" && !(_id in path("drafts.**"))] | order(year desc, coalesce(order, 9999) asc) {
    _id, title, slug, year, client, summary, cover, coverUrl, mediaType, member, tags, roles
  }
`;

export const projectBySlugQuery = /* groq */ `
  *[_type == "project" && slug.current == $slug][0]{
    _id, title, slug, year, client, summary, roles, tags, body, cover,
    coverUrl, mediaType, member, externalGallery,
    gallery[]{ _key, asset, caption },
    videos[]{ _key, url, caption },
    links[]{ _key, label, url }
  }
`;
