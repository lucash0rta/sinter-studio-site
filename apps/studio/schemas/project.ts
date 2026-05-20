import { defineType, defineField, defineArrayMember } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.min(1990).max(2100).integer(),
    }),
    defineField({
      name: "roles",
      title: "Roles",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "Short blurb shown on cards and detail header.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "caption", type: "string", title: "Caption" }],
        }),
      ],
    }),
    defineField({
      name: "cover",
      title: "Cover image (Sanity hosted)",
      description: "Upload an image to Sanity. Leave blank if using Cover URL below.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverUrl",
      title: "Cover URL (external)",
      description: "Direct URL to an externally-hosted image or video. Takes precedence over the uploaded cover image.",
      type: "url",
    }),
    defineField({
      name: "mediaType",
      title: "Cover media type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video (autoplay, muted loop)", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "member",
      title: "Primary member",
      description: "Which Sinter member led this piece?",
      type: "string",
      options: {
        list: [
          { title: "Lucas Horta", value: "lucas" },
          { title: "Rory Henderson", value: "rory" },
          { title: "Both", value: "both" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryItem",
          fields: [
            { name: "asset", type: "image", options: { hotspot: true } },
            { name: "caption", type: "string" },
          ],
          preview: {
            select: { media: "asset", title: "caption" },
          },
        }),
      ],
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "videoItem",
          fields: [
            { name: "url", type: "url", title: "Video URL" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        }),
      ],
    }),
    defineField({
      name: "externalGallery",
      title: "External gallery URLs",
      description: "Direct URLs to externally-hosted images (e.g. CDN, S3). Shown as a grid on the detail page.",
      type: "array",
      of: [defineArrayMember({ type: "url" })],
    }),
    defineField({
      name: "links",
      title: "External links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "url" },
          ],
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first. Leave blank to fall back to year.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "cover" },
  },
});
