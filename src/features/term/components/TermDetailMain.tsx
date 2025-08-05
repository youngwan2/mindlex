"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Term } from "../types/term.types";
import { MdOutlineShortText, MdDescription, MdAbc, MdCalendarToday } from "react-icons/md";
import { SiMermaid } from 'react-icons/si';
import { Mermaid } from 'mdx-mermaid/lib/Mermaid';

interface TermDetailMainProps {
    term: Term
}


export default function TermDetailMain({ term }: TermDetailMainProps) {


    return (
        <section className="max-w-[1400px] w-full mx-auto space-y-8 min-h-screen">
            {/* 정의(한 줄 설명) */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <MdOutlineShortText className="w-6 h-6" style={{ color: '#ffb900' }} />
                        정의
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{term.definition}</p>
                </CardContent>
            </Card>

            {/* 상세 설명 */}
            {term.description && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <MdDescription className="w-6 h-6" style={{ color: '#ffb900' }} />
                            상세 설명
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{term.description}</p>
                    </CardContent>
                </Card>
            )}

            {/* 기타 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <MdAbc className="w-6 h-6" style={{ color: '#ffb900' }} />
                            약어
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="font-semibold text-lg">{term.abbreviation || '-'}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <MdCalendarToday className="w-6 h-6" style={{ color: '#ffb900' }} />
                            등록일
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="font-semibold text-lg">{term.createdAt ? new Date(term.createdAt).toLocaleDateString() : '-'}</span>
                    </CardContent>
                </Card>
            </div>

            {/* mermaid 시각자료 */}
            {term.visualCode && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <SiMermaid className="w-6 h-6" style={{ color: '#ffb900' }} />
                            시각자료 (Mermaid)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Mermaid chart={term.visualCode} />
                    </CardContent>
                </Card>
            )}
        </section>
    )
}