# 墨点 inkdot · 官网源码

> 小工具，一点就够用。

这是墨点官网的**纯静态源码**：没有构建步骤、没有依赖安装、没有 Node 运行时。
改完文件传上服务器（或本地双击 `index.html`）就能看到效果。

## 为什么是纯静态

旧版官网用 Node 打包，源码丢失后无法再编译。现在这套：

- **零构建**：源码即成品。不存在 `npm run build`，也就不会因为依赖老化、Node 升级而无法重建。
- **数据驱动**：工具清单、下载链接、常见问题集中在一个文件。新增工具不用碰 HTML。
- **版本可回溯**：强烈建议把本目录放进 Git（`git init` → 提交 → 远程推送），改坏了一键回滚。

## 目录结构

```
inkdot/
├── index.html                 首页
├── 404.html                   404 页
├── robots.txt / sitemap.xml   SEO 索引
├── favicon.svg                站点图标
├── apps/
│   └── pdf-toolbox/
│       └── index.html         PDF 工具箱详情页（后续工具照此结构复制）
├── legal/
│   ├── privacy/index.html     隐私政策
│   └── disclaimer/index.html  免责声明
└── assets/
    ├── css/style.css          ★ 全部视觉样式（换肤改这里）
    ├── js/
    │   ├── data.js            ★ 工具数据（新增/改工具改这里）
    │   └── app.js             渲染与交互逻辑（一般不用动）
    ├── img/                    logo、图标、封面
    └── fonts/                  霞鹜文楷（SIL OFL 授权，可商用）
```

## 常用操作

### 1. 新增一款工具（例如「财务工具箱」）

1. 复制 `apps/pdf-toolbox/` 整个文件夹，改名为 `apps/finance-toolbox/`。
2. 打开里面的 `index.html`，把文案、表格、下载区静态兜底改成新工具的内容；把 `<body data-app-id="pdf-toolbox">` 改成新的 id（如 `finance-toolbox`），并同步修改面包屑、标题、图标/封面路径（`../../assets/...`）。
3. 编辑 `assets/js/data.js`，在 `window.INKDOT.apps` 数组里新增一个对象（照着 PDF 工具箱的格式填），`status` 设为 `"live"`。
4. 首页的「精选」和「全部工具」会自动出现这款工具。**记得把新工具图标/封面放进 `assets/img/`。**
5. 在 `sitemap.xml` 里加一行该工具详情页地址。

> 只想先占个位、暂不上架？在 `data.js` 里把工具的 `status` 设为 `"soon"`，或直接复制「更多工具，正在路上」的占位卡，不要写真实下载链接。

### 2. 修改下载链接

只改 `assets/js/data.js` 里对应工具的 `downloads` 数组即可。

> 注意：详情页的下载区由 JS 渲染，但 HTML 里也保留了一份**静态兜底链接**（防止 JS 加载失败时无链接可点）。改链接时**两处一起改**：`data.js` + `apps/pdf-toolbox/index.html` 里的 `<div class="download-grid">` 静态部分。

### 3. 换配色 / 换风格

打开 `assets/css/style.css`，顶部 `:root` 和 `[data-theme="dark"]` 两组变量控制全部颜色。改变量即可全局换肤。品牌字体在 `--font-brand`（默认霞鹜文楷）。

### 4. 改品牌信息（备案号、邮箱、作者站）

在 `assets/js/data.js` 的 `window.INKDOT.site` 里改一次，页脚自动同步。

## 本地预览

任选一种：

```bash
# 方式 A：Python（Windows 一般自带 python）
python -m http.server 8080
# 浏览器打开 http://localhost:8080

# 方式 B：Node（如果装了）
npx serve .
```

直接双击 `index.html` 也能看，但本地 `file://` 协议下部分相对路径和 JS 行为可能受限，**推荐用上面的本地服务器预览**。

## 部署到你的服务器

1. 把整个目录（**不含 `old/`**）上传到网站根目录（Nginx / 宝塔的站点根目录）。
2. 确保服务器把 `/apps/pdf-toolbox/` 这类无扩展名路径正确指向目录里的 `index.html`（Nginx 默认支持 `index index.html;`）。
3. HTTPS 用 certbot 或宝塔申请 Let's Encrypt 免费证书。
4. `robots.txt` 和 `sitemap.xml` 已在根目录，直接生效。

### 自动部署（可选，推荐）

把本目录提交到 GitHub 仓库后，可用 GitHub Actions 在 `push` 时自动构建并同步到服务器（服务器 SSH 密钥存进仓库 Secrets）。这样：**本地改 → git push → 自动上线 + 自动留版本历史**，彻底告别「源码丢失」。

## 关于 `old/` 文件夹

是你从服务器下载的旧版静态资源，**仅作内容与素材参考**，不要部署、也不要提交到 Git（体积 54 MB）。确认新站无误后可删除。新站已复用的资产（logo、图标、封面）都归位到了 `assets/`。

> **关于旧字体的坑**：`old/fonts/LXGWWenKai-*.woff2` 名为字体、实为 HTML 网页——当年从服务器下载时 URL 失效返回了网页却存成了字体文件，所以旧站的文楷字体**一直是加载失败的**。新站已弃用这两个坏文件，改用官方分版字体（见下）。同理，`old/_astro/` 下 471 个分片共 16 MB 是旧构建的字体子集，也不要拷贝。

## 字体：霞鹜文楷（官方分片）

- 字体文件在 `assets/fonts/lxgw/`（194 个分片 + `font.css` + `OFL.txt`，约 9.5 MB）。
- 采用官方 `@fontsource` 风格的 **unicode-range 分片**：浏览器只下载页面实际用到的字符，中文首页通常仅几十 KB，加载快。
- 样式由 `assets/fonts/lxgw/font.css` 定义，**每个 HTML 都在主样式表前引入它**。新增页面时记得复制这一行 `<link>`。
- 万一字体加载失败，`--font-brand` 会回退到系统楷体 / 宋体，不影响阅读。
- 授权：霞鹜文楷为 **SIL OFL 1.1**，可商用，许可全文在 `assets/fonts/lxgw/OFL.txt`。

## 视觉说明

- 主题为「纸感墨色 · 印章红」：宣纸暖底 + 浓墨文字 + 朱砂印章点缀，霞鹜文楷标题，与旧版科技蓝风格完全不同。
- 支持**浅色 / 深色**双主题，自动跟随系统并可手动切换（记忆在本地）。
- 墨滴 logo 为深墨色透明图，深色模式下用 CSS 反色保证可见；**彩色应用图标不反色**（否则会变色）。
- 换色只需改 `assets/css/style.css` 顶部的 `:root` 与 `[data-theme="dark"]` 两组变量。

## 合规说明

- 全站不使用「永久免费 / 完全免费」等绝对化表述，统一为「依据 MIT 许可开放、当前版本自由使用」，与软件仓库口径一致，规避《广告法》虚假宣传风险。
- 脱敏功能已明确提示「底层文字仍可能被提取，不构成真正的数据擦除」。
- 备案号 `京ICP备17010528号-6`、作者站、邮箱在 `data.js` 的 `site` 对象集中维护，页脚自动同步。
