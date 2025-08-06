'use client';

import { useState, useEffect } from 'react';


/**
 * 
 * @param value - 디바운스할 값
 * @param delay - 디바운스 지연 시간 (밀리초 단위)
 * 
 * @description 주어진 값에 대해 디바운스 기능을 제공하는 훅입니다. 
 * 지정된 지연 시간 동안 값이 변경되지 않으면 최종 값을 반환합니다.
 * @returns 
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * useDebounce 훅이 디바운스 처리가 가능한 이유
 *
 * - useEffect가 value/delay가 바뀔 때마다 실행되어 타이머를 새로 설정합니다.
 * - setTimeout으로 일정 시간(delay) 후에만 debouncedValue를 변경합니다.
 * - 만약 delay 내에 value가 또 바뀌면, clearTimeout으로 이전 타이머를 취소하고 새 타이머를 다시 설정합니다.
 * - 이 구조 덕분에 입력이 연속적으로 바뀌어도 마지막 입력 이후 일정 시간 동안 변화가 없을 때만 값이 실제로 반영되어 디바운스 효과가 발생합니다.
 * - 즉, useEffect가 값 변화 감지와 타이머 관리(취소/재설정)를 담당하기 때문에 디바운스가 가능합니다.
 */
