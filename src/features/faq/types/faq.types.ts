import { IconType } from 'react-icons';

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
    tags?: string[];
    isPopular?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FAQCategory {
    name: string;
    label: string;
    icon: IconType;
    count: number;
}

export interface FAQSectionProps {
    faqs: FAQ[];
    categories: FAQCategory[];
}

export interface FAQItemProps {
    faq: FAQ;
    isOpen?: boolean;
    onToggle?: () => void;
}

export interface FAQListProps {
    faqs: FAQ[];
    searchTerm?: string;
    selectedCategory?: string;
}
