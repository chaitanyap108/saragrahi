import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  branch,

  clientId: isLocal ? "" : (process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ""),
  token: isLocal ? "" : (process.env.TINA_TOKEN || ""),

  contentApiUrlOverride: isLocal ? "http://localhost:4001/graphql" : undefined,

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
