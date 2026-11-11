import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 墨点 inkdot · 官网
// 构建产物为纯静态站点，直接上传 dist/ 即可部署。
// site 用于生成 canonical 与 sitemap，请与线上域名保持一致。
export default defineConfig({
  site: 'https://inkdot.cn',
  // 保留 /apps/pdf-toolbox/ 这类"目录式"URL，与既有链接结构一致
  build: { format: 'directory' },
  integrations: [sitemap()],
});
