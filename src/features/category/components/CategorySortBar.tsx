"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { CategorySearchParams } from "../types/category.types";
import { Button } from "@/components/ui/button";

interface CategorySortBarProps {
    onSearchChange: (params: CategorySearchParams) => void;
    initialParams?: CategorySearchParams;
}

export default function CategorySortBar({ onSearchChange, initialParams }: CategorySortBarProps) {
    const [search, setSearch] = useState(initialParams?.search || '');
    const [sort, setSort] = useState<'name' | 'termCount'>(initialParams?.sort as 'name' | 'termCount' || 'name');
    const [order, setOrder] = useState<'ASC' | 'DESC'>(initialParams?.order || 'ASC');

    // 검색어 변경 시 디바운스 처리
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange({
                search: search || undefined,
                sort,
                order
            });
        }, 300); // 300ms 디바운스

        return () => clearTimeout(timer);
    }, [search, sort, order, onSearchChange]);

    const handleSearchClear = () => {
        setSearch('');
    };

    const handleSortChange = (value: string) => {
        const [sortField, sortOrder] = value.split('-') as ['name' | 'termCount', 'ASC' | 'DESC'];
        setSort(sortField);
        setOrder(sortOrder);
    };

    const getSortValue = () => `${sort}-${order}`;

    return (
        <div className="flex gap-5 md:flex-row flex-col md:w-auto w-full">
            <div className="relative">
                <Label className="absolute left-2 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </Label>
                <Input
                    className="pl-10 pr-10"
                    placeholder="카테고리명, 설명으로 검색.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-auto p-1"
                        onClick={handleSearchClear}
                    >
                        <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </Button>
                )}
            </div>

            <div>
                <Select value={getSortValue()} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="정렬 기준" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-ASC">가나다순 (오름차순)</SelectItem>
                        <SelectItem value="name-DESC">가나다순 (내림차순)</SelectItem>
                        <SelectItem value="termCount-DESC">용어수순 (많은순)</SelectItem>
                        <SelectItem value="termCount-ASC">용어수순 (적은순)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}