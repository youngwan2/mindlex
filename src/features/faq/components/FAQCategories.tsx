"use client"

import { Button } from "@/components/ui/button";
import { FAQCategory } from "../types/faq.types";
import { IconType } from 'react-icons';

interface FAQCategoriesProps {
    categories: FAQCategory[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function FAQCategories({ categories, selectedCategory, onCategoryChange }: FAQCategoriesProps) {
    return (
        <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => {
                const Icon = category.icon as IconType;
                return (
                    <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        onClick={() => onCategoryChange(category.name)}
                        className={`px-4 py-2 rounded-full transition-all ${selectedCategory === category.name
                                ? 'bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        <Icon className="mr-2 w-5 h-5" />
                        {category.label}
                        <span className="ml-2 text-sm opacity-70">({category.count})</span>
                    </Button>
                );
            })}
        </div>
    );
}
