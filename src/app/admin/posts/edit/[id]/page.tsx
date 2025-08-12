import { notFound } from 'next/navigation';
import { PostForm } from '@/components/admin/PostForm';
import { getPostByIdAction } from '@/app/actions/postActions';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  
  const post = await getPostByIdAction(id);

  if (!post) {
    notFound();
  }

  return <PostForm post={post} mode="edit" />;
}
