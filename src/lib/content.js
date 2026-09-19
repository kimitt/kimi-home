// ─────────────────────────────────────────
// 콘텐츠 로더
// src/content/daily/*.md, src/content/notes/*.md 를 읽어
// 프론트매터(---로 감싼 머리말)와 본문으로 분리합니다.
// 글을 올리는 방법: 마크다운 파일을 폴더에 추가하고 커밋하면 끝.
// ─────────────────────────────────────────
import { marked } from "marked";

const files = import.meta.glob("../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  const meta = {};
  let body = raw;
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (m) {
    body = raw.slice(m[0].length);
    for (const line of m[1].split("\n")) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if (val.startsWith("[") && val.endsWith("]")) {
        val = val.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
      }
      meta[key] = val;
    }
  }
  return { meta, body };
}

function load(section) {
  return Object.entries(files)
    .filter(([path]) => path.includes(`/content/${section}/`))
    .map(([path, raw]) => {
      const { meta, body } = parseFrontmatter(raw);
      const slug = path.split("/").pop().replace(/\.md$/, "");
      return {
        slug,
        title: meta.title || slug,
        date: meta.date || slug.slice(0, 10),
        tags: Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [],
        photo: meta.photo || null,
        caption: meta.caption || "",
        html: marked.parse(body),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const dailyPosts = load("daily");
export const notePosts = load("notes");
