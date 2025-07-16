import { API } from "@/shared/constants/api";
import { globalGetFetcher } from "@/shared/global-fetcher"
import TermList from "./TermList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function TermSection() {

    const searchCondition = {
        page: 1,
        size: 20,
        sort: 'id',
        order: 'ASC',
        search: '',
        startDate: '',
        endDate: ''
    };
    const { terms, total } = await globalGetFetcher(API.TERMS(searchCondition))

    return (
        <section className="bg-gray-50 dark:bg-[rgba(255,255,255,0.01)]">
            <div className="max-w-[1400px] mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-semibold">용어 미리보기</h2>
                    <Link href={"/terms"} className="flex gap-6 items-center hover:text-slate-600">전체보기({total}) <ArrowRight /></Link>
                </div>
                <TermList terms={terms} />
            </div>
        </section>
    )
}