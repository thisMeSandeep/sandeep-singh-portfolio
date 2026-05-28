import { getCollection } from "astro:content";

export async function GET(context: { site?: URL }) {
  const site = context.site?.href.replace(/\/$/, "") ?? "";
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
  );

  const items = posts
    .map((post) => {
      const url = `${site}/blogs/${post.id}/`;
      return `
        <item>
          <title><![CDATA[${post.data.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description><![CDATA[${post.data.excerpt}]]></description>
          <pubDate>${post.data.publishedDate.toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Sandeep Singh Writing</title>
        <link>${site}/blogs/</link>
        <description>Articles on frontend, mobile, and backend engineering.</description>
        <language>en-us</language>
        ${items}
      </channel>
    </rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    },
  );
}
