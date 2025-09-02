import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface TermHeaderProps {
    onSubmit: (formData: FormData) => void;
    isLoading: boolean;
    initialSearch?: string;
}

export default function TermHeader({ onSubmit, isLoading, initialSearch }: TermHeaderProps) {
    const [value, setValue] = useState(initialSearch || '');

    useEffect(() => {
        setValue(initialSearch || '');
    }, [initialSearch]);

    return (
        <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="w-full min-h-[80px] max-w-[1400px] mx-auto px-4 py-6">
                <div className="flex md:items-center items-start justify-between gap-4 md:flex-row flex-col">
                    <div>
                        <h2 className="font-semibold text-3xl mb-2 text-gray-900 dark:text-gray-100">용어사전</h2>
                        <p className="text-gray-500 dark:text-gray-400">정신건강 용어를 쉽고 자세하게 알아보세요.</p>
                    </div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            const fd = new FormData();
                            fd.set('search', value);
                            onSubmit(fd);
                        }}
                        className="flex items-center gap-2 w-full md:w-auto relative"
                    >
                        <Label className="absolute left-2 text-gray-400 "><Search className="w-5 h-5" /></Label>
                        <Input value={value} onChange={(e) => setValue(e.target.value)} disabled={isLoading ? true : false} type="search" name="search" className="pl-10" placeholder="용어명, 영문명, 설명으로 검색..." />
                    </form>
                </div>
            </div>
        </div>
    )
}