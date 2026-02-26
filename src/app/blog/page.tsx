import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { getAllPosts } from "@/lib/blog";
import { RESUME_DATA } from "@/data/resume-data";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: `Blog | ${RESUME_DATA.name}`,
  description: `Articles and insights by ${RESUME_DATA.name} on software engineering, AI, and building products.`,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white">
        <div className="space-y-1.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-mono"
          >
            <ArrowLeftIcon className="size-3" />
            Back
          </Link>
          <h1 className="text-2xl font-bold">Blog & Insights</h1>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            Articles on software engineering, AI, and building products.
          </p>
        </div>

        <Section>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block border-l-2 border-muted pl-3 py-2 hover:border-foreground transition-colors"
              >
                <div className="flex items-baseline justify-between gap-x-2">
                  <p className="text-sm font-medium">{post.title}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <time className="text-xs text-muted-foreground/70 font-mono tabular-nums">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <div className="flex gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
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
              </Link>
            ))}
          </div>
        </Section>
      </section>
    </main>
  );
}
