'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface FavoriteSearchBarProps {
    value: string;
    onSearch: (query: string) => void;
}

export default function FavoriteSearchBar({ value, onSearch }: FavoriteSearchBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState(value || '');
    const debouncedValue = useDebounce(searchTerm, 300);
    const onSearchRef = useRef(onSearch);

    // onSearch 함수 참조 업데이트
    useEffect(() => {
        onSearchRef.current = onSearch;
    }, [onSearch]);

    useEffect(() => {
        // 디바운스된 검색어가 변경되면 부모 컴포넌트에 알림
        onSearchRef.current(debouncedValue);

        // URL 쿼리 파라미터 업데이트
        const params = new URLSearchParams(window.location.search);
        if (debouncedValue) {
            params.set('search', debouncedValue);
        } else {
            params.delete('search');
        }

        const newUrl = `${pathname}?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
    }, [debouncedValue, pathname, router]);

    const handleClear = () => {
        setSearchTerm('');
        onSearchRef.current('');
    };

    return (
        <div className="relative w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="용어나 퀴즈 검색..."
                    className="pl-10 pr-12 py-6"
                />
                {searchTerm && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-2"
                        onClick={handleClear}
                    >
                        취소
                    </Button>
                )}
            </div>
        </div>
    );
}
