"use client"
import { HomeTermListProps } from "@/features/term/types/term.types";
import { Swiper, SwiperSlide } from "swiper/react";

// 카테고리 id별 라벨 색상 매핑
const CATEGORY_LABEL_COLOR_MAP: Record<number, string> = {
    1: "bg-yellow-100 text-yellow-700 border-yellow-300",      // 주요 정신질환
    10: "bg-blue-100 text-blue-700 border-blue-300",           // 심리치료/상담
    16: "bg-green-100 text-green-700 border-green-300",        // 증상/행동
    21: "bg-pink-100 text-pink-700 border-pink-300",           // 발달/아동·청소년
    25: "bg-purple-100 text-purple-700 border-purple-300",     // 약물/치료법
    30: "bg-orange-100 text-orange-700 border-orange-300",     // 자기이해/자기관리
    34: "bg-cyan-100 text-cyan-700 border-cyan-300",           // 사회/문화/가족
    38: "bg-gray-100 text-gray-500 border-gray-300",           // 기타
};


export default function TermList({ terms }: HomeTermListProps) {
    return (
        <Swiper
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 50 },
            }}
        >
            {terms.map(term => {
                const labelColor = CATEGORY_LABEL_COLOR_MAP[term.category?.id] || "bg-gray-100 text-gray-500 border-gray-300";
                const darkLabelColor = {
                    1: "dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
                    10: "dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
                    16: "dark:bg-green-900 dark:text-green-200 dark:border-green-700",
                    21: "dark:bg-pink-900 dark:text-pink-200 dark:border-pink-700",
                    25: "dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700",
                    30: "dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700",
                    34: "dark:bg-cyan-900 dark:text-cyan-200 dark:border-cyan-700",
                    38: "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
                }[term.category?.id] || "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
                return (
                    <SwiperSlide key={term.id} className="p-2 rounded-md py-4 bg-white dark:bg-neutral-900 dark:border-gray-700">
                        <div key={term.id} className=" min-w-[280px]">
                            <div className="flex-col items-center justify-center mb-2">
                                <span className={`inline-block text-sm border rounded-xl px-1.5 py-0.5 min-w-[100px] mb-3 ${labelColor} ${darkLabelColor}`}>{term.category.name || '없음'}</span>
                                <h3 className="text-lg font-semibold flex flex-wrap justify-center text-gray-900 dark:text-white">{term.termKo} <span>({term.termEn})</span></h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{term.definition}</p>
                        </div>
                    </SwiperSlide>
                );
            })}

        </Swiper>
    )
}