import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface FAQHeaderProps {
    onSearchChange: (value: string) => void;
    searchValue: string;
}

export default function FAQHeader({ onSearchChange, searchValue }: FAQHeaderProps) {
    return (
        <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="w-full min-h-[200px] max-w-[1400px] mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="font-semibold text-4xl mb-4 text-gray-900 dark:text-gray-100">
                        자주 묻는 질문
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        마인드렉스 이용 중 궁금한 점들에 대한 답변을 확인해보세요.
                        원하는 답변을 찾지 못하셨다면 문의하기를 이용해주세요.
                    </p>
                </div>

                <div className="max-w-lg mx-auto relative">
                    <Label htmlFor="faq-search" className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </Label>
                    <Input
                        id="faq-search"
                        type="search"
                        placeholder="궁금한 내용을 검색해보세요..."
                        className="pl-12 py-3 text-base rounded-full dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:border-gray-700"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
