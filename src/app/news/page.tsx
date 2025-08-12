import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { getPosts, formatDate, truncateText } from '@/lib/firebase/posts';
import { Post } from '@/lib/firebase/types';

export const metadata: Metadata = {
  title: 'お知らせ | Powerise',
  description: '最新のお知らせや企業情報をお届けします。',
};

// Static Site Generation (SSG)
export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage() {
  const posts = await getPosts(20); // Get latest 20 posts

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <Heading 
          level="h1" 
          className="mb-4 text-deep-violet"
        >
          お知らせ
        </Heading>
        <p className="text-charcoal/70 text-lg">
          最新のお知らせや企業情報をお届けします
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg 
              className="mx-auto h-12 w-12 text-charcoal/30" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
              />
            </svg>
          </div>
          <Heading level="h3" className="mb-2 text-charcoal/70">
            お知らせはまだありません
          </Heading>
          <p className="text-charcoal/50">
            最新の情報が公開されるまでお待ちください。
          </p>
        </div>
      )}
    </div>
  );
}

interface NewsCardProps {
  post: Post;
}

function NewsCard({ post }: NewsCardProps) {
  const excerpt = post.excerpt || truncateText(post.content, 120);
  
  return (
    <Link href={`/news/${post.id}`} className="group">
      <Card 
        variant="default" 
        size="md" 
        className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1"
      >
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-4 overflow-hidden rounded-t-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <time 
              className="text-sm text-deep-violet font-medium"
              dateTime={post.publishedAt.toISOString()}
            >
              {formatDate(post.publishedAt)}
            </time>
            {post.tags && post.tags.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-white-lilac px-2.5 py-0.5 text-xs font-medium text-deep-violet">
                {post.tags[0]}
              </span>
            )}
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-deep-violet transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="line-clamp-3">
            {excerpt}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
