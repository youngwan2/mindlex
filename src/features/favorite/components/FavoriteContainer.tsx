"use client"

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useFavoritesGetQuery } from "../api/queries";
import Pagination from "@/shared/components/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FavoriteList from "./FavoriteList";
import FavoriteSearchBar from "./FavoriteSearchBar";

export default function FavoriteContainer() {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const [activeTab, setActiveTab] = useState<'all' | 'term' | 'quiz'>(
        (searchParams.get('type') as 'all' | 'term' | 'quiz') || 'all'
    );
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [size] = useState(Number(searchParams.get('size')) || 12);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    // 각 탭별 데이터 쿼리 - quiz는 quizs 테이블이 없어서 임시 비활성화
    const allQuery = useFavoritesGetQuery('all', page, size, searchQuery);
    const termQuery = useFavoritesGetQuery('term', page, size, searchQuery);
    // const quizQuery = useFavoritesGetQuery('quiz', page, size, searchQuery);

    // 현재 활성 탭에 따른 데이터 선택
    const getCurrentData = () => {
        if (activeTab === 'all') return allQuery;
        if (activeTab === 'term') return termQuery;
        // if (activeTab === 'quiz') return quizQuery;
        return allQuery;
    };

    const currentData = getCurrentData();

    // 현재 활성 탭의 총 항목 수 가져오기
    const getCurrentTotalCount = () => {
        if (activeTab === 'all') return allQuery.totalCount || 0;
        if (activeTab === 'term') return termQuery.totalCountTerm || 0;
        // if (activeTab === 'quiz') return quizQuery.totalCountQuiz || 0;
        return 0;
    };

    // 탭 변경
    const handleTabChange = useCallback((value: string) => {
        setActiveTab(value as 'all' | 'term' | 'quiz');
        setPage(1); // 탭 변경 시 페이지 초기화

        // 쿼리 무효화하여 새로운 데이터 로드
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }, [queryClient]);

    // 검색
    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setPage(1); // 검색 시 페이지 초기화
    }, []);


    // 페이지 변경
    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return (
        <div className="max-w-[1400px] w-full mx-auto py-8 px-4">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">즐겨찾기</h1>
                    <p className="text-muted-foreground">
                        저장한 용어와 퀴즈를 한 곳에서 관리하세요.
                    </p>
                </div>

                <FavoriteSearchBar value={searchQuery} onSearch={handleSearch} />

                <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="all">전체</TabsTrigger>
                        <TabsTrigger value="term">용어</TabsTrigger>
                        <TabsTrigger value="quiz" disabled> 퀴즈 (준비중)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                        <FavoriteList
                            favorites={currentData.favorites}
                            isLoading={currentData.isLoading}
                            isError={currentData.isError}
                            error={currentData.error}
                            searchQuery={searchQuery}
                        />
                    </TabsContent>

                    <TabsContent value="term" className="mt-0">
                        <FavoriteList
                            favorites={termQuery.favorites || []}
                            isLoading={termQuery.isLoading}
                            isError={termQuery.isError}
                            error={currentData.error}
                            searchQuery={searchQuery}
                        />
                    </TabsContent>

                    <TabsContent value="quiz" className="mt-0">
                        {/* quizs 테이블이 없어서 임시 비활성화 */}
                        <div className="text-center py-8 text-muted-foreground">
                            퀴즈 기능은 준비 중입니다.
                        </div>
                        {/*
                        <FavoriteList
                            favorites={quizQuery.favorites || []}
                            isLoading={quizQuery.isLoading}
                            isError={quizQuery.isError}
                            searchQuery={searchQuery}
                        />
                        */}
                    </TabsContent>
                </Tabs>

                <div className="flex justify-center mt-8">
                    <Pagination
                        totalItems={getCurrentTotalCount()}
                        itemsPerPage={size}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}