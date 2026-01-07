import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">最新記事</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
