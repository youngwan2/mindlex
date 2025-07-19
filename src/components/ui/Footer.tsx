import { Brain, Mail } from "lucide-react";
import { Button } from "./button";
import { SiGithub } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Brain className="h-6 w-6 text-blue-400" />
                            <span className="text-xl font-bold">마인드렉스</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">정신건강 용어를 쉽고 친절하게 설명하는 교육 플랫폼</p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                                <SiGithub className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">서비스</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    용어사전
                                </Link>
                            </li>
                            <li>
                                <Link href="/quiz" className="hover:text-white transition-colors">
                                    퀴즈
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-white transition-colors">
                                    카테고리
                                </Link>
                            </li>
                            <li>
                                <Link href="/ranking" className="hover:text-white transition-colors">
                                    랭킹
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">지원</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/help" className="hover:text-white transition-colors">
                                    도움말
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                    자주 묻는 질문
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    문의하기
                                </Link>
                            </li>
                            <li>
                                <Link href="/feedback" className="hover:text-white transition-colors">
                                    피드백
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">법적 고지</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    개인정보처리방침
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    이용약관
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} 마인드렉스. All rights reserved. |<span className="ml-2">정신건강 전문가 검증 완료</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}