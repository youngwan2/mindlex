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
    1: "text-yellow-500",      // 주요 정신질환
    10: "text-blue-500",      // 심리치료/상담
    16: "text-green-500",     // 증상/행동
    21: "text-pink-500",      // 발달/아동·청소년
    25: "text-purple-500",    // 약물/치료법
    30: "text-orange-500",    // 자기이해/자기관리
    34: "text-cyan-500",      // 사회/문화/가족
    38: "text-gray-400",      // 기타
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
                const iconColor = CATEGORY_ICON_COLOR_MAP[rootId] || "text-gray-400";
                const childCount = category.children ? category.children.length : 0;
                return (
                    <SwiperSlide key={category.id}>
                        <div className="group  border rounded-md py-6 px-4 flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-slate-900">
                            <div className={`group-hover:scale-125 mb-3 text-4xl ${iconColor}`}><Icon /></div>
                            <h3 className="mb-2 font-semibold text-xl">{category.name}</h3>
                            <p className="text-gray-600 text-lg">{category.description}</p>
                            {childCount > 0 && (
                                <div className="mt-2 text-sm text-gray-500 border rounded-full px-2 py-1">하위 카테고리 {childCount}개</div>
                            )}
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}