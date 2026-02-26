import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import { RESUME_DATA } from "@/data/resume-data";
import { ArrowLeftIcon } from "lucide-react";
import { LinkedInIcon, XIcon } from "@/components/icons";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${RESUME_DATA.name}`,
    description: post.description,
    alternates: {
      canonical: `https://mksg.lu/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [RESUME_DATA.name],
      url: `https://mksg.lu/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@mksglu",
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://mksg.lu/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: RESUME_DATA.name,
      url: "https://mksg.lu",
    },
    publisher: {
      "@type": "Person",
      name: RESUME_DATA.name,
      url: "https://mksg.lu",
    },
    keywords: post.tags,
  };

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white">
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-mono"
          >
            <ArrowLeftIcon className="size-3" />
            Back
          </Link>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              {post.description}
            </p>
            <div className="flex items-center gap-3">
              <time className="text-xs text-muted-foreground/70 font-mono tabular-nums">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <div className="flex gap-1">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[10px] px-1 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {(post.linkedinUrl || post.xUrl) && (
              <div className="flex gap-3">
                {post.linkedinUrl && (
                  <a
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                  >
                    <LinkedInIcon className="size-3" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {post.xUrl && (
                  <a
                    href={post.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                  >
                    <XIcon className="size-3" />
                    <span>X</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <article className="prose prose-sm prose-neutral max-w-none prose-headings:font-bold prose-a:text-primary prose-pre:bg-[#fafafa] prose-pre:border prose-pre:border-border prose-pre:rounded-md prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-light",
                      keepBackground: true,
                    },
                  ],
                  rehypeSlug,
                ],
              },
            }}
          />
        </article>
      </section>
    </main>
  );
}
