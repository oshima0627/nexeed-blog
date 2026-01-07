"use client";

import Link from "next/link";
import SearchBox from "./SearchBox";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = [
    { name: "投資", slug: "investment" },
    { name: "子育て", slug: "parenting" },
    { name: "ITエンジニア", slug: "engineering" },
    { name: "副業", slug: "side-business" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-primary">
            NEXEED BLOG
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium">
                カテゴリー
              </button>
              <div className="absolute hidden group-hover:block pt-2">
                <div className="bg-white shadow-lg rounded-lg py-2 w-40">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/about" className="text-gray-700 hover:text-primary font-medium">
              About
            </Link>
            <SearchBox />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニュー"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-2">
                <div className="text-gray-900 font-medium">カテゴリー</div>
                <div className="pl-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="block text-gray-700 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-2">
                <SearchBox />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
