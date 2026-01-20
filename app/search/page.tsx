"use client";

import { useSearchParams } from "next/navigation";
import { searchPosts } from "@/lib/search";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { PostData } from "@/lib/posts";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const results = searchPosts(allPosts, query);

  if (loading) {
    return (
      <div className="container-custom py-12">
        <p className="text-center text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* パンくずリスト */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">検索</span>
      </nav>

      <h1 className="text-4xl font-bold mb-4">検索結果</h1>

      {query && (
        <p className="text-gray-600 mb-8">
          「<span className="font-bold text-gray-900">{query}</span>」の検索結果:{" "}
          <span className="font-bold">{results.length}件</span>
        </p>
      )}

      {!query ? (
        <div className="text-center py-16 text-gray-500">
          <p>検索キーワードを入力してください。</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-8">
          {results.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>「{query}」に一致する記事が見つかりませんでした。</p>
          <p className="mt-2">別のキーワードで検索してみてください。</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-custom py-12">読み込み中...</div>}>
      <SearchResults />
    </Suspense>
  );
}
