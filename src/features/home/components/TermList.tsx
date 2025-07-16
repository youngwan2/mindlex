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
    console.log(terms)
    return (
        <Swiper
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {terms.map(term => {
                const labelColor = CATEGORY_LABEL_COLOR_MAP[term.category?.id] || "bg-gray-100 text-gray-500 border-gray-300";
                return (
                    <SwiperSlide key={term.id} className="p-2 border rounded-md py-4 ">
                        <div key={term.id} className=" min-w-[280px]">
                            <div className="flex-col items-center justify-center mb-2">
                                <span className={`inline-block text-sm border rounded-xl px-1.5 py-0.5 min-w-[100px] mb-3 ${labelColor}`}>{term.category.name || '없음'}</span>
                                <h3 className="text-lg font-semibold flex flex-wrap justify-center">{term.termKo} <span>({term.termEn})</span></h3>
                            </div>
                            <p className="text-sm text-gray-600 text-center">{term.definition}</p>
                        </div>
                    </SwiperSlide>
                );
            })}

        </Swiper>
    )
}