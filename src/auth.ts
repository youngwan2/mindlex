import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Naver from "next-auth/providers/naver"
import { TypeORMAdapter } from "@auth/typeorm-adapter"
import * as entities from '@/entities/account/accounts'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Naver],
    adapter: TypeORMAdapter(process.env.AUTH_TYPEORM_CONNECTION || '', { entities }),
})