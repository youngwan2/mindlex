import mdx from '@next/mdx';
import mdxMermaid from 'mdx-mermaid';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [mdxMermaid, { output: 'svg' }]
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
};

export default withMDX(nextConfig);
