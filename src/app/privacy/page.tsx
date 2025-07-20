import { ShieldCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                        <ShieldCheck className="w-7 h-7" />
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">개인정보처리방침</h1>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">1. 총칙</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">마인드렉스(이하 "회사")는 이용자의 개인정보를 중요시하며, 관련 법령을 준수하고 있습니다. 본 개인정보처리방침은 회사가 제공하는 서비스 이용 시 이용자의 개인정보가 어떻게 수집, 이용, 보호되는지 안내합니다.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">2. 수집하는 개인정보 항목</h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>필수항목: 이메일, 이름, 비밀번호</li>
                            <li>선택항목: 프로필 사진, 연락처 등</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">3. 개인정보의 수집 및 이용목적</h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                            <li>서비스 제공 및 회원관리</li>
                            <li>문의 및 민원처리</li>
                            <li>신규 서비스 개발 및 마케팅</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">4. 개인정보의 보유 및 이용기간</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">이용자의 개인정보는 수집 및 이용 목적이 달성된 후에는 지체 없이 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우에는 해당 기간 동안 보관합니다.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">5. 개인정보의 제3자 제공</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 법령에 의거하거나 수사기관의 요청이 있는 경우에는 예외로 합니다.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">6. 이용자의 권리와 행사방법</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수 있으며, 개인정보 처리에 대한 동의 철회를 요청할 수 있습니다.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">7. 개인정보 보호책임자 안내</h2>
                        <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                            <span className="text-gray-700 dark:text-gray-300">책임자: <b>홍길동</b> | 이메일: <a href="mailto:privacy@mindlex.com" className="underline hover:text-blue-600 dark:hover:text-blue-300">privacy@mindlex.com</a></span>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">8. 기타</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">본 방침은 관련 법령 및 회사 정책에 따라 변경될 수 있으며, 변경 시 서비스 내 공지합니다.</p>
                    </section>
                </div>
            </div>
        </section>
    );
}
