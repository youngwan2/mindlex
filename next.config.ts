import mdx from '@next/mdx';
// import mdxMermaid from 'mdx-mermaid'; // 플러그인을 직접 loader options로 전달하면 직렬화 에러가 발생할 수 있어 제거
import type { NextConfig } from 'next';

const withMDX = mdx({
  extension: /\.(mdx?)$/,
  options: {
    // loader에 전달되는 옵션은 plain JS 객체만 허용됩니다.
    // remark/rehype 플러그인(함수)을 직접 넣지 말고, 필요 시 페이지 레벨이나 빌드 스크립트에서 적용하세요.
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/**
 * TypeORM 등 서버 전용 패키지의 빌드 경고/에러 방지용 fallback 설정
 */
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    return config;
  },
};

export default withMDX(nextConfig);
