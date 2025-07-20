"use client"

import { CategoryListProps } from "@/features/category/types/category.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MdPsychology, MdSupportAgent, MdSentimentSatisfied, MdChildCare, MdMedication, MdSelfImprovement, MdGroups, MdMoreHoriz } from "react-icons/md";
import { IconType } from "react-icons";

const CATEGORY_ICON_MAP: Record<number, IconType> = {
    1: MdPsychology,           // 주요 정신질환
    10: MdSupportAgent,        // 심리치료/상담
    16: MdSentimentSatisfied,  // 증상/행동
    21: MdChildCare,           // 발달/아동·청소년
    25: MdMedication,          // 약물/치료법
    30: MdSelfImprovement,     // 자기이해/자기관리
    34: MdGroups,              // 사회/문화/가족
    38: MdMoreHoriz,           // 기타
};

const CATEGORY_ICON_COLOR_MAP: Record<number, string> = {
    1: "text-yellow-500 dark:text-yellow-400",      // 주요 정신질환
    10: "text-blue-500 dark:text-blue-400",         // 심리치료/상담
    16: "text-green-500 dark:text-green-400",       // 증상/행동
    21: "text-pink-500 dark:text-pink-400",         // 발달/아동·청소년
    25: "text-purple-500 dark:text-purple-400",     // 약물/치료법
    30: "text-orange-500 dark:text-orange-400",     // 자기이해/자기관리
    34: "text-cyan-500 dark:text-cyan-400",         // 사회/문화/가족
    38: "text-gray-400 dark:text-gray-300",         // 기타
};

function getRootCategoryId(category: import("@/features/category/types/category.types").Category): number {
    // parentCategory가 없으면 자기 id, 있으면 parentCategory의 id
    return category.parentCategory?.id ?? category.id;
}

export default function CategoryList({ categories }: CategoryListProps) {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 40 },
                1024: { slidesPerView: 5, spaceBetween: 50 },
            }}
            className="mySwiper"
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay]}
        >
            {categories.map(category => {
                const rootId = getRootCategoryId(category);
                const Icon = CATEGORY_ICON_MAP[rootId] || MdMoreHoriz;
                const iconColor = CATEGORY_ICON_COLOR_MAP[rootId] || "text-gray-400 dark:text-gray-300";
                const childCount = category.children ? category.children.length : 0;
                return (<SwiperSlide key={category.id}>
                    <div className="relative group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg px-6 py-7 flex flex-col items-center text-center transition hover:shadow-xl hover:-translate-y-1 duration-200 min-h-[270px]">
                        {/* 브랜드 컬러 배지 */}
                        <span className="absolute left-4 top-4 bg-[#ffb900] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 select-none">
                            {category.level === 1 ? '대표' : '세부'}
                        </span>
                        {/* 아이콘 */}
                        <div className={`mb-3 mt-2 text-5xl ${iconColor} drop-shadow-sm`}>
                            <Icon />
                        </div>
                        {/* 카테고리명 */}
                        <h3 className="mb-1 font-bold text-xl text-[#1a2233] dark:text-gray-100 tracking-tight truncate w-full" title={category.name}>{category.name}</h3>
                        {/* 설명 */}
                        <p className="text-gray-600 dark:text-gray-300 text-base mb-3 line-clamp-2 min-h-[44px]">{category.description}</p>
                        {/* 용어 개수/하위 카테고리 개수 */}
                        <div className="flex gap-2 justify-center items-center mt-auto">
                            {typeof category.termCount === 'number' && (
                                <span className="inline-flex items-center bg-[#ffb900]/10 text-[#ffb900] text-xs font-semibold px-2 py-1 rounded-full border border-[#ffb900]/30">
                                    용어 {category.termCount.toLocaleString()}개
                                </span>
                            )}
                            {childCount > 0 && (
                                <span className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                                    하위 {childCount}개
                                </span>
                            )}
                        </div>
                    </div>
                </SwiperSlide>
                );
            })}
        </Swiper>
    )
}