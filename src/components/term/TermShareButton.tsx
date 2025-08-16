'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { HiCheck, HiClipboard, HiShare } from 'react-icons/hi';
import toast from 'react-hot-toast';

type Props = {
    termKo: string;
    termEn?: string;
    className?: string;
};

/**
 * TermShareButton
 * - 용어 상세 페이지에서 공유 기능을 제공하는 컴포넌트
 * - URL 복사, 소셜 미디어 공유 등의 기능을 포함
 */
export default function TermShareButton({ termKo, termEn, className }: Props) {
    const [copied, setCopied] = useState(false);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `${termKo}${termEn ? ` (${termEn})` : ''} - Mindlex 용어사전`;

    // URL 복사 기능
    // 클립보드에 현재 URL을 복사하는 기능
    // 실패 시 텍스트 선택 방식으로 폴백
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
            // 폴백: 텍스트 선택 방식
            const textArea = document.createElement('textarea');
            textArea.value = currentUrl;

            document.body.appendChild(textArea);
            textArea.select();

            // 클립보드에 복사
            // 이 방법은 일부 브라우저에서 작동하지 않을 수 있음
            // 따라서 navigator.clipboard.writeText를 먼저 시도하고, 실패 시 이 방법을 사용
            document.execCommand('copy');
            document.body.removeChild(textArea);

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // 소셜 미디어 공유 기능
    // X, Facebook, LinkedIn 등으로 공유할 수 있는 기능
    const shareToSocial = (platform: 'x' | 'facebook' | 'linkedin') => {
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedText = encodeURIComponent(shareText);

        let shareUrl = '';

        switch (platform) {
            case 'x':
                shareUrl = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
        setShareMenuOpen(false);
    };

    // 네이티브 공유 기능 (모바일에서만 동작)
    // 사용자가 네이티브 공유 기능을 지원하는 경우, 해당 기능을 사용하여 공유
    const handleNativeShare = async () => {
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            try {
                await navigator.share({
                    title: shareText,
                    text: shareText,
                    url: currentUrl,
                });
                setShareMenuOpen(false);
            } catch (err) {
                toast.error('내장된 공유 모드 실패. 클립보드에 복사합니다.');
                console.error('네이티브 공유 실패:', err);
            }
        } else {
            // 네이티브 공유가 지원되지 않으면 클립보드로 복사
            copyToClipboard();
        }
    };

    return (
        <div className="relative">
            <Button
                variant="outline"
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className={`w-full flex items-center gap-2 px-4 py-2 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className}`}
            >
                <Share className="w-5 h-5" />
                <span className="text-sm">공유하기</span>
            </Button>

            {shareMenuOpen && (
                <>
                    {/* 오버레이 */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShareMenuOpen(false)}
                    />

                    {/* 공유 메뉴 */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 p-4 space-y-3">
                        <div className="text-sm font-medium text-foreground mb-3">공유하기</div>

                        {/* URL 복사 */}
                        <button
                            onClick={copyToClipboard}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                            {copied ? (
                                <HiCheck className="w-5 h-5 text-green-500" />
                            ) : (
                                <HiClipboard className="w-5 h-5 text-muted-foreground" />
                            )}
                            <div>
                                <div className="text-sm font-medium text-foreground">
                                    {copied ? '복사됨!' : 'URL 복사'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    링크를 클립보드에 복사
                                </div>
                            </div>
                        </button>                        {/* 네이티브 공유 (모바일) */}
                        {typeof navigator !== 'undefined' && 'share' in navigator && (
                            <button
                                onClick={handleNativeShare}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                            >
                                <HiShare className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <div className="text-sm font-medium text-foreground">앱으로 공유</div>
                                    <div className="text-xs text-muted-foreground">설치된 앱으로 공유</div>
                                </div>
                            </button>
                        )}

                        <div className="border-t border-border my-2" />

                        {/* 소셜 미디어 공유 */}                        <div className="space-y-2">
                            <button
                                onClick={() => shareToSocial('x')}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left text-sm"
                            >
                                <div className="w-5 h-5 bg-black dark:bg-white rounded flex items-center justify-center text-white dark:text-black text-xs font-bold">
                                    𝕏
                                </div>
                                X(Twitter)로 공유
                            </button>

                            <button
                                onClick={() => shareToSocial('facebook')}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left text-sm"
                            >
                                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                    f
                                </div>
                                Facebook으로 공유
                            </button>

                            <button
                                onClick={() => shareToSocial('linkedin')}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left text-sm"
                            >
                                <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                                    in
                                </div>
                                LinkedIn으로 공유
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
