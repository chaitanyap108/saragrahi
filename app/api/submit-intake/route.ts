import { put } from "@vercel/blob";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const STATUS_DEFAULT = "Pending Review";
const MAX_IMAGES = 8;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB

type UploadedImage = {
  url: string;
  pathname: string;
};

function slugifyName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function absoluteUrl(request: Request, pathname: string) {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }
  const origin = new URL(request.url).origin;
  return `${origin}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

async function uploadImages(
  files: File[],
  submissionId: string,
): Promise<UploadedImage[]> {
  const uploaded: UploadedImage[] = [];
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const extension = path.extname(file.name) || ".jpg";
    const safeName = `hand-${i + 1}${extension.toLowerCase()}`;
    const pathname = `intake/${submissionId}/${safeName}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    if (blobToken) {
      // Production / Vercel Blob path
      const blob = await put(pathname, bytes, {
        access: "public",
        contentType: file.type || "image/jpeg",
        token: blobToken,
      });
      uploaded.push({ url: blob.url, pathname: blob.pathname });
      continue;
    }

    // Local / placeholder fallback when Blob is not configured
    const publicDir = path.join(process.cwd(), "public", "uploads", "intake", submissionId);
    await mkdir(publicDir, { recursive: true });
    await writeFile(path.join(publicDir, safeName), bytes);
    uploaded.push({
      url: `/uploads/intake/${submissionId}/${safeName}`,
      pathname: `uploads/intake/${submissionId}/${safeName}`,
    });
  }

  return uploaded;
}

async function createTinaSubmissionEntry(input: {
  submissionId: string;
  name: string;
  email: string;
  images: string[];
  submissionDate: string;
}) {
  const dir = path.join(process.cwd(), "content", "intake-submissions");
  await mkdir(dir, { recursive: true });

  const filename = `${input.submissionId}.json`;
  const entry = {
    name: input.name,
    email: input.email,
    status: STATUS_DEFAULT,
    images: input.images,
    submissionDate: input.submissionDate,
  };

  await writeFile(
    path.join(dir, filename),
    `${JSON.stringify(entry, null, 2)}\n`,
    "utf8",
  );

  return {
    relativePath: filename,
    collection: "intakeSubmissions",
    entry,
  };
}

function adminEmailHtml(input: {
  name: string;
  email: string;
  imageUrls: string[];
  submissionId: string;
}) {
  const imageLinks = input.imageUrls
    .map(
      (url, index) =>
        `<li style="margin:0 0 8px;"><a href="${url}" style="color:#0f766e;text-decoration:underline;">Hand photo ${index + 1}</a></li>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:Georgia,'Times New Roman',serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #dbe4e1;">
            <tr>
              <td style="padding:28px 28px 12px;border-bottom:1px solid #e5eeeb;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#0f766e;">Saragrahi · Hand Reading</p>
                <h1 style="margin:0;font-size:24px;font-weight:400;line-height:1.3;">New Hand Reading Submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 8px;font-size:16px;line-height:1.6;">
                <p style="margin:0 0 16px;">Namaste Kamala,</p>
                <p style="margin:0 0 16px;">A new set of hand photos has been submitted and is ready for your review.</p>
                <p style="margin:0 0 6px;"><strong>Name:</strong> ${input.name}</p>
                <p style="margin:0 0 6px;"><strong>Email:</strong> <a href="mailto:${input.email}" style="color:#0f766e;">${input.email}</a></p>
                <p style="margin:0 0 16px;"><strong>Submission ID:</strong> ${input.submissionId}</p>
                <p style="margin:0 0 8px;"><strong>Uploaded images:</strong></p>
                <ul style="margin:0 0 16px;padding-left:18px;">${imageLinks}</ul>
                <p style="margin:0 0 8px;">You can also manage this entry in the TinaCMS <em>Intake Submissions</em> collection.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 28px;font-size:13px;color:#6b7280;line-height:1.5;">
                Status defaults to Pending Review until you approve or request a resubmission.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function clientEmailHtml(input: { name: string }) {
  const firstName = input.name.trim().split(/\s+/)[0] || "friend";

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:Georgia,'Times New Roman',serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #dbe4e1;">
            <tr>
              <td style="padding:28px 28px 12px;border-bottom:1px solid #e5eeeb;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#0f766e;">Saragrahi</p>
                <h1 style="margin:0;font-size:24px;font-weight:400;line-height:1.3;">Your photos are under review</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 8px;font-size:16px;line-height:1.6;">
                <p style="margin:0 0 16px;">Dear ${firstName},</p>
                <p style="margin:0 0 16px;">Thank you for submitting your hand photos. They have been forwarded to Kamala and are currently under review.</p>
                <p style="margin:0 0 16px;">You will receive either an approval confirmation or a prompt for resubmission within <strong>24–48 hours</strong>.</p>
                <p style="margin:0;">With care,<br/>The Saragrahi team</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 28px;font-size:13px;color:#6b7280;line-height:1.5;">
                Please keep this email for your records. No further action is needed unless we request clearer photos.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const images = formData
      .getAll("images")
      .filter((value): value is File => value instanceof File && value.size > 0);

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }
    if (images.length === 0) {
      return NextResponse.json(
        { error: "Please upload at least one hand photo." },
        { status: 400 },
      );
    }
    if (images.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `Please upload at most ${MAX_IMAGES} photos.` },
        { status: 400 },
      );
    }
    for (const image of images) {
      if (!image.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are accepted." },
          { status: 400 },
        );
      }
      if (image.size > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { error: "Each image must be 8 MB or smaller." },
          { status: 400 },
        );
      }
    }

    const submissionDate = new Date().toISOString();
    const submissionId = `${submissionDate.slice(0, 10)}-${slugifyName(name)}-${Date.now().toString(36)}`;

    const uploaded = await uploadImages(images, submissionId);
    const absoluteImageUrls = uploaded.map((image) =>
      absoluteUrl(request, image.url),
    );

    const cmsEntry = await createTinaSubmissionEntry({
      submissionId,
      name,
      email,
      images: uploaded.map((image) => image.url),
      submissionDate,
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail =
      process.env.INTAKE_ADMIN_EMAIL || process.env.KAMALA_EMAIL;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Saragrahi <onboarding@resend.dev>";

    let emailsSent = { admin: false, client: false };

    if (resendApiKey && adminEmail) {
      const resend = new Resend(resendApiKey);

      const [adminResult, clientResult] = await Promise.allSettled([
        resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `New Hand Reading Submission: ${name}`,
          html: adminEmailHtml({
            name,
            email,
            imageUrls: absoluteImageUrls,
            submissionId,
          }),
        }),
        resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "Your Hand Reading Photos are Under Review!",
          html: clientEmailHtml({ name }),
        }),
      ]);

      emailsSent = {
        admin: adminResult.status === "fulfilled" && !adminResult.value.error,
        client:
          clientResult.status === "fulfilled" && !clientResult.value.error,
      };

      if (!emailsSent.admin || !emailsSent.client) {
        console.error("Intake email delivery issue", {
          admin: adminResult,
          client: clientResult,
        });
      }
    } else {
      console.warn(
        "Skipping intake emails — set RESEND_API_KEY and INTAKE_ADMIN_EMAIL (or KAMALA_EMAIL).",
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Submission received. Your photos are under review for 24–48 hours.",
      submissionId,
      cmsPath: `content/intake-submissions/${cmsEntry.relativePath}`,
      imageUrls: absoluteImageUrls,
      emailsSent,
      storage: process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "local-public",
    });
  } catch (error) {
    console.error("submit-intake failed", error);
    return NextResponse.json(
      {
        error:
          "We could not process your submission right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
