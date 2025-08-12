'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getWorkByIdAction } from '@/app/actions/workActions';
import { WorkForm } from '@/components/admin/WorkForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';
import type { Work } from '@/lib/firebase/types';

export default function EditWorkPage() {
  const params = useParams();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        setLoading(true);
        const id = params.id as string;
        const fetchedWork = await getWorkByIdAction(id);
        
        if (fetchedWork) {
          setWork(fetchedWork);
        } else {
          setError('制作実績が見つかりませんでした');
        }
      } catch (err) {
        console.error('Error fetching work:', err);
        setError('制作実績の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchWork();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="error">
          {error}
        </Alert>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="space-y-6">
        <Alert variant="error">
          制作実績が見つかりませんでした
        </Alert>
      </div>
    );
  }

  return <WorkForm work={work} mode="edit" />;
}
