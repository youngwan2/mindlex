"use client"

import { useState } from 'react';
import FAQHeader from '@/features/faq/components/FAQHeader';
import FAQMain from '@/features/faq/components/FAQMain';
import { faqMockData, faqCategories } from '@/mocks/data/faq.mock';

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <FAQHeader
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <FAQMain
                faqs={faqMockData}
                categories={faqCategories}
                searchTerm={searchTerm}
            />
        </div>
    );
}
