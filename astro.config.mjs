import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { apps } from './src/data/apps';

// 墨点 inkdot · 官网
// 构建产物为纯静态站点，直接上传 dist/ 即可部署。
// site 用于生成 canonical 与 sitemap，请与线上域名保持一致。

// 每款工具的详情页 / 教程页 lastmod 用它自己的「更新于」，
// 没有对应工具的页面（首页、法律页）不写 lastmod，交给搜索引擎自行判断。
const lastmodByPath = new Map();
for (const a of apps) {
  const d = new Date(`${a.updated}T00:00:00+08:00`).toISOString();
  lastmodByPath.set(a.url, d);
  lastmodByPath.set(a.guideUrl, d);
}

export default defineConfig({
  site: 'https://inkdot.cn',
  // 保留 /apps/pdf-toolbox/ 这类"目录式"URL，与既有链接结构一致
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('404'),
      serialize(item) {
        const lastmod = lastmodByPath.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
});
