import { FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                        <FileText className="w-7 h-7" />
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">이용약관</h1>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">제1조 (목적)</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">이 약관은 마인드렉스(이하 &quot;회사&quot;)가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">제2조 (정의)</h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>&quot;서비스&quot;란 회사가 제공하는 모든 웹사이트, 모바일 웹, 앱 등 일체의 온라인 서비스를 의미합니다.</li>
                            <li>&quot;이용자&quot;란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">제3조 (약관의 효력 및 변경)</h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</li>
                            <li>회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지 또는 이메일 등으로 공지함으로써 효력이 발생합니다.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">제4조 (서비스의 제공 및 변경)</h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>회사는 이용자에게 아래와 같은 서비스를 제공합니다: 정신건강 용어사전, 퀴즈, 정보 제공 등</li>
                            <li>회사는 서비스의 내용, 운영상 또는 기술상 필요에 따라 제공하는 서비스의 전부 또는 일부를 변경할 수 있습니다.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">제5조 (이용자의 의무)</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">이용자는 관련 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">제6조 (면책조항)</h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>회사는 천재지변, 불가항력적 사유, 이용자의 귀책사유 등으로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.</li>
                            <li>회사는 이용자가 서비스 내에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 책임을 지지 않습니다.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">제7조 (기타)</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">기타 본 약관에 명시되지 않은 사항은 관련 법령 및 회사의 정책에 따릅니다.</p>
                    </section>
                </div>
            </div>
        </section>
    );
}
