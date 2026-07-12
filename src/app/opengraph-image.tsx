import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — Licensed Electrician Melbourne & Victoria`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo-full-white.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0c 0%, #16181d 60%, #1e2128 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              fontSize: 22,
              fontWeight: 700,
              color: "#5b8dff",
            }}
          >
            A-Grade Licensed
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              fontSize: 22,
              fontWeight: 700,
              color: "#5b8dff",
            }}
          >
            REC Registered
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={278} alt="" />
        <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.65)", marginTop: 32 }}>
          Licensed Electrician Servicing Melbourne &amp; Victoria
        </div>
      </div>
    ),
    { ...size }
  );
}
