import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: "home",
        label: "Home Page",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          // ─── Hero ─────────────────────────────────────────────────────────
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              {
                type: "image",
                name: "logo",
                label: "Logo Image",
              },
              {
                type: "string",
                name: "logoAlt",
                label: "Logo Alt Text",
              },
              {
                type: "string",
                name: "brandName",
                label: "Brand Name",
              },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
              },
              {
                type: "string",
                name: "headlineAccent",
                label: "Headline Accent (italic line)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "primaryCta",
                label: "Primary Button",
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link URL",
                  },
                ],
              },
              {
                type: "object",
                name: "secondaryCta",
                label: "Secondary Button",
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link URL",
                  },
                ],
              },
              {
                type: "object",
                name: "socialLinks",
                label: "Social Links",
                fields: [
                  {
                    type: "string",
                    name: "youtubeUrl",
                    label: "YouTube URL",
                  },
                  {
                    type: "string",
                    name: "instagramUrl",
                    label: "Instagram URL",
                  },
                ],
              },
            ],
          },
          // ─── Practitioners ────────────────────────────────────────────────
          {
            type: "object",
            name: "practitionersSection",
            label: "Practitioners Section",
            fields: [
              {
                type: "string",
                name: "sectionLabel",
                label: "Section Label",
              },
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "object",
                name: "practitioners",
                label: "Practitioners",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.name || "Practitioner",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title / Roles",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Bio",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "object",
                    name: "serviceOfferings",
                    label: "Service Offerings",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.service || "Service",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        name: "service",
                        label: "Service Name",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "blurb",
                        label: "Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                      {
                        type: "string",
                        name: "ctaLabel",
                        label: "Button Label",
                      },
                      {
                        type: "string",
                        name: "ctaHref",
                        label: "Button Link URL",
                      },
                      {
                        type: "boolean",
                        name: "ctaExternal",
                        label: "Open Link in New Tab",
                      },
                    ],
                  },
                  {
                    type: "object",
                    name: "upcomingSangas",
                    label: "Upcoming Sangas",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.title || "Sanga",
                      }),
                    },
                    fields: [
                      {
                        type: "image",
                        name: "posterImage",
                        label: "Event Poster Image",
                      },
                      {
                        type: "string",
                        name: "date",
                        label: "Date / Schedule",
                      },
                      {
                        type: "string",
                        name: "title",
                        label: "Event Title",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "detail",
                        label: "Event Detail",
                        ui: {
                          component: "textarea",
                        },
                      },
                      {
                        type: "string",
                        name: "ctaLabel",
                        label: "Button Label",
                      },
                      {
                        type: "string",
                        name: "ctaHref",
                        label: "Button Link URL",
                      },
                      {
                        type: "boolean",
                        name: "ctaExternal",
                        label: "Open Link in New Tab",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // ─── Latest Content (YouTube) ─────────────────────────────────────
          {
            type: "object",
            name: "latestContent",
            label: "Latest Content Section",
            fields: [
              {
                type: "string",
                name: "sectionLabel",
                label: "Section Label",
              },
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "string",
                name: "subscribeLabel",
                label: "Subscribe Link Label",
              },
              {
                type: "string",
                name: "subscribeUrl",
                label: "Subscribe Link URL",
              },
              {
                type: "object",
                name: "videos",
                label: "Featured Videos",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.title || "Video",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "youtubeId",
                    label: "YouTube Video ID",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Video Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Video Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
