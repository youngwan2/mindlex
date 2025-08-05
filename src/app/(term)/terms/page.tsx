import { Suspense } from "react";
import TermPageClient from "./TermPageClient";

export default function TermPage() {
    return (
        <Suspense fallback={null}>
            <TermPageClient />
        </Suspense>
    );
}