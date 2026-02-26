import { getAllPosts } from "@/lib/blog";
import { RESUME_DATA } from "@/data/resume-data";

export function GET() {
  const posts = getAllPosts();
  const siteUrl = "https://mksg.lu";

  const itemsXml = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${RESUME_DATA.name} — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles on software engineering, AI, and building products by ${RESUME_DATA.name}.</description>
    <language>en</language>
    <lastBuildDate>${posts[0] ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
