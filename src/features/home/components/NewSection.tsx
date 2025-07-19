// interface PropsType { }

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";

export default function NewSection() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">최신 소식</h2>
                    <Button variant="ghost" className="text-blue-600 dark:text-blue-300">
                        전체보기 <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "새로운 카테고리 '아동 정신건강' 추가",
                            date: "2024.01.15",
                            type: "업데이트",
                            description: "아동과 청소년 정신건강 관련 용어들을 새롭게 추가했습니다.",
                        },
                        {
                            title: "월간 퀴즈 챌린지 이벤트 시작",
                            date: "2024.01.10",
                            type: "이벤트",
                            description: "한 달간 진행되는 특별 퀴즈 이벤트에 참여해보세요.",
                        },
                        {
                            title: "사용자 피드백 반영 업데이트",
                            date: "2024.01.05",
                            type: "공지",
                            description: "여러분의 소중한 의견을 반영한 개선사항을 적용했습니다.",
                        },
                    ].map((news, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-neutral-800 border dark:border-gray-700">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="secondary" className="text-xs bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                                        {news.type}
                                    </Badge>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {news.date}
                                    </span>
                                </div>
                                <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{news.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}