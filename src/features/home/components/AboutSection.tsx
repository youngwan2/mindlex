import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Heart, Play } from "lucide-react";

export default function AboutSection() {
    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">마인드렉스란?</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">정신건강에 대한 올바른 이해를 돕는 교육 플랫폼입니다</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">                        <div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">우리의 미션</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <BookOpen className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">쉬운 설명</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">복잡한 전문용어를 누구나 이해할 수 있게 설명합니다</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Play className="h-3 w-3 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">재미있는 학습</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">퀴즈와 게임을 통해 즐겁게 학습할 수 있습니다</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Heart className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">정신건강 인식 개선</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">올바른 정보로 편견을 없애고 이해를 높입니다</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8">
                            <div className="text-center">
                                <Brain className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">전문가 검증</h4>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">모든 용어와 설명은 정신건강 전문가들의 검토를 거쳐 제공됩니다</p>
                                <Button variant="outline">자세히 알아보기</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}