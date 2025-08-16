'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useQuizzes } from '@/features/quiz/api/queries';
import { useSaveQuizResultsMutation } from '@/features/quiz/api/mutations';
import { HiCheck, HiX, HiRefresh, HiSave, HiChevronLeft, HiChevronRight, HiLightBulb, HiPencilAlt } from 'react-icons/hi';
import { MdQuiz, MdTouchApp } from 'react-icons/md';

type QuizOption = { id: number; optionText: string; isCorrect?: boolean; explanation?: string };
type QuizItem = { id: number; question?: string; type?: string; options?: QuizOption[] };

type Props = {
    termId: string;
    initialTypes?: string;
    initialLimit?: number;
    initialShuffle?: boolean;
};

export default function QuizPlayer({ termId, initialTypes = '', initialLimit = 10, initialShuffle = true }: Props) {
    const typesArray = initialTypes ? initialTypes.split(',').map(s => s.trim()).filter(Boolean) : undefined;

    const { data, isLoading } = useQuizzes(termId, { types: typesArray, limit: initialLimit, shuffle: initialShuffle });
    const quizzes: QuizItem[] = data && 'success' in data && data.success ? (data.quizzes as QuizItem[]) : [];

    const [index, setIndex] = useState(0);
    const [selectedRecord, setSelectedRecord] = useState<Record<number, number | null>>({});
    const [score, setScore] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [resultsRecord, setResultsRecord] = useState<Record<number, boolean>>({});
    const [saving, setSaving] = useState(false);

    const questionRef = useRef<HTMLDivElement | null>(null);

    const saveMutation = useSaveQuizResultsMutation();

    useEffect(() => {
        if (questionRef.current) questionRef.current.focus();
    }, [index]);

    // Add helper function to get quiz type icon and info
    function getQuizTypeInfo(type?: string) {
        switch (type?.toLowerCase()) {
            case 'mc':
            case 'multiple_choice':
                return {
                    icon: <MdQuiz className="w-4 h-4" />,
                    label: '객관식',
                    color: 'text-blue-600 bg-blue-50 border-blue-200'
                };
            case 'ox':
            case 'true_false':
                return {
                    icon: <MdTouchApp className="w-4 h-4" />,
                    label: 'O/X',
                    color: 'text-green-600 bg-green-50 border-green-200'
                };
            case 'short':
            case 'short_answer':
                return {
                    icon: <HiPencilAlt className="w-4 h-4" />,
                    label: '단답형',
                    color: 'text-purple-600 bg-purple-50 border-purple-200'
                };
            default:
                return {
                    icon: <HiLightBulb className="w-4 h-4" />,
                    label: '일반',
                    color: 'text-gray-600 bg-gray-50 border-gray-200'
                };
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
                    <p className="text-muted-foreground">퀴즈를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (!isLoading && quizzes.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/20 mb-4">
                    <HiX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">퀴즈를 찾을 수 없습니다</h3>
                <p className="text-muted-foreground">선택한 조건에 맞는 퀴즈가 없습니다.</p>
            </div>
        );
    }

    const current = quizzes[index];

    function handleSelect(option: QuizOption) {
        if (resultsRecord[current.id] !== undefined) return;

        const correct = !!option.isCorrect;
        setSelectedRecord(prev => ({ ...prev, [current.id]: option.id }));
        setResultsRecord(prev => ({ ...prev, [current.id]: correct }));
        if (correct) setScore(s => s + 1);
    }

    function handleNext() {
        if (index + 1 < quizzes.length) {
            setIndex(i => i + 1);
        } else {
            setShowSummary(true);
        }
    }

    function handlePrev() {
        if (index > 0) setIndex(i => i - 1);
    }

    function handleRestart() {
        setIndex(0);
        setScore(0);
        setShowSummary(false);
        setSelectedRecord({});
        setResultsRecord({});
    }

    function handleSaveResults() {
        const payload = {
            results: Object.entries(resultsRecord).map(([quizId, isCorrect]) => ({ quizId: Number(quizId), isCorrect }))
        };

        if (payload.results.length === 0) {
            alert('저장할 결과가 없습니다.');
            return;
        }

        setSaving(true);
        saveMutation.mutate(payload, {
            onSuccess: (res) => {
                setSaving(false);
                alert(`저장 완료: ${res.saved || 0}개`);
            },
            onError: () => {
                setSaving(false);
                alert('저장 실패');
            }
        });
    }

    if (showSummary) {
        const percentage = Math.round((score / quizzes.length) * 100);
        const isExcellent = percentage >= 80;
        const isGood = percentage >= 60;

        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className={`px-8 py-6 bg-gradient-to-r ${isExcellent ? 'from-green-500/10 to-emerald-500/10' : isGood ? 'from-blue-500/10 to-cyan-500/10' : 'from-orange-500/10 to-yellow-500/10'}`}>
                        <div className="text-center">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isExcellent ? 'bg-green-500/20 text-green-600' : isGood ? 'bg-blue-500/20 text-blue-600' : 'bg-orange-500/20 text-orange-600'}`}>
                                <HiCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">퀴즈 완료!</h3>
                            <p className="text-muted-foreground">수고하셨습니다. 결과를 확인해보세요.</p>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-foreground mb-1">{score}</div>
                                <div className="text-sm text-muted-foreground">정답 수</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-3xl font-bold mb-1 ${isExcellent ? 'text-green-600' : isGood ? 'text-blue-600' : 'text-orange-600'}`}>
                                    {percentage}%
                                </div>
                                <div className="text-sm text-muted-foreground">정답률</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>진행률</span>
                                <span>{score} / {quizzes.length}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-500 ${isExcellent ? 'bg-green-500' : isGood ? 'bg-blue-500' : 'bg-orange-500'}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={handleRestart}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors font-medium"
                            >
                                <HiRefresh className="w-4 h-4" />
                                다시 풀기
                            </button>
                            <button
                                onClick={handleSaveResults}
                                disabled={saving}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <HiSave className="w-4 h-4" />
                                {saving ? '저장중...' : '결과 저장'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const progress = ((index + 1) / quizzes.length) * 100;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <HiLightBulb className="w-5 h-5 text-brand" />
                        <span className="text-sm font-medium text-muted-foreground">
                            문제 {index + 1} / {quizzes.length}
                        </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}% 완료
                    </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                    <div
                        className="bg-brand h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-brand/5 via-primary/5 to-brand/5 px-8 py-6 border-b border-border/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div
                                tabIndex={-1}
                                ref={questionRef}
                                className="text-xl font-semibold text-foreground leading-relaxed"
                                aria-label={`문제 ${index + 1} / ${quizzes.length}`}
                            >
                                {String(current.question ?? '질문 없음')}
                            </div>
                        </div>

                        {/* Quiz Type Badge */}
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getQuizTypeInfo(current.type).color}`}>
                            {getQuizTypeInfo(current.type).icon}
                            <span>{getQuizTypeInfo(current.type).label}</span>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="p-8 space-y-3">
                    {(current.options ?? []).map((opt: QuizOption, optIndex: number) => {
                        const selectedForCurrent = selectedRecord[current.id] ?? null;
                        const isSelected = selectedForCurrent === opt.id;
                        const isCorrect = !!opt.isCorrect;
                        const answeredForCurrent = resultsRecord[current.id] !== undefined;
                        const showResult = answeredForCurrent && isSelected;

                        return (
                            <button
                                key={opt.id}
                                onClick={() => handleSelect(opt)}
                                disabled={answeredForCurrent}
                                className={`block w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${showResult
                                    ? isCorrect
                                        ? 'bg-green-50 border-green-200 text-green-900'
                                        : 'bg-red-50 border-red-200 text-red-900'
                                    : isSelected
                                        ? 'bg-brand/5 border-brand text-foreground'
                                        : 'bg-card border-border hover:border-brand/30 hover:bg-muted/20'
                                    } ${answeredForCurrent ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                aria-pressed={isSelected}
                                aria-label={`선택지 ${optIndex + 1}: ${opt.optionText}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${showResult
                                        ? isCorrect
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'bg-red-500 border-red-500 text-white'
                                        : isSelected
                                            ? 'bg-brand border-brand text-white'
                                            : 'border-muted-foreground/30'
                                        }`}>
                                        {showResult ? (isCorrect ? <HiCheck className="w-3 h-3" /> : <HiX className="w-3 h-3" />) : String.fromCharCode(65 + optIndex)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium">{opt.optionText}</div>

                                        {answeredForCurrent && isSelected && (
                                            <div className={`text-sm mt-2 p-2 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {isCorrect ? '✓ 정답입니다!' : '✗ 오답입니다.'}
                                            </div>
                                        )}

                                        {answeredForCurrent && isSelected && opt.explanation && (
                                            <div className="text-sm mt-2 p-3 bg-blue-50 text-blue-800 rounded border-l-4 border-blue-200">
                                                <div className="font-medium mb-1">💡 해설</div>
                                                {opt.explanation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div className="px-8 py-6 bg-muted/30 border-t border-border/30">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={index === 0}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <HiChevronLeft className="w-4 h-4" />
                            이전
                        </button>

                        <div className="text-sm text-muted-foreground">
                            {index + 1} / {quizzes.length}
                        </div>

                        <button
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors font-medium"
                        >
                            {index + 1 < quizzes.length ? (
                                <>
                                    다음
                                    <HiChevronRight className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    완료
                                    <HiCheck className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
