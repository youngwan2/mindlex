import { describe, test, expect } from 'vitest';
import { normalizeType, computeAppliedTypes, normalizeRequestedTypes, mapType } from '../src/lib/quizTypes';

describe('quizzes route helpers', () => {
    test('normalizeType maps aliases', () => {
        expect(normalizeType('mc')).toBe('multiple_choice');
        expect(normalizeType('multiple-choice')).toBe('multiple_choice');
        expect(normalizeType('short')).toBe('short_answer');
        expect(normalizeType('fill-blank')).toBe('fill_blank');
    });

    test('computeAppliedTypes returns intersection or available when none requested', () => {
        const available = ['mc', 'ox', 'fill_blank'];
        expect(computeAppliedTypes(['mc', 'short'], available)).toEqual(['mc']);
        expect(computeAppliedTypes([], available)).toEqual(available);
        expect(computeAppliedTypes([], [])).toEqual([]);
    });
});

describe('stats route helpers', () => {
    test('normalizeRequestedTypes -> search keys', () => {
        expect(normalizeRequestedTypes(['mc', 'multiple_choice'])).toEqual(['multiple', 'multiple']);
        expect(normalizeRequestedTypes(['fill-blank', 'fill'])).toEqual(['fill', 'fill']);
    });

    test('mapType maps DB strings to canonical', () => {
        expect(mapType('multiple_choice')).toBe('mc');
        expect(mapType('multiple-choice')).toBe('mc');
        expect(mapType('fillblank')).toBe('fill_blank');
        expect(mapType('short_answer')).toBe('short');
    });
});
