/**
 * Seed Sinter Studio projects into Sanity.
 *
 * Run from apps/studio after `sanity login`:
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * Or with a write token in env:
 *   SANITY_TOKEN=sk... npx tsx scripts/seed.ts
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_TOKEN ?? process.env.SANITY_STUDIO_TOKEN ?? "",
  useCdn: false,
});

type ProjectSeed = {
  title: string;
  slug: string;
  client?: string;
  year: number;
  member: "lucas" | "rory" | "claude" | "both" | "lucas_claude" | "rory_claude" | "all";
  roles: string[];
  tags: string[];
  summary: string;
  coverUrl: string;
  mediaType: "image" | "video";
  order: number;
  featured?: boolean;
  externalGallery?: string[];
  links?: { label: string; url: string }[];
  credits?: { role: string; name: string; url?: string }[];
};

const projects: ProjectSeed[] = [
  // ── 2026 ───────────────────────────────────────────────────────────────────
  {
    title: "Vol.2 — Digital Launch",
    slug: "vol2-store",
    client: "Vol.2",
    year: 2026,
    member: "lucas_claude",
    roles: ["Web Design", "E-commerce", "Sanity CMS", "Motion Design"],
    tags: ["Fashion", "E-commerce", "Web"],
    summary: "End-to-end digital build for Vol.2 — a Naarm-based nongendered fashion label. Headless Sanity-powered storefront with motion-first landing, launched with the VOL.2 26 collection.",
    coverUrl: "https://general-video-bucket.s3.ap-southeast-2.amazonaws.com/IntroVideo_15fps_crf38.webm",
    mediaType: "video",
    order: 1,
    featured: true,
    externalGallery: [
      "https://cdn.sanity.io/images/61n02f5m/production/c7e8081548188c4478f433651962a844713c1610-4225x6337.png",
      "https://cdn.sanity.io/images/61n02f5m/production/4d272b40f6932aea027d59afdb03ff21466df5f0-4218x6327.png",
      "https://cdn.sanity.io/images/61n02f5m/production/189008147f4ba8fad347aa364ef3d43f8b74fcfa-4222x6333.png",
      "https://cdn.sanity.io/images/61n02f5m/production/e9d0da7b0bf07293b6d342a08d52758cca891b1f-4292x6438.png",
    ],
    credits: [
      {
        role: "Intro Animation",
        name: "Claude Zhang",
        url: "https://www.linkedin.com/in/claude-zhang-75bb99259/",
      },
    ],
    links: [{ label: "Visit site", url: "https://vol2.store" }],
  },

  // ── 2025 ───────────────────────────────────────────────────────────────────
  {
    title: "Masseuse Massage Chairs — RDP Campaign",
    slug: "masseuse-rdp",
    client: "Masseuse Massage Chairs",
    year: 2025,
    member: "rory",
    roles: ["VFX", "Compositing"],
    tags: ["Commercial", "VFX"],
    summary: "VFX compositing and motion design for Masseuse Massage Chairs' RDP campaign.",
    coverUrl: "https://www.skrumcious.com/videos/RDP%20Features%20VFX%20MASTER%20V3%20Denoised%20250808.mp4",
    mediaType: "video",
    order: 1,
    featured: true,
  },
  {
    title: "Masseuse Massage Chairs — Physio+",
    slug: "masseuse-physio",
    client: "Masseuse Massage Chairs",
    year: 2025,
    member: "rory",
    roles: ["VFX", "Compositing"],
    tags: ["Commercial", "VFX"],
    summary: "Full VFX suite for the Physio+ range — product visualisation and environment compositing.",
    coverUrl: "https://www.skrumcious.com/videos/Physio+%20Features%20VFX%20MASTER.mp4",
    mediaType: "video",
    order: 2,
  },
  {
    title: "Vision Street Wear — FW2025",
    slug: "vision-street-wear-fw2025",
    client: "Vision Street Wear",
    year: 2025,
    member: "rory",
    roles: ["Producer", "Casting Director", "Photography"],
    tags: ["Fashion", "Photography"],
    summary: "FW2025 campaign produced and shot on 35mm film.",
    coverUrl: "https://www.skrumcious.com/images/vision%20bts%20shots/vision%20shoe%20detail%20cu.JPG",
    mediaType: "image",
    order: 3,
  },
  {
    title: "Hall & Hart — TAG",
    slug: "hall-hart-tag",
    client: "TAG Studios",
    year: 2025,
    member: "lucas",
    roles: ["Motion Graphics", "Architecture Visualisation"],
    tags: ["Architecture", "Motion"],
    summary: "Bringing architecture to life through motion — a campaign for Hall & Hart's TAG development.",
    coverUrl: "https://general-video-bucket.s3.ap-southeast-2.amazonaws.com/BridgeHouse_Square_Hall%2BHart_14s_1080square_web.mp4",
    mediaType: "video",
    order: 4,
  },
  {
    title: "Found Huntingdale",
    slug: "found-huntingdale",
    client: "TAG Studios",
    year: 2025,
    member: "lucas",
    roles: ["Motion Graphics", "Scalable Systems"],
    tags: ["Branding", "Motion"],
    summary: "Scalable motion graphics for Found's Huntingdale development — adaptable After Effects workflows across social platforms.",
    coverUrl: "https://general-video-bucket.s3.ap-southeast-2.amazonaws.com/FoundHuntingdale.mp4",
    mediaType: "video",
    order: 5,
  },

  // ── 2024 ───────────────────────────────────────────────────────────────────
  {
    title: "AP Dhillon & Shinda Kahlon — HITMEN",
    slug: "hitmen-music-video",
    client: "AP Dhillon / Shinda Kahlon",
    year: 2024,
    member: "rory",
    roles: ["VFX", "Roto", "Compositing"],
    tags: ["Music Video", "VFX"],
    summary: "VFX and roto compositing for the HITMEN official music video.",
    coverUrl: "https://www.skrumcious.com/videos/dhillon%20Shinda%20rotojob.mp4",
    mediaType: "video",
    order: 6,
  },
  {
    title: "RDCworld Creator League — CGI Trailer",
    slug: "rdcworld-cgi-trailer",
    client: "RDCworld",
    year: 2024,
    member: "rory",
    roles: ["CGI", "3D Animation", "Crowd Simulation"],
    tags: ["Trailer", "CGI", "3D"],
    summary: "CGI trailer with real-time crowd simulation for the RDCworld Creator League.",
    coverUrl: "https://www.skrumcious.com/videos/RDC%20WORLD%20CGI%20TRAILER.mp4",
    mediaType: "video",
    order: 7,
  },
  {
    title: "Liquid Simulation — Houdini",
    slug: "liquid-simulation-houdini",
    year: 2024,
    member: "rory",
    roles: ["3D", "Houdini", "VFX"],
    tags: ["Personal", "3D", "Houdini"],
    summary: "Houdini-based fluid simulation study — full moon over Ninh Binh.",
    coverUrl: "https://www.skrumcious.com/videos/Full%20Moon%20Ninh%20Binh.mp4",
    mediaType: "video",
    order: 8,
  },
  {
    title: "Existential Crisis — ISEA Symposium",
    slug: "existential-crisis-isea",
    client: "RMIT / ISEA Symposium",
    year: 2024,
    member: "lucas",
    roles: ["XR", "Motion Design", "Interactive"],
    tags: ["VR", "Exhibition"],
    summary: "An interactive VR experience exploring themes of existential crisis, exhibited at the ISEA International Symposium on Electronic Art at RMIT.",
    coverUrl: "https://general-video-bucket.s3.ap-southeast-2.amazonaws.com/Existential.mp4",
    mediaType: "video",
    order: 9,
  },
  {
    title: "Paris Online",
    slug: "paris-online",
    year: 2024,
    member: "lucas",
    roles: ["Web Design", "Editorial", "Motion"],
    tags: ["Editorial", "Web"],
    summary: "A web-based editorial platform — part magazine, part gallery — exploring digital culture and online image-making.",
    coverUrl: "https://general-video-bucket.s3.ap-southeast-2.amazonaws.com/ParisOnline.mp4",
    mediaType: "video",
    order: 10,
  },
  {
    title: "Hanoi Adhoc",
    slug: "hanoi-adhoc",
    year: 2024,
    member: "lucas",
    roles: ["XR", "Architecture Visualisation"],
    tags: ["VR", "Architecture", "Personal"],
    summary: "A VR archive documenting the informal, adaptive architecture of Hanoi's streetscape — preserving ephemeral urban structures in virtual space.",
    coverUrl: "https://general-video-bucket.s3.ap-southeast-2.amazonaws.com/HanoiAdhoc.mp4",
    mediaType: "video",
    order: 11,
  },

  // ── 2021 ───────────────────────────────────────────────────────────────────
  {
    title: "Draining",
    slug: "draining",
    year: 2021,
    member: "lucas",
    roles: ["Motion Design", "Direction"],
    tags: ["Music Video"],
    summary: "Motion design and visual direction for the music video Draining.",
    coverUrl: "https://general-video-bucket.s3.ap-southeast-2.amazonaws.com/Draining.mp4",
    mediaType: "video",
    order: 12,
  },
];

async function seed() {
  console.log(`Seeding ${projects.length} projects to ${client.config().projectId}/${client.config().dataset}…\n`);

  for (const p of projects) {
    const doc = {
      _type: "project",
      _id: `project-${p.slug}`,
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      ...(p.client && { client: p.client }),
      year: p.year,
      member: p.member,
      roles: p.roles,
      tags: p.tags,
      summary: p.summary,
      coverUrl: p.coverUrl,
      mediaType: p.mediaType,
      order: p.order,
      featured: p.featured ?? false,
      ...(p.externalGallery && { externalGallery: p.externalGallery }),
      ...(p.links && {
        links: p.links.map((l, i) => ({
          _type: "link",
          _key: `link-${i}`,
          label: l.label,
          url: l.url,
        })),
      }),
      ...(p.credits && {
        credits: p.credits.map((c, i) => ({
          _type: "credit",
          _key: `credit-${i}`,
          role: c.role,
          name: c.name,
          ...(c.url && { url: c.url }),
        })),
      }),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${p.title}`);
    } catch (err) {
      console.error(`  ✗ ${p.title}`, (err as Error).message);
    }
  }

  console.log("\nDone.");
}

seed();
