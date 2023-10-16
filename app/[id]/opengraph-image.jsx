import { highlight } from "@code-hike/lighter";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }) {
  const gist = await fetchGist(params.id);
  const avatar = gist.owner.avatar_url;
  const owner = gist.owner.login;
  const filenames = Object.keys(gist.files);
  const file = gist.files[filenames[0]];
  const content = file.content;

  const { lines, style } = await highlight(content, "jsx", "github-dark");

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: style.background,
          color: style.color,
          fontSize: "1.5em",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <pre
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            background: style.background,
            color: style.color,
            whiteSpace: "pre",
            padding: "1em",
            maxHeight: "75%",
            maxWidth: "100%",
          }}
        >
          {lines.map((line, i) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
                key={i}
              >
                {line.map((token, j) => (
                  <span style={token.style} key={j}>
                    {token.content}
                  </span>
                ))}
              </div>
            </>
          ))}
        </pre>
        <div
          style={{
            minHeight: 0,
            borderTop: "1px solid #444",
            flexDirection: "row",
            display: "flex",
            gap: 24,
            background: style.background,
            width: "100%",
            padding: "0 12px",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            src={avatar}
            width={90}
            height={90}
            style={{ borderRadius: 100, margin: "12px 0" }}
          />
          <h1 style={{ fontSize: "1.5em", padding: 0, margin: 0 }}>
            {gist.description || file.filename}
          </h1>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
async function fetchGist(id) {
  const res = await fetch(`https://api.github.com/gists/${id}`);
  return await res.json();
}
