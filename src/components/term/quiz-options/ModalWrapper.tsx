'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    children: React.ReactNode;
    titleId?: string;
    onClose: () => void;
    dialogRef?: React.RefObject<HTMLDivElement | null>;
    closing?: boolean;
};

export default function ModalWrapper({ children, titleId = 'dialog-title', onClose, dialogRef, closing }: Props) {
    const [mounted, setMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const localRef = useRef<HTMLDivElement | null>(null);
    const ref = (dialogRef as React.RefObject<HTMLDivElement | null>) || localRef;

    useEffect(() => {
        setMounted(true);
        requestAnimationFrame(() => setIsAnimating(true));
    }, []);

    useEffect(() => {
        if (closing) {
            setIsAnimating(false);
            const id = setTimeout(() => onClose(), 200);
            return () => clearTimeout(id);
        }
    }, [closing, onClose]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // focus trap
    useEffect(() => {
        const el = ref.current as HTMLDivElement | null;
        if (!el) return;
        const focusable = el.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        function handleTab(e: KeyboardEvent) {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        }

        document.addEventListener('keydown', handleTab);
        setTimeout(() => first?.focus?.(), 100);
        return () => document.removeEventListener('keydown', handleTab);
    }, [ref]);

    if (!mounted) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* overlay */}
            <div
                className={`absolute inset-0 transition-opacity bg-[rgba(0,0,0,0.5)] duration-200 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => {
                    setIsAnimating(false);
                    setTimeout(onClose, 180);
                }}
            />

            <div
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`relative z-10 w-full max-w-4xl max-h-[95vh] overflow-auto bg-popover rounded-lg shadow-lg transform transition-all duration-200 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
