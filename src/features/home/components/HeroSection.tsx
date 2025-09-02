"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book, Play, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
    return (
        <section className="w-full bg-gray-50 dark:bg-gray-900">
            <div className="max-w-[896px] mx-auto py-24 px-4">
                <h2 className="text-6xl font-bold leading-tight text-center mb-6 text-gray-900 dark:text-gray-100">정신건강 용어를 <br /> <span className="text-brand dark:text-brand-dark">쉽고 친절하게</span></h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto mb-8 text-center max-w-2xl">
                    복잡한 정신건강 용어들을 이해하기 쉽게 설명하고, 재미있는 퀴즈로 학습할 수 있는 플랫폼입니다.
                </p>
                <form action="" className="relative max-w-[672px] mx-auto">
                    <Label htmlFor="search" className="absolute top-2.5 left-1.5 text-[#c1c5cd] dark:text-gray-400"><Search /></Label>
                    <Input id="search" placeholder="궁금한 정신건강 용어를 입력해주세요.." type="search" className="pl-12 py-5 placeholder:text-lg rounded-full dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:border-gray-700" />
                </form>
                <div className="flex gap-6 mx-auto md:justify-center mt-8 md:flex-row flex-col items-stretch w-full">
                    <Button onClick={() => router.push("/quiz")} variant="outline" size="sm" className="rounded-3xl px-12 md:py-6 py-5 gap-4 md:max-w-[200px] max-w-auto w-full bg-brand dark:bg-brand-dark text-white hover:bg-brand-hover dark:hover:bg-brand-hover hover:text-white cursor-pointer">
                        <Play /> 퀴즈 시작하기
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-3xl  px-12 md:py-6 py-5 md:max-w-[200px] max-w-auto w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                        onClick={() => router.push("/terms")}
                    >
                        <Book /> 용어사전 둘러보기
                    </Button>
                </div>
            </div>
        </section>
    )
}