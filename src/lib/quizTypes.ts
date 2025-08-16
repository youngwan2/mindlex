// Helper utilities for quiz type normalization and mapping
export function normalizeType(raw: string) {
    const s = raw.trim().toLowerCase().replace(/\s+/g, '_').replace(/-+/g, '_');
    const aliasMap: Record<string, string> = {
        'mc': 'multiple_choice',
        'multiple': 'multiple_choice',
        'multiple-choice': 'multiple_choice',
        'multiple_choice': 'multiple_choice',
        'short': 'short_answer',
        'short-answer': 'short_answer',
        'short_answer': 'short_answer',
        'fillblank': 'fill_blank',
        'fill-blank': 'fill_blank',
        'fill_blank': 'fill_blank'
    };
    return aliasMap[s] || s;
}

export function computeAppliedTypes(requested: string[], available: string[]) {
    if (!requested || requested.length === 0) return available.slice();
    return requested.filter(t => available.includes(t));
}

export function normalizeRequestedTypes(list: string[]) {
    return list.map(raw => {
        const t = String(raw).trim().toLowerCase();
        if (t === 'mc' || t === 'multiple' || t === 'multiple_choice') return 'multiple';
        if (t === 'ox') return 'ox';
        if (t === 'short' || t === 'short_answer') return 'short';
        if (t === 'fill_blank' || t === 'fill-blank' || t === 'fillblank' || t === 'fill') return 'fill';
        return t;
    });
}

export function mapType(t?: string) {
    if (!t) return undefined;
    const s = String(t).toLowerCase();
    if (s.includes('multiple') || s === 'multiple_choice') return 'mc';
    if (s === 'ox') return 'ox';
    if (s.includes('fill') || s === 'fill_blank' || s === 'fill-blank' || s === 'fillblank') return 'fill_blank';
    if (s.includes('short') || s === 'short_answer') return 'short';
    return undefined;
}
