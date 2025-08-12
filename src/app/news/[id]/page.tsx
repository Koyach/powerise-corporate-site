import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Card, 
  CardContent 
} from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { getPost, getAllPosts, formatDate } from '@/lib/firebase/posts';
// import { Post } from '@/lib/firebase/types'; // For type definitions

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all published posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: 'お知らせが見つかりません | Powerise',
    };
  }

  const description = post.excerpt || post.content.slice(0, 160);

  return {
    title: `${post.title} | Powerise`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// Static Site Generation with ISR
export const revalidate = 3600; // Revalidate every hour

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-charcoal/60">
          <li>
            <Link 
              href="/" 
              className="hover:text-deep-violet transition-colors"
            >
              ホーム
            </Link>
          </li>
          <li className="flex items-center">
            <svg 
              className="h-4 w-4 mx-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <Link 
              href="/news" 
              className="hover:text-deep-violet transition-colors"
            >
              お知らせ
            </Link>
          </li>
          <li className="flex items-center">
            <svg 
              className="h-4 w-4 mx-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-charcoal">
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <time 
              className="text-sm text-deep-violet font-medium"
              dateTime={post.publishedAt.toISOString()}
            >
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt > post.publishedAt && (
              <span className="ml-4 text-sm text-charcoal/60">
                更新: {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
          
          <Heading 
            level="h1" 
            className="mb-4 text-deep-violet"
          >
            {post.title}
          </Heading>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white-lilac px-3 py-1 text-sm font-medium text-deep-violet"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          <div className="flex items-center text-sm text-charcoal/70">
            <svg 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
            {post.author}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <Card variant="ghost" size="lg" className="mb-8">
          <CardContent>
            <div 
              className="prose prose-lg max-w-none prose-headings:text-deep-violet prose-a:text-deep-violet prose-a:hover:text-rich-lavender"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center">
          <Link href="/news">
            <Button variant="outline" size="lg">
              <svg 
                className="h-4 w-4 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              お知らせ一覧に戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
