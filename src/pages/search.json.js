import { getCollection } from "astro:content";

async function getPosts() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );
  // return posts;
  return posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    date: post.data.pubDate,
  }));
}

export async function get({}) {
  return new Response(JSON.stringify(await getPosts()), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
