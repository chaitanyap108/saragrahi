import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Set by `npm run dev` via scripts/dev.mjs / .env.development
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// Same-origin proxy defined in next.config.ts (dev only).
// Prefer this over calling :4001 directly so the admin on :3000 never
// needs cross-origin requests and cannot drift back to Tina Cloud.
const localGraphqlProxy = "/api/tina-graphql";

export default defineConfig({
  branch,

  // CRITICAL (local): do NOT pass empty strings.
  // Empty-string clientId/token still count as "defined" and cause Tina to
  // mount Cloud Auth → "TinaCloud config is missing for domain: localhost".
  // Omit credentials entirely in local mode so auth is bypassed.
  clientId: isLocal ? undefined : process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: isLocal ? undefined : process.env.TINA_TOKEN || "",

  // Local: force filesystem GraphQL via Next proxy.
  // Prod/cloud: leave unset so Tina Cloud is used with real credentials.
  contentApiUrlOverride: isLocal ? localGraphqlProxy : undefined,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
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
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
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
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "image", name: "logo", label: "Logo Image" },
              { type: "string", name: "logoAlt", label: "Logo Alt Text" },
              { type: "string", name: "brandName", label: "Brand Name" },
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "string", name: "headline", label: "Headline" },
              {
                type: "string",
                name: "headlineAccent",
                label: "Headline Accent (italic line)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "primaryCta",
                label: "Primary Button",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link URL" },
                ],
              },
              {
                type: "object",
                name: "secondaryCta",
                label: "Secondary Button",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link URL" },
                ],
              },
              {
                type: "object",
                name: "socialLinks",
                label: "Social Links",
                fields: [
                  { type: "string", name: "youtubeUrl", label: "YouTube URL" },
                  {
                    type: "string",
                    name: "instagramUrl",
                    label: "Instagram URL",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "practitionersSection",
            label: "Practitioners Section",
            fields: [
              { type: "string", name: "sectionLabel", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
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
                  { type: "string", name: "title", label: "Title / Roles" },
                  {
                    type: "string",
                    name: "description",
                    label: "Bio",
                    ui: { component: "textarea" },
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
                        ui: { component: "textarea" },
                      },
                      { type: "string", name: "ctaLabel", label: "Button Label" },
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
                      { type: "string", name: "date", label: "Date / Schedule" },
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
                        ui: { component: "textarea" },
                      },
                      { type: "string", name: "ctaLabel", label: "Button Label" },
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
          {
            type: "object",
            name: "latestContent",
            label: "Latest Content Section",
            fields: [
              { type: "string", name: "sectionLabel", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
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
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "about",
        label: "About Page",
        path: "content/about",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/about",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "founders",
            label: "Founders",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "Founder",
              }),
            },
            fields: [
              { type: "string", name: "founderLabel", label: "Founder Label" },
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              { type: "image", name: "portraitImage", label: "Portrait Image" },
              {
                type: "string",
                name: "portraitName",
                label: "Portrait Placeholder Name",
              },
              { type: "string", name: "roles", label: "Roles / Title" },
              {
                type: "string",
                name: "bio",
                label: "Bio Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "credentials",
                label: "Credentials",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label || "Credential",
                  }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "value", label: "Value" },
                ],
              },
              {
                type: "object",
                name: "ctas",
                label: "Buttons",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label || "Button",
                  }),
                },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link URL" },
                  {
                    type: "boolean",
                    name: "ctaExternal",
                    label: "Open Link in New Tab",
                  },
                  {
                    type: "string",
                    name: "variant",
                    label: "Button Style",
                    options: ["accent", "outline"],
                  },
                ],
              },
            ],
          },
          {
            type: "string",
            name: "closingQuote",
            label: "Closing Quote",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "closingAttribution",
            label: "Closing Attribution",
          },
        ],
      },
      {
        name: "sangas",
        label: "Sangas Page",
        path: "content/sangas",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/sangas",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "events",
            label: "Events",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title || "Event",
              }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Event Title",
                required: true,
              },
              { type: "string", name: "host", label: "Host" },
              { type: "string", name: "date", label: "When" },
              { type: "string", name: "location", label: "Where" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "type",
                label: "Event Type",
                options: ["Sat Sanga", "Community Event", "Workshop"],
              },
              { type: "string", name: "ctaLabel", label: "Button Label" },
              { type: "string", name: "ctaHref", label: "Button Link URL" },
              {
                type: "boolean",
                name: "ctaExternal",
                label: "Open Link in New Tab",
              },
            ],
          },
          {
            type: "object",
            name: "ctaSection",
            label: "Bottom CTA Section",
            fields: [
              { type: "string", name: "sectionLabel", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "primaryCta",
                label: "Primary Button",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link URL" },
                ],
              },
              {
                type: "object",
                name: "secondaryCta",
                label: "Secondary Button",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link URL" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "content/contact",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/contact",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
        ],
      },
      {
        name: "services",
        label: "Services Page",
        path: "content/services",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/services",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "palmistry",
            label: "Palmistry Block",
            fields: [
              { type: "string", name: "id", label: "Section ID" },
              {
                type: "string",
                name: "practitionerLabel",
                label: "Practitioner Label",
              },
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              {
                type: "string",
                name: "leftParagraphs",
                label: "Left Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "rightParagraphs",
                label: "Right Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              { type: "string", name: "tags", label: "Tags", list: true },
              { type: "string", name: "bookingLabel", label: "Booking Label" },
              {
                type: "string",
                name: "bookingHeading",
                label: "Booking Heading",
              },
              {
                type: "string",
                name: "bookingSubtitle",
                label: "Booking Subtitle",
              },
              { type: "string", name: "bookingBadge", label: "Booking Badge" },
              { type: "string", name: "acuitySrc", label: "Acuity Embed URL" },
              {
                type: "boolean",
                name: "acuityClipped",
                label: "Use Clipped Embed",
              },
            ],
          },
          {
            type: "object",
            name: "therapy",
            label: "Therapy Block",
            fields: [
              { type: "string", name: "id", label: "Section ID" },
              {
                type: "string",
                name: "practitionerLabel",
                label: "Practitioner Label",
              },
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              {
                type: "string",
                name: "leftParagraphs",
                label: "Left Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "rightParagraphs",
                label: "Right Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              { type: "string", name: "tags", label: "Tags", list: true },
              { type: "string", name: "bookingLabel", label: "Booking Label" },
              {
                type: "string",
                name: "bookingHeading",
                label: "Booking Heading",
              },
              {
                type: "string",
                name: "bookingDescription",
                label: "Booking Description",
                ui: { component: "textarea" },
              },
              { type: "string", name: "acuitySrc", label: "Acuity Embed URL" },
              {
                type: "boolean",
                name: "acuityClipped",
                label: "Use Clipped Embed",
              },
            ],
          },
          {
            type: "object",
            name: "mridanga",
            label: "Mridanga Block",
            fields: [
              { type: "string", name: "id", label: "Section ID" },
              {
                type: "string",
                name: "practitionerLabel",
                label: "Practitioner Label",
              },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "Button Label" },
              { type: "string", name: "ctaHref", label: "Button Link URL" },
              {
                type: "boolean",
                name: "ctaExternal",
                label: "Open Link in New Tab",
              },
            ],
          },
          {
            type: "object",
            name: "caitanya",
            label: "Caitanya Block",
            fields: [
              { type: "string", name: "id", label: "Section ID" },
              {
                type: "string",
                name: "practitionerLabel",
                label: "Practitioner Label",
              },
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              {
                type: "string",
                name: "leftParagraphs",
                label: "Left Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "rightParagraphs",
                label: "Right Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              { type: "string", name: "tags", label: "Tags", list: true },
              { type: "string", name: "bookingLabel", label: "Booking Label" },
              {
                type: "string",
                name: "bookingHeading",
                label: "Booking Heading",
              },
              {
                type: "string",
                name: "bookingDescription",
                label: "Booking Description",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "Button Label" },
              { type: "string", name: "ctaHref", label: "Button Link URL" },
              {
                type: "boolean",
                name: "ctaExternal",
                label: "Open Link in New Tab",
              },
            ],
          },
          {
            type: "object",
            name: "sangasCta",
            label: "Sangas CTA Block",
            fields: [
              { type: "string", name: "id", label: "Section ID" },
              { type: "string", name: "sectionLabel", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "Button Label" },
              { type: "string", name: "ctaHref", label: "Button Link URL" },
              {
                type: "boolean",
                name: "ctaExternal",
                label: "Open Link in New Tab",
              },
            ],
          },
        ],
      },
      {
        name: "palmistryIntake",
        label: "Palmistry Intake Page",
        path: "content/palmistry-intake",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/palmistry-intake",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "description",
            label: "Description (before emphasis)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "descriptionEmphasis",
            label: "Description Emphasis",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "requirementsLabel",
            label: "Requirements Label",
          },
          {
            type: "string",
            name: "requirementsHeading",
            label: "Requirements Heading",
          },
          {
            type: "object",
            name: "requirements",
            label: "Requirements",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.n || "Requirement",
              }),
            },
            fields: [
              { type: "string", name: "n", label: "Number" },
              {
                type: "string",
                name: "text",
                label: "Text",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "string",
            name: "visualGuideHeading",
            label: "Visual Guide Heading",
          },
          {
            type: "string",
            name: "visualGuideNoteBefore",
            label: "Visual Guide Note (before code)",
          },
          {
            type: "string",
            name: "visualGuideNoteCode",
            label: "Visual Guide Note (code)",
          },
          {
            type: "string",
            name: "visualGuideNoteAfter",
            label: "Visual Guide Note (after code)",
          },
          {
            type: "object",
            name: "goodExample",
            label: "Good Example",
            fields: [
              { type: "image", name: "image", label: "Example Image" },
              { type: "string", name: "imageLabel", label: "Image Label" },
              { type: "string", name: "imageHint", label: "Image Hint" },
              { type: "string", name: "captionTitle", label: "Caption Title" },
              {
                type: "string",
                name: "captionText",
                label: "Caption Text",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "badExample",
            label: "Bad Example",
            fields: [
              { type: "image", name: "image", label: "Example Image" },
              { type: "string", name: "imageLabel", label: "Image Label" },
              { type: "string", name: "imageHint", label: "Image Hint" },
              { type: "string", name: "captionTitle", label: "Caption Title" },
              {
                type: "string",
                name: "captionText",
                label: "Caption Text",
                ui: { component: "textarea" },
              },
            ],
          },
          { type: "string", name: "formLabel", label: "Form Label" },
          { type: "string", name: "formHeading", label: "Form Heading" },
          {
            type: "string",
            name: "formDescription",
            label: "Form Description",
            ui: { component: "textarea" },
          },
        ],
      },
      {
        name: "intakeSubmissions",
        label: "Intake Submissions",
        path: "content/intake-submissions",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const name = (values?.name || "submission")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const stamp = new Date().toISOString().slice(0, 10);
              return `${stamp}-${name}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["Pending Review", "Approved", "Needs Resubmission"],
            ui: {
              defaultValue: "Pending Review",
            },
          },
          {
            type: "image",
            name: "images",
            label: "Hand Photos",
            list: true,
          },
          {
            type: "datetime",
            name: "submissionDate",
            label: "Submission Date",
          },
        ],
      },
    ],
  },
});
