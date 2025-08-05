import mdx from '@next/mdx';
import mdxMermaid from 'mdx-mermaid';
import type { NextConfig } from 'next';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [mdxMermaid, { output: 'svg' }]
    ],
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
