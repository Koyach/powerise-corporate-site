import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { getWorks, formatDate, truncateText, getWorkCategories } from '@/lib/firebase/works';
import { Work } from '@/lib/firebase/types';

export const metadata: Metadata = {
  title: '制作実績 | Powerise',
  description: 'これまでに手がけた制作実績をご紹介します。Webサイト制作、アプリ開発など幅広いプロジェクトの事例をご覧いただけます。',
};

// Static Site Generation (SSG)
export const revalidate = 3600; // Revalidate every hour

export default async function WorksPage() {
  const works = await getWorks(24); // Get latest 24 works
  const categories = await getWorkCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <Heading 
          level="h1" 
          className="mb-4 text-deep-violet"
        >
          制作実績
        </Heading>
        <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
          これまでに手がけた制作実績をご紹介します。<br />
          様々な業界のお客様のニーズにお応えした事例をご覧ください。
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button className="inline-flex items-center rounded-full bg-deep-violet px-4 py-2 text-sm font-medium text-white">
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="inline-flex items-center rounded-full bg-white-lilac px-4 py-2 text-sm font-medium text-deep-violet hover:bg-deep-violet hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Works Grid */}
      {works.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
              />
            </svg>
          </div>
          <Heading level="h3" className="mb-2 text-charcoal/70">
            制作実績はまだありません
          </Heading>
          <p className="text-charcoal/50">
            最新の制作実績が公開されるまでお待ちください。
          </p>
        </div>
      )}
    </div>
  );
}

interface WorkCardProps {
  work: Work;
}

function WorkCard({ work }: WorkCardProps) {
  const excerpt = truncateText(work.description, 100);
  
  return (
    <Link href={`/works/${work.id}`} className="group">
      <Card 
        variant="default" 
        size="md" 
        className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1"
      >
        {/* Featured Image */}
        <div className="mb-4 overflow-hidden rounded-t-lg bg-gray-100">
          {work.featuredImage ? (
            <Image
              src={work.featuredImage}
              alt={work.title}
              width={400}
              height={240}
              className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="h-48 w-full bg-gradient-to-br from-white-lilac to-deep-violet/10 flex items-center justify-center">
              <svg 
                className="h-12 w-12 text-deep-violet/30" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                />
              </svg>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center rounded-full bg-white-lilac px-2.5 py-0.5 text-xs font-medium text-deep-violet">
              {work.category}
            </span>
            <time 
              className="text-xs text-charcoal/60"
              dateTime={work.publishedAt.toISOString()}
            >
              {formatDate(work.publishedAt)}
            </time>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-deep-violet transition-colors">
            {work.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="line-clamp-2 mb-3">
            {excerpt}
          </CardDescription>
          
          {/* Technologies */}
          {work.technologies && work.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {work.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded bg-charcoal/5 px-2 py-0.5 text-xs text-charcoal/70"
                >
                  {tech}
                </span>
              ))}
              {work.technologies.length > 3 && (
                <span className="inline-flex items-center rounded bg-charcoal/5 px-2 py-0.5 text-xs text-charcoal/70">
                  +{work.technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
