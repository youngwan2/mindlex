// interface PropsType { }

import { Button } from "@/components/ui/button";
import { Play, Star, TrendingUp, Trophy } from "lucide-react";

export default function QuizSection() {
    return (
        <section className="py-16 bg-gradient-to-r from-[#1c2d4e] to-[#212e48] text-white dark:from-gray-800 dark:to-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-100">오늘의 퀴즈에 도전해보세요!</h2>
                    <p className="text-blue-100 dark:text-gray-300 mb-8 text-lg">
                        재미있는 퀴즈로 정신건강 용어를 학습하고 실력을 테스트해보세요
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6">
                            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-white dark:text-blue-400" />
                            <h3 className="font-semibold mb-2 text-white dark:text-gray-100">레벨업 시스템</h3>
                            <p className="text-sm text-blue-100 dark:text-gray-300">퀴즈를 풀며 레벨을 올려보세요</p>
                        </div>
                        <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6">
                            <Trophy className="h-8 w-8 mx-auto mb-3 text-white dark:text-yellow-400" />
                            <h3 className="font-semibold mb-2 text-white dark:text-gray-100">랭킹 시스템</h3>
                            <p className="text-sm text-blue-100 dark:text-gray-300">다른 사용자들과 실력을 겨뤄보세요</p>
                        </div>
                        <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6">
                            <Star className="h-8 w-8 mx-auto mb-3 text-white dark:text-purple-400" />
                            <h3 className="font-semibold mb-2 text-white dark:text-gray-100">성취 배지</h3>
                            <p className="text-sm text-blue-100 dark:text-gray-300">다양한 배지를 수집해보세요</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="px-8 py-4 rounded-full dark:bg-brand-dark dark:text-gray-100">
                            <Play className="h-5 w-5 mr-2" />
                            오늘의 퀴즈
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 py-4 rounded-full border-white text-white hover:bg-white hover:text-blue-600 bg-transparent dark:border-gray-400 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-blue-700"
                        >
                            <Trophy className="h-5 w-5 mr-2" />
                            랭킹 보기
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}