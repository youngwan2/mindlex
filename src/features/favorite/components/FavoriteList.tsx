'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import FavoriteItem from './FavoriteItem';

interface Favorite {
    id: number;
    targetId: number;
    type: 'term' | 'quiz';
    termKo?: string;
    termEn?: string;
    definition?: string;
    title?: string;
    question?: string;
}

interface FavoriteListProps {
    favorites: Favorite[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    searchQuery?: string;
}

export default function FavoriteList({ favorites, isLoading, isError, error, searchQuery = '' }: FavoriteListProps) {

    // 서버에서 검색이 처리되므로 클라이언트 사이드 필터링 제거
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand" />
                <span className="ml-2">북마크 정보를 불러오는 중...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertTitle>오류 발생</AlertTitle>
                <AlertDescription>
                    {error?.message || '북마크 정보를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'}
                </AlertDescription>
            </Alert>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-md border border-slate-200 dark:border-gray-800">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-2xl font-semibold mb-2 text-primary">북마크가 없습니다</h3>
                <p className="text-muted-foreground mb-2">
                    {searchQuery
                        ? <><span className="font-bold text-red-500">{`'${searchQuery}'`}</span>에 대한 검색 결과가 없습니다.</>
                        : '관심있는 용어나 퀴즈를 북마크에 추가해보세요.'}
                </p>
                <span className="text-xs text-gray-400">북마크는 용어/퀴즈 상세에서 추가할 수 있습니다.</span>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite: Favorite) => (
                <FavoriteItem
                    key={`${favorite.type}-${favorite.id}`}
                    favorite={favorite}
                />
            ))}
        </div>
    );
}
