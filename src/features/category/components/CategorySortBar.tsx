"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";


export default function CategorySortBar() {
    return (
        <div className="flex gap-5 md:flex-row flex-col md:w-auto w-full ">            <div className="relative">
            <Label className="absolute left-2 top-1/2 -translate-y-1/2"><Search className="w-5 h-5 text-gray-400 dark:text-gray-500" /></Label>
            <Input className="pl-10" placeholder="카테고리명, 설명으로 검색.." />
        </div>

            <div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="정렬 기준" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="alphabetical">가나다순</SelectItem>
                        <SelectItem value="termCount">용어수순</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}