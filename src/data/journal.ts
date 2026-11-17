import matter from "gray-matter";

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: string;
  excerpt: string;
  tools: string[];
  links: {
    label: string;
    url: string;
  }[];
  content: string;
  videoUrl?: string;
  coverImage?: string;
}

// Existing journal entries are preserved here.
const existingPosts: JournalPost[] = [
  {
    slug: "building-cyea-automation",
    title: "Building a Financial Reporting Workflow",
    date: "November 2026",
    category: "Automation",
    status: "IN PROGRESS",
    excerpt:
      "Using n8n and JavaScript to organize payment data and make financial reporting easier.",
    tools: [
      "n8n",
      "JavaScript",
      "Stripe",
      "WooCommerce",
      "Google Sheets",
      "Gmail",
    ],
    links: [
      {
        label: "n8n Documentation",
        url: "https://docs.n8n.io/",
      },
      {
        label: "Stripe API Documentation",
        url: "https://docs.stripe.com/api",
      },
      {
        label: "WooCommerce REST API",
        url: "https://woocommerce.github.io/woocommerce-rest-api-docs/",
      },
      {
        label: "n8n Google Sheets Integration",
        url: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/",
      },
      {
        label: "n8n Gmail Integration",
        url: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/",
      },
    ],
    content: [
      "I'm working on an automated financial reporting workflow for CYEA. The goal is to bring payment information from Stripe and WooCommerce into one organized report.",
      "I'm using n8n to connect the services and JavaScript to transform and categorize the incoming data. One of the challenges is making sure website orders, in-person payments, and subscriptions are identified correctly.",
      "The workflow is still being refined. I'm currently working through the data structure and reporting logic so the final email is accurate and useful.",
      "This project is a good reminder that automation isn't just about connecting APIs. The data has to make sense before the results can be trusted.",
    ].join("\n\n"),
  },
  {
    slug: "laptop-refurbishment",
    title: "Learning Through Laptop Refurbishment",
    date: "November 2026",
    category: "Hardware",
    status: "EXPLORING",
    excerpt:
      "Exploring computer repair, hardware diagnostics, and ways to give older technology a second life.",
    tools: [
      "Hardware Diagnostics",
      "Windows",
      "Linux",
      "Repair Tools",
      "iFixit",
    ],
    links: [
      {
        label: "iFixit Laptop Repair Guides",
        url: "https://www.ifixit.com/Device/PC_Laptop",
      },
      {
        label: "General Computer Repair Procedures",
        url: "https://www.ifixit.com/Wiki/General_Computer_Repair_Procedures",
      },
    ],
    content: [
      "I've been exploring laptop refurbishment as a way to build my hardware troubleshooting skills and better understand the technology I work with.",
      "I'm interested in learning how to diagnose common problems, evaluate hardware, identify worthwhile upgrades, and extend the life of older machines.",
      "There's also an environmental side to this. Repairing and reusing electronics can help reduce unnecessary electronic waste and keep useful equipment out of landfills.",
      "I want to keep documenting what I learn along the way, including the tools, repair resources, and troubleshooting techniques that are worth sharing.",
    ].join("\n\n"),
  },
  {
    slug: "learning-touchdesigner-electronics",
    title: "Connecting Electronics with TouchDesigner",
    date: "November 2026",
    category: "Creative Technology",
    status: "LEARNING",
    excerpt:
      "Exploring how physical inputs, electronics, and real-time visuals can work together.",
    tools: [
      "TouchDesigner 2025",
      "Python",
      "USB Audio Capture",
      "Electronics",
      "Sensors",
    ],
    links: [
      {
        label: "TouchDesigner Getting Started",
        url: "https://docs.derivative.ca/Getting_Started_With_TouchDesigner",
      },
      {
        label: "TouchDesigner Learning Resources",
        url: "https://docs.derivative.ca/Learn_TouchDesigner",
      },
      {
        label: "Derivative User Guide",
        url: "https://derivative.ca/UserGuide",
      },
    ],
    content: [
      "I've been interested in finding ways to connect electronics and creative coding. TouchDesigner gives me a way to turn incoming data into real-time visuals and interactive experiences.",
      "I want to understand how physical components like sensors and other electronic inputs can communicate with software. I'm also exploring how audio signals and Python can become part of that process.",
      "Rather than learning everything separately, I want to build small experiments that combine electronics, programming, and visual design.",
      "The bigger goal is to create interactive installations and live visuals where the technology and the experience work together.",
    ].join("\n\n"),
  },
];

// Vite discovers Markdown files created by Sveltia CMS.
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
  return Object.entries(markdownFiles).map(([path, raw]) => {
    const { data, content } = matter(raw);

    const slug =
      path.split("/").pop()?.replace(/\.md$/, "") || "untitled";

    return {
      slug,
      title: String(data.title || "Untitled Entry"),
      date: normalizeDate(data.date),
      category: String(data.category || "General"),
      status: String(data.status || "PUBLISHED"),
      excerpt: String(data.excerpt || ""),
      tools: Array.isArray(data.tools)
        ? data.tools.map(String)
        : [],
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
  });
}

export const journalPosts: JournalPost[] = [
  ...existingPosts,
  ...loadMarkdownPosts(),
].sort((a, b) => {
  const dateA = new Date(a.date).getTime() || 0;
  const dateB = new Date(b.date).getTime() || 0;
  return dateB - dateA;
});
