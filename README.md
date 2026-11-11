# 墨点 inkdot · 官网

离线桌面小工具「墨点 inkdot」的官方网站。基于 **Astro 7 + Vite 8** 构建，输出纯静态站点。

> 视觉：纸感墨色 · 印章红　|　字体：霞鹜文楷（按需分片加载）

---

## 快速开始

> 需要 Node.js ≥ 22.23.4（本项目使用系统安装的 Node 26）。

```bash
npm install        # 首次安装依赖
npm run dev        # 本地开发预览，默认 http://localhost:4321
npm run build      # 构建，产物在 dist/
npm run preview    # 本地预览构建产物
```

**部署**：把 `dist/` 整个目录上传到服务器 / 对象存储 / 静态托管即可，无需 Node 运行时。

---

## 目录结构

```
src/
├─ data/
│  ├─ site.ts          # 站点信息、页脚、承诺、打赏配置（改一处全站生效）
│  └─ apps.ts          # 所有工具的数据（详情、下载、FAQ、教程步骤唯一来源）
├─ layouts/
│  └─ BaseLayout.astro # 全站骨架：SEO、主题、页头、页脚、交互脚本
├─ components/
│  ├─ SiteHeader.astro # 页头导航　├─ SiteFooter.astro # 页脚
│  ├─ Donate.astro     # 打赏区块　├─ Crumbs.astro     # 面包屑
│  ├─ AppCard.astro    # 工具卡　　├─ FeaturedCard.astro
│  ├─ DownloadGrid.astro ├─ Faq.astro ├─ PromiseList.astro
│  ├─ GuideBody.astro  # 图文教程主体　└─ Icon.astro   # SVG 图标集
└─ pages/
   ├─ index.astro                      # 首页
   ├─ 404.astro
   ├─ legal/privacy.astro              # 隐私政策
   ├─ legal/disclaimer.astro           # 免责声明
   └─ apps/<工具id>/
      ├─ index.astro                   # 工具详情页
      └─ guide.astro                   # 图文教程页
public/assets/                          # 原样输出的静态资源（样式、字体、图片）
```

---

## 常见维护操作

### 改公共页头 / 页脚 / 备案 / 邮箱

- 导航结构：`src/components/SiteHeader.astro`
- 页脚、备案号、联系方式：`src/components/SiteFooter.astro`
- 站点名、口号、邮箱、ICP 备案、承诺列表：`src/data/site.ts`

改完任一处，**所有页面自动同步**，不用逐页改。这就是从纯静态迁到模板化的意义。

### 新增一款工具

1. 在 `src/data/apps.ts` 的 `apps` 数组里复制一个对象，填好字段（`status: "live"` 即上架）；
2. 在 `src/pages/apps/` 下建同名目录，放 `index.astro` 与 `guide.astro`（照抄现有工具页，改 `getApp('<新id>')`）；
3. 把图标 / 封面 / 教程截图放进 `public/assets/img/`；
4. 完成。首页卡片、导航、下载、教程会自动带上它。

### 替换打赏二维码

1. 把收款码图片命名为 `donate-qr.png`，放到 `public/assets/img/`；
2. 打开 `src/data/site.ts`，把 `donate.qrReady` 改为 `true`；
3. 所有详情页与教程页的底部打赏区块会立即显示真实二维码。文案与链接也在同一处可改。

### 更新某个工具的下载链接 / 版本 / FAQ / 教程

全部在 `src/data/apps.ts` 里改对应字段即可，无需碰页面文件。

---

## 文案与技术约定

- 许可口径统一为「依据 MIT 许可开放，当前版本自由使用」，不使用「永久免费 / 完全免费」等绝对化表述。
- 界面与文档不使用装饰性 emoji；SVG 图标集中在 `Icon.astro`。
- 官网只做内容展示，下载链接指向各工具的 GitHub Release 资产。

---

## 源码管理

本仓库纳入 git 版本管理（历史上曾因只留服务器产物导致源码丢失，故本次从起点即入库）。
每次改动后提交：`git add -A && git commit -m "..." && git push`。
