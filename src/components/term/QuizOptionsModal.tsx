'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStats } from '@/features/quiz/api/queries';
import ModalWrapper from './quiz-options/ModalWrapper';
import TypeCard from './quiz-options/TypeCard';
import StatsCard from './quiz-options/StatsCard';
import Controls from './quiz-options/Controls';

// constants: 런타임에서 undefined일 수 있으므로 폴백을 적용한 TYPES_LIST 사용
import { VALID_TYPES, TYPE_INFO, QuizType } from './quiz-options/constants';
const TYPES_LIST: QuizType[] = Array.isArray(VALID_TYPES) ? (VALID_TYPES as unknown as QuizType[]) : ['mc', 'ox', 'short', 'fill_blank'];

import { HiViewList, HiCheckCircle, HiPencilAlt, HiLightBulb, HiCog, HiHashtag } from 'react-icons/hi';

type Props = {
    termId: string;
    onClose: () => void;
};

function iconFor(key: string) {
    switch (key) {
        case 'list':
            return <HiViewList className="inline-block w-6 h-6" />;
        case 'checkCircle':
            return <HiCheckCircle className="inline-block w-6 h-6" />;
        case 'edit':
            return <HiPencilAlt className="inline-block w-6 h-6" />;
        default:
            return <HiPencilAlt className="inline-block w-6 h-6" />;
    }
}

export default function QuizOptionsModal({ termId, onClose }: Props) {
    const router = useRouter();
    const [types, setTypes] = useState<QuizType[]>(['mc', 'ox', 'short']);
    const [limit, setLimit] = useState<number>(10);
    const [shuffle, setShuffle] = useState<boolean>(true);
    const [closing, setClosing] = useState(false);
    const [warning, setWarning] = useState<string | null>(null);

    const { data: statsData, isLoading: statsLoading } = useQuizStats(termId, undefined);
    const totalCount = statsData && 'totalCount' in statsData ? statsData.totalCount : null;
    const typeCounts = statsData && 'counts' in statsData ? statsData.counts as Record<string, number> : { mc: 0, ox: 0, short: 0, fill_blank: 0 };

    const dialogRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    function toggleType(t: QuizType) {
        // do not allow toggling to a selected state if there are zero available
        const count = typeCounts[t as keyof typeof typeCounts] || 0;
        if (count === 0) return;
        setTypes(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));
    }

    function selectAllAvailable() {
        const available = TYPES_LIST.filter((t: QuizType) => (typeCounts[t as keyof typeof typeCounts] || 0) > 0);
        if (available.length === 0) {
            setWarning('사용 가능한 문제 유형이 없습니다. 다른 범위를 선택하거나 문제를 추가하세요.');
            return;
        }
        setWarning(null);
        setTypes(available);
    }

    function startQuiz(mode: 'quick' | 'custom') {
        // filter out any selected types that have zero count to avoid sending zero-result types to server
        const selectedToSend = types.filter(t => (typeCounts[t as keyof typeof typeCounts] || 0) > 0);
        if (selectedToSend.length === 0) {
            setWarning('선택한 유형들 중 사용 가능한 문제가 없습니다. 다른 유형을 선택하세요.');
            return;
        }

        const q = new URLSearchParams({
            mode,
            types: selectedToSend.join(','),
            limit: String(limit),
            shuffle: String(shuffle)
        });
        setClosing(true);
        router.push(`/terms/${termId}/quizzes/start?${q.toString()}`);
    }

    function requestClose() {
        setClosing(true);
        setTimeout(() => onClose(), 200);
    }

    if (!mounted) return null;

    return (
        <ModalWrapper titleId="quiz-options-title" onClose={onClose} dialogRef={dialogRef} closing={closing}>
            <div ref={dialogRef}>
                <div className="sticky top-0 z-20 bg-gradient-to-r from-[var(--color-brand)]/10 via-[var(--color-brand)]/5 to-[var(--color-brand)]/10 px-8 py-6 border-b border-border/30 rounded-t-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[var(--color-brand)]/10 rounded-xl border border-[var(--color-brand)]/20">
                                <HiLightBulb className="w-6 h-6 text-[var(--color-brand)]" />
                            </div>
                            <div>
                                <h2 id="quiz-options-title" className="text-2xl font-bold text-foreground">퀴즈 시작하기</h2>
                                <p className="text-muted-foreground text-sm mt-1">문제 유형과 설정을 선택하여 맞춤형 퀴즈를 시작하세요</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={selectAllAvailable} className="text-sm px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)] transition-colors" title="사용 가능한 모든 유형 선택">사용 가능한 전체 선택</button>
                            <button onClick={requestClose} className="p-2 rounded-full hover:bg-[var(--color-brand)]/10 dark:hover:bg-[var(--color-brand)]/20 transition-colors group" aria-label="모달 닫기">
                                <svg className="w-5 h-5 text-muted-foreground group-hover:text-[var(--color-brand)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {warning && (
                        <div className="p-3 rounded-md bg-yellow-50 text-yellow-800 border border-yellow-200">
                            {warning}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <StatsCard totalCount={totalCount} loading={statsLoading} />
                        </div>

                        <div className="md:col-span-2">
                            <div className="grid grid-cols-3 gap-4">
                                {TYPES_LIST.map((type: QuizType) => (
                                    <TypeCard key={type} type={type} active={types.includes(type)} count={typeCounts[type as keyof typeof typeCounts] || 0} onToggle={toggleType} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <div className="p-1.5 bg-[var(--color-brand)]/10 rounded-lg">
                                <HiViewList className="w-4 h-4 text-[var(--color-brand)]" />
                            </div>
                            문제 유형 통계
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {TYPES_LIST.map((type: QuizType) => {
                                const rawInfo = TYPE_INFO?.[type];
                                const info = rawInfo ?? { label: String(type), iconKey: 'edit', description: '', difficulty: '', color: '' };
                                const count = typeCounts[type as keyof typeof typeCounts] || 0;

                                return (
                                    <div key={`brief-${type}`} className="p-4 rounded-xl border border-border bg-card hover:bg-[var(--color-brand)]/5 transition-colors">
                                        <div className="text-center space-y-2">
                                            <div className="p-2 bg-[var(--color-brand)]/10 rounded-lg w-fit mx-auto">
                                                <div className="text-[var(--color-brand)]">{iconFor(info.iconKey)}</div>
                                            </div>
                                            <div className="text-2xl font-bold text-[var(--color-brand)]">{count}</div>
                                            <div className="text-sm text-muted-foreground font-medium">{info.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <div className="p-1.5 bg-[var(--color-brand)]/10 rounded-lg">
                                    <HiHashtag className="w-4 h-4 text-[var(--color-brand)]" />
                                </div>
                                문제 개수
                            </h3>
                            <div className="bg-card rounded-xl p-6 border border-border">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-medium text-foreground">{limit}문제</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setLimit(5)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${limit === 5 ? 'bg-[var(--color-brand)] text-white shadow-sm' : 'bg-muted text-muted-foreground hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)]'}`}>5</button>
                                        <button onClick={() => setLimit(10)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${limit === 10 ? 'bg-[var(--color-brand)] text-white shadow-sm' : 'bg-muted text-muted-foreground hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)]'}`}>10</button>
                                        <button onClick={() => setLimit(20)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${limit === 20 ? 'bg-[var(--color-brand)] text-white shadow-sm' : 'bg-muted text-muted-foreground hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)]'}`}>20</button>
                                    </div>
                                </div>
                                <input type="range" min={1} max={Math.min(50, totalCount || 50)} value={limit} onChange={e => setLimit(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider" />
                                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                    <span>1</span>
                                    <span>{Math.min(50, totalCount || 50)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <div className="p-1.5 bg-[var(--color-brand)]/10 rounded-lg">
                                    <HiCog className="w-4 h-4 text-[var(--color-brand)]" />
                                </div>
                                추가 설정
                            </h3>
                            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                                <label className="flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-lg cursor-pointer hover:bg-[var(--color-brand)]/5 transition-colors group">
                                    <div>
                                        <div className="font-medium text-foreground group-hover:text-[var(--color-brand)] transition-colors">문제 순서 섞기</div>
                                        <div className="text-sm text-muted-foreground">매번 다른 순서로 문제 출제</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={shuffle}
                                        onChange={e => setShuffle(e.target.checked)}
                                        className="w-5 h-5 rounded focus:ring-2 focus:ring-[var(--color-brand)]/50 text-[var(--color-brand)] border-border bg-background"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <Controls typesLength={types.length} onCancel={requestClose} onQuickStart={() => startQuiz('quick')} onCustomStart={() => startQuiz('custom')} />
            </div>
        </ModalWrapper>
    );
}
