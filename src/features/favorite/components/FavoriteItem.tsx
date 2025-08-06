'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarOff, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDeleteFavoriteMutation } from '@/features/favorite/api/mutations';
import { toast } from 'react-hot-toast';

interface FavoriteItemProps {
    favorite: {
        id: number;
        targetId: number;
        type: 'term' | 'quiz';
        // 용어 관련 필드
        termKo?: string;
        termEn?: string;
        definition?: string;
        // 퀴즈 관련 필드
        title?: string;
        question?: string;
    };
}

export default function FavoriteItem({ favorite }: FavoriteItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { mutate: deleteFavorite } = useDeleteFavoriteMutation();

    const handleRemoveFavorite = () => {
        setIsDeleting(true);
        deleteFavorite(
            { id: favorite.targetId, type: favorite.type },
            {
                onSuccess: () => {
                    toast.success('북마크가 삭제되었습니다.');
                    setIsDeleting(false);
                },
                onError: (error) => {
                    toast.error('북마크 삭제 중 오류가 발생했습니다.');
                    setIsDeleting(false);
                    console.error('북마크 삭제 오류:', error);
                }
            }
        );
    };

    // 대상 타입에 따른 경로 생성
    const detailPath = favorite.type === 'term'
        ? `/terms/${favorite.targetId}`
        : `/quiz/${favorite.targetId}`;

    // 타입에 따른 표시 내용 분기
    const renderContent = () => {
        if (favorite.type === 'term') {
            return (
                <>
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant="outline" className="mb-2 bg-brand/10 text-brand-dark border-brand/20">
                                    용어
                                </Badge>
                                <h3 className="text-xl font-bold line-clamp-2">{favorite.termKo}</h3>
                                {favorite.termEn && (
                                    <p className="text-sm text-muted-foreground mt-1">{favorite.termEn}</p>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-sm line-clamp-3">
                            {favorite.definition}
                        </p>
                    </CardContent>
                </>
            );
        } else {
            return (
                <>
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant="outline" className="mb-2 bg-brand/10 text-brand-dark border-brand/20">
                                    퀴즈
                                </Badge>
                                <h3 className="text-xl font-bold line-clamp-2">{favorite.title}</h3>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-sm line-clamp-3">
                            {favorite.question}
                        </p>
                    </CardContent>
                </>
            );
        }
    };

    return (
        <Card className="h-full flex flex-col transition-all hover:shadow-md">
            {renderContent()}

            <CardFooter className="pt-2 mt-auto">
                <div className="flex justify-between w-full gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={isDeleting}
                        onClick={handleRemoveFavorite}
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <StarOff className="h-4 w-4 mr-1" />
                        삭제
                    </Button>

                    <Button asChild variant="default" size="sm">
                        <Link href={detailPath}>
                            자세히 보기
                            <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
