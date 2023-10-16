import { highlight } from "@code-hike/lighter";

export async function generateMetadata({ params, searchParams }) {
  const gist = await fetchGist(params.id);

  return {
    title: gist.description,
  };
}

export default async function Page({ params }) {
  return <Redirect url={`https://gist.github.com/${params.id}`} />;

  const gist = await fetchGist(params.id);
  const avatar = gist.owner?.avatar_url;
  const owner = gist.owner?.login;
  const filenames = Object.keys(gist.files);
  const file = gist.files[filenames[0]];
  const content = file.content;

  const { lines, style } = await highlight(
    JSON.stringify(gist, null, 2),
    "json",
    "github-dark"
  );
  return (
    <div
      style={{
        background: "white",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: style.background,
        color: style.color,
        fontSize: "1.5em",
        display: "flex",
        flexDirection: "column",
        height: 630,
        maxHeight: 630,
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
          maxHeight: "70%",
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
          height: "25%",
          maxHeight: "25%",
          minHeight: 0,
          borderTop: "1px solid #444",
          flexDirection: "row",
          display: "flex",
          gap: 12,
          background: style.background,
          width: "100%",
          padding: 12,
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <img
          src={avatar}
          width={90}
          height={90}
          style={{ borderRadius: 100 }}
        />
        <h1 style={{ fontSize: "1.5em" }}>
          {gist.description || file.filename}
        </h1>
      </div>
    </div>
  );
}

async function fetchGist(id) {
  const res = await fetch(`https://api.github.com/gists/${id}`);
  return await res.json();
}
