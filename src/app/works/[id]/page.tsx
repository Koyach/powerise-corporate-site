import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { getWork, getAllWorks, formatDate } from '@/lib/firebase/works';
// import { Work } from '@/lib/firebase/types'; // For type definitions

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all published works
export async function generateStaticParams() {
  const works = await getAllWorks();
  
  return works.map((work) => ({
    id: work.id,
  }));
}

// Generate metadata for each work
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const work = await getWork(id);

  if (!work) {
    return {
      title: '制作実績が見つかりません | Powerise',
    };
  }

  const description = work.description || work.content.slice(0, 160);

  return {
    title: `${work.title} | 制作実績 | Powerise`,
    description,
    openGraph: {
      title: work.title,
      description,
      type: 'article',
      publishedTime: work.publishedAt.toISOString(),
      modifiedTime: work.updatedAt.toISOString(),
      images: work.featuredImage ? [{ url: work.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: work.title,
      description,
      images: work.featuredImage ? [work.featuredImage] : [],
    },
  };
}

// Static Site Generation with ISR
export const revalidate = 3600; // Revalidate every hour

export default async function WorkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const work = await getWork(id);

  if (!work) {
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
              href="/works" 
              className="hover:text-deep-violet transition-colors"
            >
              制作実績
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
              {work.title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="max-w-6xl mx-auto">
        {/* Work Header */}
        <header className="mb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-4">
                <span className="inline-flex items-center rounded-full bg-white-lilac px-3 py-1 text-sm font-medium text-deep-violet">
                  {work.category}
                </span>
                <time 
                  className="text-sm text-charcoal/60"
                  dateTime={work.publishedAt.toISOString()}
                >
                  {formatDate(work.publishedAt)}
                </time>
              </div>
              
              <Heading 
                level="h1" 
                className="mb-4 text-deep-violet"
              >
                {work.title}
              </Heading>

              <p className="text-lg text-charcoal/80 mb-6">
                {work.description}
              </p>

              {/* Technologies */}
              {work.technologies && work.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal/70 mb-2">使用技術</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-charcoal/5 px-3 py-1 text-sm text-charcoal/70 border border-charcoal/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Project Details */}
            <div className="lg:col-span-1">
              <Card variant="default" size="md">
                <CardHeader>
                  <CardTitle className="text-lg">プロジェクト詳細</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {work.clientName && (
                    <div>
                      <dt className="text-sm font-medium text-charcoal/70">クライアント</dt>
                      <dd className="text-sm text-charcoal mt-1">{work.clientName}</dd>
                    </div>
                  )}
                  
                  <div>
                    <dt className="text-sm font-medium text-charcoal/70">カテゴリー</dt>
                    <dd className="text-sm text-charcoal mt-1">{work.category}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-charcoal/70">公開日</dt>
                    <dd className="text-sm text-charcoal mt-1">{formatDate(work.publishedAt)}</dd>
                  </div>

                  {work.projectUrl && (
                    <div className="pt-2 border-t border-charcoal/10">
                      <Link 
                        href={work.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-deep-violet hover:text-rich-lavender transition-colors"
                      >
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                        サイトを見る
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {work.featuredImage && (
          <div className="mb-8 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={work.featuredImage}
              alt={work.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Work Content */}
        <Card variant="ghost" size="lg" className="mb-8">
          <CardContent>
            <div 
              className="prose prose-lg max-w-none prose-headings:text-deep-violet prose-a:text-deep-violet prose-a:hover:text-rich-lavender"
              dangerouslySetInnerHTML={{ __html: work.content }}
            />
          </CardContent>
        </Card>

        {/* Additional Images Gallery */}
        {work.images && work.images.length > 0 && (
          <Card variant="default" size="lg" className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">プロジェクト画像</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {work.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={image}
                      alt={`${work.title} - 画像 ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        {work.tags && work.tags.length > 0 && (
          <Card variant="ghost" size="md" className="mb-8">
            <CardContent>
              <h3 className="text-sm font-semibold text-charcoal/70 mb-3">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-white-lilac px-3 py-1 text-sm font-medium text-deep-violet"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-center">
          <Link href="/works">
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
              制作実績一覧に戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
