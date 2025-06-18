# Next.js 배포 방법 및 플랫폼 선택 가이드

이 문서는 Mindlex 프로젝트(Next.js 기반)를 실제 서비스로 배포할 때 고려할 수 있는 주요 플랫폼과 배포 방법, 장단점, 실무 팁을 정리합니다.

---

## 1. Vercel (공식 추천)
- **장점**
  - Next.js 개발사(▲Vercel)에서 직접 운영, 최적화
  - SSG/SSR/ISR, Edge Functions 등 Next.js 최신 기능 완벽 지원
  - GitHub 연동 자동 배포, 미리보기(Preview) 환경 제공
  - 무료 플랜으로도 소규모 서비스 충분
- **단점**
  - DB, 백엔드 서버는 별도 관리 필요(PlanetScale, Supabase, Render 등과 연동)
- **실무 팁**
  - `vercel.json`으로 커스텀 설정 가능
  - 환경변수는 Vercel 대시보드에서 관리

---

## 2. Netlify
- **장점**
  - JAMstack 친화적, SSG/ISR 지원
  - GitHub 연동 자동 배포, 미리보기 환경
- **단점**
  - SSR/Edge 기능은 Vercel보다 제한적

---

## 3. AWS (Amplify, S3+CloudFront, ECS 등)
- **장점**
  - 대규모 트래픽, 엔터프라이즈 환경에 적합
  - 커스텀 인프라, 보안, 확장성 우수
- **단점**
  - 설정/운영 복잡, 비용 예측 어려움
  - SSR/ISR은 Amplify Hosting, Lambda@Edge 등 별도 설정 필요

---

## 4. Google Cloud (Cloud Run, App Engine 등)
- **장점**
  - 컨테이너 기반 배포(Cloud Run), 자동 확장
  - Next.js SSR/Edge 지원
- **단점**
  - 인프라/네트워크 설정 필요

---

## 5. 기타 (Render, Railway, DigitalOcean 등)
- **Render**: SSR/SSG 모두 지원, DB 연동 쉬움, 무료 플랜
- **Railway**: 빠른 배포, DB/백엔드 통합 관리
- **DigitalOcean App Platform**: 간단한 배포, 저렴한 비용

---

## 6. 배포 방법 요약

1. **Vercel**
   - [Vercel 가입 및 프로젝트 Import](https://vercel.com/import)
   - GitHub 연동 → 자동 빌드/배포
   - 환경변수, 커스텀 도메인 설정
2. **Netlify**
   - Netlify 가입 → GitHub 연동
   - 빌드 명령어: `next build`, Publish 디렉토리: `.next`
3. **AWS/Cloud Run 등**
   - Dockerfile 작성 → 컨테이너 빌드/배포
   - SSR/Edge 기능은 별도 설정 필요

---

## 7. 실무 추천
- **개인/스타트업/중소 프로젝트**: Vercel이 가장 쉽고 강력 (무료 플랜 충분)
- **엔터프라이즈/커스텀 인프라**: AWS, GCP, Render 등 고려
- **DB, 백엔드 연동**: Supabase, PlanetScale, Render 등과 조합 추천

---

> Mindlex는 Vercel 배포를 기본으로 가이드하며, 필요시 AWS/Cloud Run 등으로 확장 가능합니다.
