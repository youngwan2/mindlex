import { ArrowLeft, Bookmark, Calendar, ChevronRight, Earth, Play, Share } from "lucide-react";
import Link from "next/link";
import { Term } from "../types/term.types";
import { Button } from "@/components/ui/button";
import { MdAbc } from "react-icons/md";


interface TermDetailHeaderProps {
    term: Term
}
export default function TermDetailHeader({ term }: TermDetailHeaderProps) {

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-6 mb-3 bg-white dark:bg-transparent border-b border-gray-100 dark:border-gray-700 ">

            <div className="flex items-center gap-2 mb-12 text-sm text-gray-300">
                {/* 뒤로가기 버튼 */}
                <Link href={"/terms"} className="flex items-center dark:text-gray-400 text-black font-semibold">
                    <ArrowLeft className="w-4 h-4 mr-2 text-gray-500  cursor-pointer" />
                    용어사전
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" />
                <span className="text-gray-400">용어상세</span>
            </div>

            <div className={`flex md:flex-row flex-col justify-between`}>
                {/* 용어 메타데이터 */}
                <div>
                    <div className="flex items-center gap-1 mb-6 text-xs">
                        <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-500">최종 수정일: {new Date(term.updatedAt).toLocaleDateString()} </span>
                    </div>
                    <div className={`flex gap-3 items-center mb-2`}>
                        <h2 className="text-3xl font-bold">{term.termKo}</h2>
                        <div>
                            <div className="py-0.5 px-2.5 rounded-2xl border border-gray-100 inline-flex font-semibold text-sm">{term.category.name}</div>
                        </div>
                    </div>
                    <div className={``}>
                        <div className={`flex items-center gap-2 text-gray-500`}>
                            <Earth className="w-4 h-4" /> 영문: {term.termEn}
                        </div>
                    </div>
                    <div className={`flex items-center gap-2.5 text-gray-500`}>
                        <span className="inline-block font-bold text-sm align-middle">文</span> 한자: {term.termHanja}

                    </div>

                    {term.abbreviation &&
                        <div className={`flex items-center gap-2 text-gray-500`}>
                            <MdAbc className="w-4 h-4" /> 약어: {term.abbreviation}
                        </div>
                    }

                </div>


                {/* 북마크, 공유하기, 퀴즈풀기 */}
                <div className="flex items-center gap-4 flex-col">
                    <Button variant={'outline'} className="w-full flex items-center gap-2 px-4 py-2 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <Bookmark className="w-5 h-5" />
                        <span className="text-sm">북마크</span>
                    </Button>
                    <Button variant={'outline'} className="w-full flex items-center gap-2 px-4 py-2  dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <Share className="w-5 h-5" />
                        <span className="text-sm">공유하기</span>
                    </Button>
                    <Link href={`/quiz/${term.id}`} className=" w-full flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-400 transition justify-center">
                        <Play className="w-5 h-5" />
                        <span className="text-sm">퀴즈풀기</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}