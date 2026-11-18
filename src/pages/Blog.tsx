import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { journalPosts } from "../data/journal";

function formatDate(value: string) {
  if (!value) return "";

  // Preserve dates such as "November 2026" from older entries.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function VideoEmbed({ url }: { url: string }) {
  if (!url) return null;

  const getYouTubeId = (value: string) => {
    const match = value.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
    );
    return match?.[1];
  };

  const getVimeoId = (value: string) => {
    const match = value.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match?.[1];
  };

  const youtubeId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);

  if (youtubeId) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border border-green-900">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Journal video"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border border-green-900">
        <iframe
          className="h-full w-full"
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title="Journal video"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <video
      className="w-full rounded-xl border border-green-900"
      controls
      preload="metadata"
    >
      <source src={url} type="video/mp4" />
      Your browser does not support video playback.
    </video>
  );
}

function Blog() {
  const { slug } = useParams();
  const [activeCategory, setActiveCategory] = useState("ALL");

  const post = slug
    ? journalPosts.find((entry) => entry.slug === slug)
    : undefined;

  const categories = [
    "ALL",
    ...Array.from(new Set(journalPosts.map((entry) => entry.category))),
  ];

  const filteredPosts =
    activeCategory === "ALL"
      ? journalPosts
      : journalPosts.filter(
          (entry) => entry.category === activeCategory
        );

  if (slug && !post) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-green-300">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-green-600">
            ERROR 404 // ENTRY NOT FOUND
          </p>
          <h1 className="mt-4 text-3xl font-bold">
            Journal entry unavailable.
          </h1>
          <Link
            to="/blog"
            className="mt-8 inline-block text-green-500 hover:text-green-200"
          >
            ← BACK TO JOURNAL
          </Link>
        </div>
      </main>
    );
  }

  if (post) {
    return (
      <main className="min-h-screen bg-black px-6 py-12 text-green-300">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="text-sm text-green-600 transition hover:text-green-200"
          >
            ← BACK TO JOURNAL
          </Link>

          <div className="mt-12 text-xs uppercase tracking-[0.25em] text-green-600">
            {post.category} / {post.status}
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-green-300 md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-sm text-green-700">
            {formatDate(post.date)} · ALYSSA GABLE
          </p>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="mt-10 max-h-[480px] w-full rounded-xl border border-green-900 object-cover"
            />
          )}

          <div className="prose prose-invert prose-green mt-10 max-w-none text-green-200/80 prose-headings:text-green-300 prose-p:my-6 prose-p:leading-8 prose-headings:mt-10 prose-headings:mb-4 prose-img:my-8 prose-a:text-green-400 prose-strong:text-green-300 prose-code:text-green-300 prose-pre:border prose-pre:border-green-900 prose-pre:bg-green-950/30 prose-blockquote:border-green-700">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {post.tools && post.tools.length > 0 && (
            <section className="mt-10 border-t border-green-900 pt-6">
              <h2 className="text-sm font-bold tracking-widest text-green-400">
                TOOLS & TECHNOLOGIES
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-green-900 bg-green-950/30 px-3 py-2 text-xs text-green-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          )}

          {post.links && post.links.length > 0 && (
            <section className="mt-8 border-t border-green-900 pt-6">
              <h2 className="text-sm font-bold tracking-widest text-green-400">
                RESOURCES & DOCUMENTATION
              </h2>

              <p className="mt-2 text-xs text-green-700">
                Learn more about the tools and technologies in this project.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {post.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-md border border-green-900/70 bg-green-950/20 px-4 py-3 text-sm text-green-500 transition hover:border-green-500 hover:bg-green-950/50 hover:text-green-300"
                  >
                    <span>{link.label}</span>
                    <span className="text-green-700 group-hover:text-green-300">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {post.videoUrl && (
            <div className="mt-10">
              <VideoEmbed url={post.videoUrl} />
            </div>
          )}

          <div className="mt-14 border-t border-green-900 pt-6">
            <Link to="/blog" className="hover:text-green-200">
              ← MORE JOURNAL ENTRIES
            </Link>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-green-300">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="text-sm text-green-600 transition hover:text-green-200"
        >
          ← BACK TO HOME
        </Link>

        <header className="mb-12 mt-12">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-green-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            PERSONAL TECHNICAL JOURNAL
          </div>

          <h1 className="mt-5 text-4xl font-bold text-green-300 md:text-6xl">
            Field Notes<span className="text-green-600">.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-green-700">
            Experiments, projects, things I'm learning, and notes from building
            with technology.
          </p>
        </header>

        <nav className="mb-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setActiveCategory(item)}
              className={`rounded-md border px-3 py-2 text-xs transition ${
                activeCategory === item
                  ? "border-green-500 bg-green-950 text-green-300"
                  : "border-green-950 text-green-700 hover:border-green-700 hover:text-green-400"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <section className="space-y-4">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-xl border border-green-950 bg-green-950/10 transition hover:border-green-600 hover:bg-green-950/25"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt=""
                  loading="lazy"
                  className="max-h-64 w-full object-cover"
                />
              )}

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="tracking-widest text-green-500">
                    ENTRY {String(index + 1).padStart(2, "0")} /{" "}
                    {post.category.toUpperCase()}
                  </span>
                  <span className="text-green-800">
                    {formatDate(post.date)}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold text-green-300 transition group-hover:text-green-200 md:text-2xl">
                  {post.title}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-green-700">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-green-800">
                    {post.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-green-500 transition group-hover:translate-x-1">
                    READ ENTRY →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <footer className="mt-16 border-t border-green-950 py-8 text-xs text-green-800">
          END OF CURRENT ENTRIES // MORE EXPERIMENTS IN PROGRESS
        </footer>
      </div>
    </main>
  );
}

export default Blog;
