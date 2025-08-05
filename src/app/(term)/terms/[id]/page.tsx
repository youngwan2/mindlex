import TermDetailHeader from "@/features/term/components/TermDetailHeader";
import TermDetailMain from "@/features/term/components/TermDetailMain";
import { API } from "@/shared/constants/api";
import { globalGetFetcher } from "@/shared/global-fetcher";


async function fetchTermDetail(id: string) {
    return await globalGetFetcher(API.TERM_DETAIL(id));
}


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const termId = (await params).id

    const term = await fetchTermDetail(termId);

    return {
        title: term?.termKo + ' - ' + '용어사전',
        description: term?.description || ''

    }


}

export default async function TermDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const termId = (await params).id

    const term = await fetchTermDetail(termId)


    return (
        <div>
            <TermDetailHeader term={term} />
            <TermDetailMain term={term} />
        </div>
    )
}