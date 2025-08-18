import { API } from "@/shared/constants/api"
import { globalGetFetcher } from "@/shared/global-fetcher"
import CategoryList from './CategoryList';

export default async function CategorySection() {

    const categoryInfo = await globalGetFetcher(API.CATEGORIES());

    return (
        <section className="dark:bg-gray-900">
            <div className="min-h-[306px] max-w-[1400px] w-full px-4 py-16 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl mb-4 font-semibold text-gray-900 dark:text-gray-100">카테고리</h2>
                    <p className="text-gray-600 dark:text-gray-300">다양한 분야별로 정리된 용어를 확인해보세요</p>
                </div>
                <CategoryList categories={categoryInfo?.categories || []} />
            </div>

        </section>
    )
}