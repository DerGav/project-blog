import RSS from "rss";

import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

const HOST = "http://localhost:3000";

export async function GET() {
  const blogPosts = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    feed_url: `${HOST}/rss.xml`,
    site_url: HOST,
  });

  blogPosts.forEach(({ slug, title, abstract, publishedOn }) =>
    feed.item({
      title: title,
      description: abstract,
      url: `${HOST}/${slug}`,
      date: publishedOn,
    })
  );

  return new Response(feed.xml({ indent: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
