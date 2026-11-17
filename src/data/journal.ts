import { parse } from "yaml";

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: string;
  excerpt: string;
  tools: string[];
  links: { label: string; url: string }[];
  content: string;
  videoUrl?: string;
  coverImage?: string;
}

const markdownFiles = import.meta.glob<string>(
  "../../content/posts/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return value ? String(value) : "";
}

function loadMarkdownPosts(): JournalPost[] {
  return Object.entries(markdownFiles)
    .map(([path, raw]) => {
      const match = raw.match(
        /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/
      );

      if (!match) {
        console.warn(`Invalid journal frontmatter: ${path}`);
        return null;
      }

      const data = parse(match[1]) || {};
      const content = match[2] || "";
      const slug =
        path.split("/").pop()?.replace(/\.md$/, "") || "untitled";

      return {
        slug,
        title: String(data.title || "Untitled Entry"),
        date: normalizeDate(data.date),
        category: String(data.category || "General"),
        status: String(data.status || "PUBLISHED"),
        excerpt: String(data.excerpt || ""),
        tools: Array.isArray(data.tools) ? data.tools.map(String) : [],
        links: Array.isArray(data.links)
          ? data.links.map((link: { label?: unknown; url?: unknown }) => ({
              label: String(link.label || "Resource"),
              url: String(link.url || ""),
            }))
          : [],
        content: content.trim(),
        videoUrl: data.video_url ? String(data.video_url) : undefined,
        coverImage: data.cover_image
          ? String(data.cover_image)
          : undefined,
      };
    })
    .filter((post): post is JournalPost => post !== null);
}

export const journalPosts: JournalPost[] = loadMarkdownPosts().sort(
  (a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  }
);
