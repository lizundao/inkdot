/**
 * 墨点 inkdot · 工具数据（全站唯一数据源）
 * ------------------------------------------------------------------
 * 首页卡片、详情页、下载区、教程页全部读取本文件。
 * 新增一款工具：复制最后一个对象，改字段，status 设为 "live" 即自动上架。
 *
 * status: "live" 已上架（显示下载、可进详情页与教程页）
 *         "soon" 占位（仅首页显示预告，不给下载）
 */

export type KV = { k: string; v: string };
export type Download = { label: string; os: "Windows" | "macOS" | "网盘"; note: string; url: string; code?: string; external?: boolean };
export type Faq = { q: string; a: string };
export type GuideStep = { n: number; title: string; body: string; tip?: string; shot?: string; shotAlt?: string };

export type App = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  version: string;
  updated: string;
  icon: string;
  cover: string;
  tags: string[];
  featured: boolean;
  status: "live" | "soon";
  url: string;          // 详情页相对根路径
  guideUrl: string;     // 教程页相对根路径
  platforms: string[];
  repo: string;
  downloads: Download[];
  features: KV[];
  modules: KV[];
  requirements: KV[];
  faq: Faq[];
  // 图文教程
  guide: {
    screenshot: string;
    screenshotAlt: string;
    lead: string;
    steps: GuideStep[];
    namingTitle?: string;  // 可选：默认「输出命名」，无文件输出的工具可改写
    naming: string;
    notes: string[];
  };
};

const PDF_RELEASE = "https://github.com/lizundao/pdf-toolbox/releases/download/v1.0.0/";
const IMG_RELEASE = "https://github.com/lizundao/image-processor/releases/download/v1.0.0/";
const FIN_RELEASE = "https://github.com/lizundao/finance-toolbox/releases/download/v0.1.0/";
const BAT_RELEASE = "https://github.com/lizundao/batch-rename/releases/download/v0.1.0/";
const CM_RELEASE = "https://github.com/lizundao/clear-meta/releases/download/v0.1.0/";
const SEAL_RELEASE = "https://github.com/lizundao/seal-extractor/releases/download/v1.1.0/";
const TIXINGMAO_RELEASE = "https://github.com/lizundao/tixingmao/releases/download/v1.0.1/";
const RILI_RELEASE = "https://github.com/lizundao/rili/releases/download/v1.0.0/";

export const apps: App[] = [
  {
    id: "pdf-toolbox",
    name: "PDF 工具箱",
    tagline: "压缩 · 合并 · 转换 · 水印 · 脱敏",
    summary: "压缩、合并、转换、水印、脱敏，PDF 全能本地处理。",
    description:
      "离线桌面 PDF 多功能工具，集成压缩、页面编辑、格式转换、水印版式、安全隐私、脱敏涂黑、扫描增强与预览。文件本地处理，不上传云端。",
    version: "1.0.0",
    updated: "2026-06-11",
    icon: "/assets/img/pdf-toolbox-icon.png",
    cover: "/assets/img/pdf-toolbox-cover.png",
    tags: ["PDF", "压缩", "合并", "水印", "脱敏", "格式转换"],
    featured: true,
    status: "live",
    url: "/apps/pdf-toolbox/",
    guideUrl: "/apps/pdf-toolbox/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/pdf-toolbox",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 约 5 MB", url: PDF_RELEASE + "PDF-Toolbox-1.0.0-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 约 4 MB", url: PDF_RELEASE + "PDF-Toolbox-1.0.0-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · 约 5.2 MB", url: PDF_RELEASE + "PDF-Toolbox-1.0.0-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: PDF_RELEASE + "PDF-Toolbox-1.0.0-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1_BSgdShljYNtmQowzeCw8w?pwd=zky6", code: "zky6", external: true },
    ],
    features: [
      { k: "完全离线", v: "文件在本地处理，不上传云端（Office 转 PDF 会调用本机 Office）" },
      { k: "自由使用", v: "依据 MIT 许可开放，当前版本无需付费，无广告" },
      { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
      { k: "中文友好", v: "界面中文，水印支持系统字体（微软雅黑、宋体等）" },
      { k: "拖放操作", v: "各工具页支持将 PDF / 图片 / Office 文件拖入窗口" },
      { k: "智能输出", v: "自动建议输出路径：原文件名-功能名.pdf，与源文件同目录" },
    ],
    modules: [
      { k: "压缩", v: "结构流压缩，批量处理" },
      { k: "扫描增强", v: "内嵌图片 JPEG 重压缩、降分辨率、转灰度" },
      { k: "页面工具", v: "合并、拆分、提取、删除、旋转、重排、插入、裁剪、统一尺寸、去空白页" },
      { k: "格式转换", v: "图片↔PDF、PDF↔文本、Office→PDF、PDF 批量导出图片" },
      { k: "水印版式", v: "文字 / 图片水印、页眉页脚、页码" },
      { k: "安全隐私", v: "加密、解密、清除元数据" },
      { k: "脱敏涂黑", v: "预览框选敏感区域，输出涂黑 PDF" },
      { k: "预览信息", v: "内置预览、缩略图、元数据查看与编辑" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
      { k: "内存", v: "建议 4 GB 及以上" },
      { k: "磁盘空间", v: "约 50 MB" },
      { k: "Office 转 PDF", v: "需本机已安装 Microsoft Word / Excel / PowerPoint" },
      { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装）" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；尝试右键 → 以管理员身份运行；确认是 64 位 Windows。" },
      { q: "SmartScreen 提示「未知发布者」？", a: "软件尚未购买代码签名，属正常现象。点击「更多信息」→「仍要运行」即可。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项。" },
      { q: "处理失败，提示 PDF 损坏或无法打开？", a: "部分加密、扫描或结构异常的 PDF 可能不支持。可尝试先用浏览器或 Adobe Acrobat 打开并「另存为」再处理。" },
      { q: "输出文件在哪里？会覆盖原文件吗？", a: "默认与源文件同目录，文件名带功能后缀（如 报告-压缩.pdf），不会覆盖源文件，除非手动把输出路径设为与源文件相同。" },
      { q: "中文水印显示方块或乱码？", a: "在「水印版式 → 字体」选择微软雅黑、宋体等中文字体，不要留空。" },
      { q: "脱敏涂黑后还能复制出文字吗？", a: "涂黑层覆盖在内容上方，一般阅读看不到，但底层文字理论上仍可能被专业工具提取。高敏感场景建议配合「清除元数据」，或打印后再扫描。" },
      { q: "是否收费？有无联网上传？", a: "当前版本依据 MIT 许可自由使用。文件本地处理，无账号、无云上传（Office 转换调用本机 Office）。" },
    ],
    guide: {
      screenshot: "/assets/img/pdf-toolbox-guide.png",
      screenshotAlt: "PDF 工具箱主界面，左侧为功能导航，右侧为工具选择区",
      lead: "从下载到处理好第一份文件，通常只要几分钟。下面按界面实际布局，带你走一遍通用流程。",
      steps: [
        { n: 1, title: "安装与启动", body: "下载便携版 zip 并解压到任意目录，双击 pdf-compress.exe 即可启动；macOS 打开 dmg 把应用拖入「应用程序」。便携版不写注册表，删除文件夹即卸载。", tip: "路径尽量用英文或中文，避免特殊符号；不要解压到需要管理员权限的系统目录。" },
        { n: 2, title: "认识界面", body: "窗口左侧是功能导航（首页、压缩、扫描增强、页面工具、格式转换、水印版式、安全隐私、预览信息），右侧是当前功能的设置与文件列表。首页是全部工具的入口宫格。", tip: "左侧栏顶部可切换深色 / 浅色主题。", shot: "/assets/img/guide/pdf-nav.png", shotAlt: "左侧功能导航：首页、压缩、扫描增强、页面工具、格式转换等，顶部月亮图标可切换主题" },
        { n: 3, title: "进入功能并添加文件", body: "在左侧点选需要的功能，然后点「选择文件」或直接把 PDF 拖进窗口。支持一次添加多个文件批量处理。", shot: "/assets/img/guide/pdf-tools.png", shotAlt: "首页「选择工具」宫格：压缩、页面工具、扫描增强、格式转换、水印版式、预览信息、安全隐私，点击卡片即可进入" },
        { n: 4, title: "确认输出并设置参数", body: "输出路径通常已自动填好（与源文件同目录）；按需要调整参数，例如压缩强度、页码范围、水印文字与字体。" },
        { n: 5, title: "开始处理并取回文件", body: "点击「开始处理」，完成后会弹出提示，可「打开文件位置」或「复制路径」。输出文件不会覆盖原件。", tip: "中文水印记得选微软雅黑、宋体等中文字体，避免显示成方块。" },
      ],
      naming: "输出文件默认与源文件同目录，命名为「原文件名-功能名.pdf」。例如 报告.pdf 经压缩后输出为 报告-压缩.pdf。",
      notes: [
        "关于脱敏：涂黑层覆盖在内容上方，一般阅读看不到，但底层文字理论上仍可能被专业工具提取。高敏感场景建议配合「清除元数据」，或打印后再扫描。",
        "Office 转 PDF 时会短暂启动本机的 Word / Excel / PowerPoint，属正常现象。",
      ],
    },
  },

  {
    id: "image-processor",
    name: "图片处理器",
    tagline: "压缩 · 水印 · 裁剪 · 拼合 · 美化",
    summary: "批量压缩、水印、裁剪、合并、GIF，图片全能本地处理。",
    description:
      "离线桌面图片批量处理工具，集成压缩、格式转换、裁剪、水印、边框圆角、合并拼图、GIF 合成与一键美化。所有图片在电脑本地处理，不上传云端。",
    version: "1.0.0",
    updated: "2026-11-11",
    icon: "/assets/img/image-processor-icon.png",
    cover: "/assets/img/image-processor-cover.png",
    tags: ["图片", "压缩", "水印", "裁剪", "格式转换", "GIF"],
    featured: true,
    status: "live",
    url: "/apps/image-processor/",
    guideUrl: "/apps/image-processor/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/image-processor",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 约 4 MB", url: IMG_RELEASE + "ImageProcessor-1.0.0-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 约 3.3 MB", url: IMG_RELEASE + "ImageProcessor-1.0.0-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · 约 3.8 MB", url: IMG_RELEASE + "ImageProcessor-1.0.0-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: IMG_RELEASE + "ImageProcessor-1.0.0-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1-KMz_BdD8bVwuAsdcAjcGw?pwd=pjbc", code: "pjbc", external: true },
    ],
    features: [
      { k: "完全离线", v: "图片全程本地处理，不上传、不追踪、无需账号" },
      { k: "自由使用", v: "依据 MIT 许可开放，当前版本无需付费，无广告" },
      { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
      { k: "批量高效", v: "一次导入多张图片，统一参数批量输出" },
      { k: "中英双语", v: "界面中 / 英切换，浅色 / 深色 / 跟随系统主题" },
      { k: "智能输出", v: "支持 {name} / {timestamp} / {index} 变量命名，自动避免覆盖" },
    ],
    modules: [
      { k: "基础处理", v: "压缩、格式转换、等比缩放、旋转、翻转" },
      { k: "裁剪", v: "比例裁剪、像素裁剪、手动框选裁剪" },
      { k: "调色", v: "亮度调整、一键美化（曝光 / 白平衡 / 对比度 / 锐化）" },
      { k: "装饰", v: "文字 / 图片水印、边框（实线 / 虚线 / 点线）、圆角" },
      { k: "拼合", v: "水平 / 垂直合并、GIF 动画合成、宫格切图" },
      { k: "批量", v: "拖拽排序、统一参数批量输出、失败文件不丢已成功结果" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
      { k: "内存", v: "建议 4 GB 及以上；处理超大图片或超长 GIF 会占用较多内存" },
      { k: "磁盘空间", v: "约 30 MB" },
      { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装）" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；尝试右键 → 以管理员身份运行；确认是 64 位 Windows。" },
      { q: "SmartScreen 提示「未知发布者」？", a: "软件尚未购买代码签名，属正常现象。点击「更多信息」→「仍要运行」即可。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项。" },
      { q: "输出图片在哪里？会覆盖原图吗？", a: "默认输出到你在「设置 → 输出设置」里指定的目录，文件名按命名模式生成，不会覆盖源文件。" },
      { q: "支持哪些图片格式？", a: "常见格式基本都支持，包括 JPEG、PNG、GIF、BMP、WebP、TIFF、ICO 等。" },
      { q: "一键美化效果不理想？", a: "一键美化是自动参数调整，效果因图而异。可再用「亮度调整」手动微调对比度与亮度。" },
      { q: "批量处理中途有个别图片失败？", a: "已成功处理的文件会保留，失败项会在结果里汇总说明原因，可单独调整后重试。" },
      { q: "是否收费？会不会上传我的图片？", a: "当前版本依据 MIT 许可自由使用。图片全程本地处理，无账号、无云上传。" },
    ],
    guide: {
      screenshot: "/assets/img/image-processor-guide.png",
      screenshotAlt: "图片处理器主界面，左侧为功能列表，中间为参数设置，右侧为图片列表",
      lead: "图片处理器采用「左功能、中参数、右列表」的三栏布局。先指定输出目录，再添加图片、选功能、调参数，最后批量处理。",
      steps: [
        { n: 1, title: "安装与启动", body: "下载便携版 zip 并解压，双击 image-processor.exe 启动；macOS 打开 dmg 将应用拖入「应用程序」。Tauri 2 已将运行资源内嵌，单个 exe 即可运行，无需额外资源文件夹。", tip: "建议解压到普通用户目录，避免需要管理员权限的位置。" },
        { n: 2, title: "先设置输出目录", body: "首次使用，点顶部「设置 → 输出设置」，选择或输入图片保存路径（如 D:\\Pictures\\Output），保存。之后所有处理成果都会输出到这个目录。", shot: "/assets/img/guide/img-menubar.png", shotAlt: "顶部菜单栏「文件 / 设置 / 帮助」，从「设置 → 输出设置」指定图片保存目录" },
        { n: 3, title: "添加图片", body: "把图片直接拖到窗口右侧的图片列表，或点「选择图片文件」导入。支持一次添加多张，可在列表里拖拽排序。", shot: "/assets/img/guide/img-dropzone.png", shotAlt: "右侧「图片列表」的虚线拖放区与「选择图片文件」按钮，右上角可添加或清空列表" },
        { n: 4, title: "选择功能并调参数", body: "在左侧选功能（默认「图片压缩」），中间会显示对应参数。例如压缩时拖动质量滑块，一般设在 70–85 之间，兼顾体积与清晰度。", shot: "/assets/img/guide/img-quality.png", shotAlt: "中间参数设置区，以「压缩设置」为例：拖动质量滑块，数值 70–85 兼顾体积与清晰度" },
        { n: 5, title: "开始处理并取回结果", body: "确认右侧图片列表无误后，点「开始处理」。完成后到输出目录取回图片；个别失败项会汇总提示，已成功的文件不受影响。", shot: "/assets/img/guide/img-start.png", shotAlt: "右下角处理按钮：添加图片后由灰色「请先添加图片」变为可点击的「开始处理」" },
      ],
      naming: "输出文件名支持变量：{name} 原文件名（如 photo）、{timestamp} 时间戳（如 20261111133022）、{index} 序号（如 001）。可自由组合，例如 {name}_{index}。",
      notes: [
        "一键美化为自动参数调整，效果因图而异，可配合亮度 / 对比度手动微调。",
        "处理超大图片或很长的 GIF 时会占用较多内存，建议分批进行。",
      ],
    },
  },

  {
    id: "finance-toolbox",
    name: "财务工具箱",
    tagline: "大写 · 日期 · 税费 · 信贷 · 个税",
    summary: "人民币大写、日期利息、价税分离、贷款折旧与工资个税，输入即得结果。",
    description:
      "离线桌面财务小工具，集成人民币大写、票据日期、价税分离、日期与节假日计算、贷款试算、折旧分摊和工资个税。所有计算在本机完成，不上传数据。",
    version: "0.1.0",
    updated: "2026-11-12",
    icon: "/assets/img/finance-toolbox-icon.png",
    cover: "/assets/img/finance-toolbox-cover.png",
    tags: ["财务", "人民币大写", "日期计算", "价税分离", "工资个税", "节假日"],
    featured: true,
    status: "live",
    url: "/apps/finance-toolbox/",
    guideUrl: "/apps/finance-toolbox/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/finance-toolbox",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 约 2.7 MB", url: FIN_RELEASE + "FinanceToolbox-0.1.0-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 约 2 MB", url: FIN_RELEASE + "FinanceToolbox-0.1.0-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · 约 2.8 MB", url: FIN_RELEASE + "FinanceToolbox-0.1.0-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: FIN_RELEASE + "FinanceToolbox-0.1.0-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1uBDE2bYh-eDjnFofdbYHig?pwd=70qd", code: "70qd", external: true },
    ],
    features: [
      { k: "完全离线", v: "所有计算在本机完成，不上传数据、无账号、无云端接口" },
      { k: "自由使用", v: "依据 MIT 许可开放源码，当前版本自由使用，无广告" },
      { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
      { k: "金额可靠", v: "十进制定点舍入与金额范围校验，避免二进制浮点误差" },
      { k: "票据规范", v: "人民币大写按票据习惯补齐「零圆 / 零角 / 零分」" },
      { k: "结果即用", v: "输入即得结果，支持一键复制，不生成或改写文件" },
      { k: "中英双语", v: "界面中 / 英切换，浅色 / 深色主题，设置记在本机" },
    ],
    modules: [
      { k: "金额与大写", v: "人民币大写、大写反查、金额格式化" },
      { k: "票据日期", v: "支票日期大写（年 / 月 / 日按票据规则转换）" },
      { k: "税费计算", v: "价税分离、利息计算" },
      { k: "日期与日历", v: "日期差与账期、公历农历、法定节假日与调休" },
      { k: "信贷与资产", v: "等额本息 / 等额本金还款计划、直线折旧、比例分摊" },
      { k: "薪酬与校验", v: "工资个税（累计预扣法）、证件号码校验" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
      { k: "内存", v: "建议 4 GB 及以上" },
      { k: "磁盘空间", v: "约 20 MB" },
      { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装）" },
      { k: "节假日数据", v: "本地收录 2001–2027 年；更晚年份按周一至周五估算并明确提示" },
      { k: "首次运行", v: "软件未购买代码签名，可能被 SmartScreen / Gatekeeper 拦截，属正常现象" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；尝试右键 → 以管理员身份运行；确认是 64 位 Windows 且已安装 WebView2 运行时。" },
      { q: "SmartScreen 提示「未知发布者」或 macOS 提示「已损坏」？", a: "软件尚未购买代码签名，属正常现象。Windows 点「更多信息」→「仍要运行」；macOS 可在终端执行 xattr -dr com.apple.quarantine /Applications/Finance\\ Toolbox.app 后重新打开。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项。" },
      { q: "1.005 为什么舍入成 1.01？", a: "金额统一按十进制定点四舍五入处理，避免二进制浮点误差导致的 1.00。超过约 90 万亿元的金额会提示超出可计算范围，不会给出结果。" },
      { q: "0.01 的大写为什么是「零圆零壹分」？", a: "这是票据大写的零位补全规则：不足一元补「零圆」，零角有分补「零」。用于支票、凭证等正式场景更规范。" },
      { q: "2028 年的日期计算准确吗？", a: "本地节假日数据收录到 2027 年。选择 2028 年及以后，界面会提示「未收录年份」，工作日按周一至周五估算，仅供参考；正式放假安排发布后需更新数据文件。" },
      { q: "工资个税结果和工资条不一样？", a: "工具按累计预扣法估算，需填累计收入、累计免税收入与各项扣除。实际应纳税额以单位申报与税务机关口径为准。" },
      { q: "是否收费？会不会上传我的数据？", a: "当前版本依据 MIT 许可自由使用。所有计算在本机完成，无账号、无云上传，设置只存在本机。" },
    ],
    guide: {
      screenshot: "/assets/img/finance-toolbox-guide.png",
      screenshotAlt: "财务工具箱主界面，左侧为功能导航，右侧为「选择工具」宫格，左下可切换语言与主题",
      lead: "财务工具箱是「输入即得结果」的小工具：左边选功能、中间填数据，结果直接显示并可一键复制。下面按真实界面走一遍通用流程。",
      steps: [
        { n: 1, title: "下载与启动", body: "下载 Windows 便携版 zip 并解压到任意目录，双击 finance-toolbox.exe 启动；也可运行 NSIS 安装版。macOS 打开 dmg 把应用拖入「应用程序」，首次被 Gatekeeper 拦截的处理方式见详情页常见问题。", tip: "便携版不写注册表，删除文件夹即卸载；解压路径尽量避开需要管理员权限的系统目录。" },
        { n: 2, title: "认识界面", body: "顶部菜单是「工具 / 帮助 / 文件」，左侧是功能导航（人民币大写、价税分离、日期计算、贷款试算、工资个税等），右侧「选择工具」宫格是同样的入口，卡片下方的「可用」表示功能已就绪。", tip: "左侧栏可滚动，底部是语言切换；右上月亮图标切换深浅主题。", shot: "/assets/img/guide/fin-nav.png", shotAlt: "左侧功能导航：首页、人民币大写、大写反查、支票日期大写、金额格式化、价税分离、日期计算、日历、利息计算、贷款试算等" },
        { n: 3, title: "选择要用的功能", body: "在右侧宫格点任意卡片，例如「人民币大写」，或点左侧同名导航，界面立即切换到该功能页。十几个工具都是同一套操作：填参数、看结果、复制。", shot: "/assets/img/guide/fin-tools.png", shotAlt: "「选择工具」宫格：人民币大写、大写反查、支票日期大写、金额格式化、价税分离、日期计算、利息计算等卡片" },
        { n: 4, title: "填写数据并取回结果", body: "按提示输入金额、日期或参数，结果即时显示，点「复制」即可粘贴到账套、凭证或表格里。输入非数字、负数、超出范围或跨未收录年份时，界面会给出明确提示，不会静默算错。", tip: "金额按「元」输入，最多两位小数；跨年账期注意节假日数据的年份范围。" },
        { n: 5, title: "语言、主题与数据范围", body: "左下角下拉框切换中文 / English，顶部月亮图标切深浅主题，设置保存在本机。节假日数据本地收录 2001–2027 年；选择 2028 年及以后，月历与日期计算会显示「未收录年份」提示。", shot: "/assets/img/guide/fin-lang.png", shotAlt: "界面左下的语言下拉框（中文 / English）与版本号，顶部月亮图标用于切换深浅主题" },
      ],
      namingTitle: "结果与复制",
      naming: "本工具不生成文件，也不改写你的数据：所有结果只在界面显示，可一键复制到剪贴板。金额统一按元处理、保留两位小数，日期按公历输入；如需留档，把复制的结果粘贴进自己的表格或凭证即可。",
      notes: [
        "节假日数据为本地 JSON，收录 2001–2027 年；2028 年及以后按周一至周五估算并给出提示，正式安排发布后需更新数据文件。",
        "工资个税按累计预扣法估算，实际应纳税额以单位申报与税务机关口径为准。",
        "金额超过约 90 万亿元或输入不合法值时会拒绝计算并提示，不会给出结果。",
      ],
    },
  },

  {
    id: "batch-rename",
    name: "批量重命名",
    tagline: "查找替换 · 智能模板 · 自动编号 · 批量粘贴",
    summary: "六种改名模式，实时预览、冲突拦截、可撤销，一次改完整个文件夹。",
    description:
      "离线桌面批量文件重命名工具，提供查找替换、智能重命名、插入内容、自动编号、手动编辑与批量粘贴六种模式，支持图片 EXIF、音频 ID3 元数据占位符、中英双语与操作历史撤销。文件始终留在本机，不上传云端。",
    version: "0.1.0",
    updated: "2026-11-12",
    icon: "/assets/img/batch-rename-icon.png",
    cover: "/assets/img/batch-rename-cover.png",
    tags: ["文件管理", "批量重命名", "查找替换", "自动编号", "EXIF", "可撤销"],
    featured: true,
    status: "live",
    url: "/apps/batch-rename/",
    guideUrl: "/apps/batch-rename/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/batch-rename",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 约 2 MB", url: BAT_RELEASE + "BatchRename-0.1.0-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 约 1.6 MB", url: BAT_RELEASE + "BatchRename-0.1.0-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · 约 2.1 MB", url: BAT_RELEASE + "BatchRename-0.1.0-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: BAT_RELEASE + "BatchRename-0.1.0-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1Jtx3lMcPxLDeTcfuWVCvLQ?pwd=tm8x", code: "tm8x", external: true },
    ],
    features: [
      { k: "完全离线", v: "文件与元数据都在本机读取，不上传、不追踪、无需账号" },
      { k: "自由使用", v: "依据 MIT 许可开放源码，当前版本自由使用，无广告" },
      { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
      { k: "所见即所得", v: "六种模式统一实时预览目标文件名，列表显示的就是执行结果" },
      { k: "不覆盖不丢文件", v: "目标已存在、批次内重名或名称非法一律跳过；两阶段临时名事务，失败自动放回原名" },
      { k: "可撤销", v: "每次执行记入操作历史，交换与链式改名也能整批还原；部分失败可重试" },
      { k: "中英双语", v: "界面中 / 英切换，浅色 / 深色主题，设置记在本机" },
    ],
    modules: [
      { k: "查找替换", v: "普通文本与正则替换，支持忽略大小写、只改文件名或扩展名" },
      { k: "智能重命名", v: "模板变量：{name}、{index}、{created}、图片 EXIF 拍摄时间、音频 ID3 标签" },
      { k: "插入内容", v: "在指定位置插入前缀、后缀或自定义文本" },
      { k: "自动编号", v: "阿拉伯数字 / 罗马数字 / 字母序号，可设起始值、步长与补零" },
      { k: "手动编辑", v: "在列表中直接修改新文件名，逐条微调" },
      { k: "批量粘贴", v: "从 Excel / 表格复制一列名称，Ctrl+V 一次填充" },
      { k: "目录与元数据", v: "递归子目录、按名称 / 日期 / 大小排序、EXIF 与 ID3 占位符" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS 12+ Apple 芯片（aarch64）" },
      { k: "运行时", v: "Windows 需 Edge WebView2 运行时（Win10/11 通常已预装）" },
      { k: "内存", v: "建议 4 GB 及以上" },
      { k: "磁盘空间", v: "约 30 MB" },
      { k: "单批上限", v: "单批最多 5000 个文件；目录遍历深度上限 32 层，不跟随符号链接" },
      { k: "首次运行", v: "软件未购买代码签名，可能被 SmartScreen / Gatekeeper 拦截，属正常现象" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；确认是 64 位 Windows 且已安装 Edge WebView2 运行时；也可换用 NSIS 安装版。" },
      { q: "SmartScreen 提示「未知发布者」或 macOS 提示「已损坏」？", a: "软件尚未购买代码签名，属正常现象。Windows 点「更多信息」→「仍要运行」；macOS 可在终端执行 xattr -dr com.apple.quarantine /Applications/BatchRename.app 后重新打开。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项；操作历史也只存在本机。" },
      { q: "会覆盖已有的文件吗？", a: "不会。目标名称已存在、批次内重名（含大小写不敏感重名）或名称不合法时，该项会跳过并在列表中标出原因，不会覆盖任何文件。" },
      { q: "改错了能撤销吗？", a: "可以。每次执行都会记入「操作历史」，点击「撤销」或用 Ctrl+Z 即可还原；若只还原了一部分，未成功项仍留在历史里，再点一次即可重试。" },
      { q: "支持两个文件互换名字，或 A→B→C 这种链式改名吗？", a: "支持。执行时先全部移到临时名腾空，再落到目标名，因此交换、链式、只改大小写都能正确完成；中途失败会自动放回原名。" },
      { q: "为什么有些名字被标为非法？", a: "Windows 不允许 \\ / : * ? \" < > | 等字符、CON / NUL 等保留设备名，也不允许首尾空格或点、超长名称。新名字里带路径或跨目录同样会被拒绝。" },
      { q: "正则写得太复杂会卡住吗？", a: "预览在后台线程计算并带超时；带嵌套量词、反向引用或超大重复次数等高风险写法会被自动停用并给出提示，不会冻结界面。" },
      { q: "是否收费？会不会上传我的文件？", a: "当前版本依据 MIT 许可自由使用。文件与元数据全程在本机读取和改名，无账号、无云上传。" },
    ],
    guide: {
      screenshot: "/assets/img/batch-rename-guide.png",
      screenshotAlt: "批量重命名主界面，左侧为六种改名模式，中间为文件列表，底部为工具栏与操作历史",
      lead: "批量重命名是「先预览、再执行」的工具：左边选模式、底部添加文件，列表里直接看到改完的名字，确认无误后再整批执行。下面按真实界面走一遍。",
      steps: [
        { n: 1, title: "下载与启动", body: "下载 Windows 便携版 zip 并解压到任意目录，双击 batch-rename.exe 启动；也可运行 NSIS 安装版。macOS 打开 dmg 把应用拖入「应用程序」，首次被 Gatekeeper 拦截的处理方式见详情页常见问题。", tip: "便携版不写注册表，删除文件夹即卸载；先在少量文件的副本目录里试一遍规则更稳妥。" },
        { n: 2, title: "认识界面", body: "左侧是功能导航：查找替换、智能重命名、插入内容、自动编号、手动编辑、批量粘贴六种模式，下方还有「关于」「许可证」与语言下拉框。中间是文件列表，底部是添加文件、排序和执行按钮。", tip: "左下角可切换中文 / English，左上角的箭头按钮可折叠侧栏。", shot: "/assets/img/guide/batch-nav.png", shotAlt: "左侧功能导航：查找替换、智能重命名、插入内容、自动编号、手动编辑、批量粘贴，下方还有关于与许可证入口" },
        { n: 3, title: "添加文件或整个文件夹", body: "点底部「添加文件」或「添加文件夹」，也可把文件拖进列表。需要连子目录一起处理时勾选「递归子目录」；列表支持按名称、日期、大小排序。", shot: "/assets/img/guide/batch-toolbar.png", shotAlt: "底部工具栏：添加文件、添加文件夹、清空、递归子目录勾选项、按名称升序排序、已选文件数、执行重命名" },
        { n: 4, title: "选模式并设置规则", body: "在左侧点任一模式，右侧顶部会出现对应的设置区。例如「查找替换」填查找内容与替换文本，「自动编号」设起始值、步长、补零位数与序号样式；手动编辑模式可直接在列表里逐条改名，批量粘贴模式支持从 Excel 复制一列名称后 Ctrl+V 填充。", tip: "所有模式都会实时预览目标文件名，不用执行就能看到结果；带嵌套量词的复杂正则会被自动停用并提示。", shot: "/assets/img/guide/batch-topbar.png", shotAlt: "顶部规则提示区与「批量粘贴」按钮，设置区会随左侧所选模式切换" },
        { n: 5, title: "核对预览再执行", body: "列表里逐行核对「原名 → 新名」。目标已存在、批次内重名或名称非法的行会标出原因并跳过，不会覆盖文件。确认后点右下角「执行重命名」，整批一次完成。", shot: "/assets/img/guide/batch-history.png", shotAlt: "底部「操作历史」区域，尚未执行时显示「暂无操作记录」，执行后这里会出现本次记录与撤销按钮" },
        { n: 6, title: "撤销与重试", body: "改错了就在「操作历史」点「撤销」，或按 Ctrl+Z。交换文件名、链式改名也能整批还原；若个别文件正被占用只还原了一部分，未成功项会留在历史里，关掉占用程序后再点一次「撤销」即可重试。", shot: "/assets/img/guide/batch-lang.png", shotAlt: "左下角语言下拉框与版本号，可切换中文 / English" },
      ],
      namingTitle: "命名规则与撤销",
      naming: "工具直接改写原文件名，不额外生成副本：新名字只能是「一个文件名」，不能带路径；源与目标必须留在同一目录。Windows 非法字符、保留设备名（CON、NUL 等）、首尾空格与点、超长名称都会被拒绝。目标已存在一律跳过，绝不覆盖；每次执行都会写入操作历史，可整批撤销或重试未成功项。",
      notes: [
        "单批最多 5000 个文件，目录遍历深度上限 32 层，不跟随符号链接；文件特别多时建议分批处理。",
        "执行前请关掉正在占用文件的程序（如播放器、编辑器），避免个别项改名失败。",
        "预览在后台线程计算，超大列表可能需要等片刻；预览未更新时界面会提示暂缓执行。",
      ],
    },
  },

  {
    id: "clear-meta",
    name: "元数据管理",
    tagline: "查看 · 清除 · 编辑 · 脱敏",
    summary: "PDF、Office、图片元数据，本地查看、清除与编辑，对外发文件前先去掉隐私痕迹。",
    description:
      "离线桌面元数据管理工具，支持查看、选择性清除与编辑 PDF、Office、图片文件中的元数据。内置投标脱敏、隐私清除预设，处理前后对比、批量处理与报告导出。所有处理在本机完成，数据不出本机。",
    version: "0.1.0",
    updated: "2026-11-12",
    icon: "/assets/img/clear-meta-icon.png",
    cover: "/assets/img/clear-meta-cover.png",
    tags: ["元数据", "隐私", "投标脱敏", "PDF", "Office", "图片"],
    featured: true,
    status: "live",
    url: "/apps/clear-meta/",
    guideUrl: "/apps/clear-meta/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/clear-meta",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 无需安装", url: CM_RELEASE + "ClearMeta-0.1.0-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 当前用户目录", url: CM_RELEASE + "ClearMeta-0.1.0-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · aarch64", url: CM_RELEASE + "ClearMeta-0.1.0-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: CM_RELEASE + "ClearMeta-0.1.0-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1GimCN4mpBesgWLXNsg9FMw?pwd=9rp6", code: "9rp6", external: true },
    ],
    features: [
      { k: "完全离线", v: "文件与元数据都在本机读取和处理，不上传、不追踪、无需账号" },
      { k: "自由使用", v: "依据 MIT 许可开放源码，当前版本自由使用，无广告" },
      { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
      { k: "选择性清除", v: "每个字段可单独设为保留 / 清除 / 编辑，不误删有用信息" },
      { k: "字段编辑", v: "把作者、标题、公司等改为指定内容，统一对外署名" },
      { k: "快速预设", v: "投标脱敏、隐私清除、全部清除，一键套用整组规则" },
      { k: "可回溯", v: "处理前后对比一目了然；覆盖原文件先自动备份，可整批撤销" },
      { k: "批量与报告", v: "文件夹批量处理，导出 CSV / JSON 报告便于留档" },
    ],
    modules: [
      { k: "PDF", v: "作者、创建者、生成程序、创建 / 修改时间、XMP 元数据" },
      { k: "Office", v: "作者、最后修改者、公司、应用程序、自定义属性（docx / xlsx / pptx 等）" },
      { k: "图片", v: "EXIF、GPS 定位、拍摄设备、软件痕迹（jpg / png / webp）" },
      { k: "字段策略", v: "保留 / 清除 / 编辑三态，按分组全保留或全清除" },
      { k: "预设", v: "投标脱敏、隐私清除、全部清除，规则按字段匹配" },
      { k: "输出方式", v: "另存到新目录，或覆盖原文件（自动备份、可撤销）" },
      { k: "报告", v: "处理前后对比视图，导出 CSV / JSON 处理报告" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
      { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装，内置引导器可离线安装）" },
      { k: "内存", v: "建议 4 GB 及以上" },
      { k: "磁盘空间", v: "约 30 MB" },
      { k: "单次上限", v: "单次最多 500 个文件；目录扫描深度 8 层、条数 5000" },
      { k: "格式支持", v: "PDF；Office OOXML（doc/xlsx/pptx 及带宏版本）；jpg / png / webp。不含旧版 Office 与 TIFF / HEIC" },
      { k: "首次运行", v: "软件未购买代码签名，可能被 SmartScreen / Gatekeeper 拦截，属正常现象" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；确认是 64 位 Windows 且已安装 WebView2 运行时；也可换用 NSIS 安装版。" },
      { q: "SmartScreen 提示「未知发布者」或 macOS 提示「已损坏」？", a: "软件尚未购买代码签名，属正常现象。Windows 点「更多信息」→「仍要运行」；macOS 可在终端执行 xattr -dr com.apple.quarantine /Applications/ClearMeta.app 后重新打开。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项。" },
      { q: "文件会上传到服务器吗？", a: "不会。所有读取、清除与编辑都在本机完成，离线可用，无账号、无云上传。" },
      { q: "清除后还能恢复吗？", a: "选「覆盖原文件」时会先自动备份到应用数据目录，可在结果列表点「撤销」还原；更稳妥的做法是优先「另存到新目录」，原件完全不动。" },
      { q: "为什么拖入 Office 文件后界面自动切换模块？", a: "软件会按文件扩展名自动识别 PDF / Office / 图片并切到对应模块，避免用错规则。" },
      { q: "处理带宏或数字签名的 Office 文件会怎样？", a: "宏会原样保留；但 Office 文档的数字签名在重新打包后必然失效，这是 Office 签名机制决定的。如需保留签名，请勿处理该文件。" },
      { q: "单次能处理多少文件？", a: "单次最多 500 个；目录批量扫描深度上限 8 层、条数上限 5000，超出会提示分批。" },
      { q: "支持旧版 .doc / .xls 或 TIFF / HEIC 吗？", a: "暂不支持。Office 仅支持 OOXML 格式（docx / xlsx / pptx / docm / xlsm / pptm），图片支持 jpg / jpeg / png / webp。" },
      { q: "是否收费？", a: "采用 MIT 开源许可，当前版本依据许可自由使用，无广告。" },
    ],
    guide: {
      screenshot: "/assets/img/clear-meta-guide.png",
      screenshotAlt: "元数据管理主界面：左侧为 PDF / Office / 图片功能模块，中间为拖放区、快速预设与输出方式，右侧为元数据编辑区",
      lead: "元数据管理是「先看、再选、后清理」的工具：拖入文件看有哪些元数据，按字段勾选清除或编辑，再选输出方式。下面按真实界面走一遍，把对外文件里的隐私痕迹去掉。",
      steps: [
        { n: 1, title: "下载与启动", body: "下载 Windows 便携版 zip 并解压到任意目录，双击 clear-meta.exe 启动；也可运行 NSIS 安装版。macOS 打开 dmg 把应用拖入「应用程序」，首次被 Gatekeeper 拦截的处理方式见详情页常见问题。", tip: "便携版不写注册表，删除文件夹即卸载；建议先拿一份文件副本试一遍预设规则。" },
        { n: 2, title: "认识界面", body: "左侧是功能模块（PDF、Office、图片）与关于、许可证入口；中间是当前模块的操作区：拖放区、快速预设、输出方式与文件列表；右侧是元数据编辑面板。拖入文件后会自动识别类型并切到对应模块。", tip: "左下角可切换深 / 浅主题；拖放区提示的「最多 500 个」是单次批量上限。", shot: "/assets/img/guide/cm-nav.png", shotAlt: "左侧功能模块导航：PDF、Office、图片，下方为关于与许可证入口" },
        { n: 3, title: "添加文件并预览元数据", body: "把文件拖到窗口中间的虚线拖放区，或点「选择文件 / 选择文件夹（批量）」。文件加入后，右侧会列出可读的全部元数据并按字段分组，处理前先看清有哪些信息。", shot: "/assets/img/guide/cm-dropzone.png", shotAlt: "中间操作区的虚线拖放区「点击选择或拖拽文件到窗口」，下方是选择文件夹（批量）与快速预设按钮" },
        { n: 4, title: "套用预设或逐字段设置", body: "赶时间就点「投标脱敏」「隐私清除」或「全部清除」快速预设，规则会按字段匹配；想精细控制就在右侧逐字段设为保留 / 清除 / 编辑，编辑项可把作者、标题、公司改成指定内容。未命中的字段保持原样。", tip: "投标场景优先用「投标脱敏」，可清除作者、最后修改者、应用程序、公司等易被关联的字段。", shot: "/assets/img/guide/cm-preset.png", shotAlt: "快速预设按钮：投标脱敏、隐私清除、全部清除，下方提示规则按字段匹配、未命中字段保持原样" },
        { n: 5, title: "选输出方式并应用", body: "在「输出方式」选「另存到新目录」（推荐，原件完全不动）或「覆盖原文件（自动备份）」。选好输出目录后点「应用更改」，处理前后对比会显示每个字段的变化。", tip: "覆盖原文件会自动备份到应用数据目录，改错了可在结果里撤销；重要文件建议优先另存。", shot: "/assets/img/guide/cm-output.png", shotAlt: "输出方式单选：另存到新目录 / 覆盖原文件（自动备份），下方为输出目录、文件列表与应用更改按钮" },
        { n: 6, title: "核对结果、撤销与导出报告", body: "处理后在右侧核对元数据编辑区的变化；需要留档就导出 CSV / JSON 报告。若覆盖了原文件且结果不满意，点结果里的「撤销」即可还原原件。", shot: "/assets/img/guide/cm-editor.png", shotAlt: "右侧元数据编辑面板，用于查看字段、选择保留或清除，并在处理后核对变更" },
      ],
      namingTitle: "输出与撤销",
      naming: "选「另存到新目录」时，输出文件写到指定目录，不覆盖原件；选「覆盖原文件」时，写入前会先把原件备份到应用数据目录，可在结果里整批撤销。处理报告可导出为 CSV 或 JSON，保存在应用数据目录，便于留档核对。",
      notes: [
        "单次最多 500 个文件，目录扫描深度 8 层、条数上限 5000；文件特别多时建议分批。",
        "Office 重新打包后数字签名必然失效（Office 机制决定），宏会原样保留；需保留签名请勿处理。",
        "暂不支持旧版 Office（doc / xls / ppt）及 TIFF / HEIC；高敏感场景如需彻底干净，建议清除元数据后再打印扫描。",
      ],
    },
  },

  {
    id: "seal-extractor",
    name: "印章提取",
    tagline: "识别 · 预览 · 补色 · 批量导出",
    summary: "合同图片或 PDF 里的红色印章，自动找出、逐枚预览、批量导出 PNG。",
    description:
      "离线桌面印章提取工具，上传合同图片或多页 PDF，自动识别所有红色印章，逐枚预览并批量导出独立 PNG。内置周边补色修复，可清除压在章上的黑色签字与印刷字。识别在笔记本内存完成，不上传云端。",
    version: "1.1.0",
    updated: "2026-11-12",
    icon: "/assets/img/seal-extractor-icon.png",
    cover: "/assets/img/seal-extractor-cover.png",
    tags: ["印章提取", "合同", "PDF", "图片", "OpenCV", "批量导出"],
    featured: true,
    status: "live",
    url: "/apps/seal-extractor/",
    guideUrl: "/apps/seal-extractor/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/seal-extractor",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 单文件 exe", url: SEAL_RELEASE + "SealExtractor-1.1.0-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 当前用户目录", url: SEAL_RELEASE + "SealExtractor-1.1.0-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · aarch64", url: SEAL_RELEASE + "SealExtractor-1.1.0-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: SEAL_RELEASE + "SealExtractor-1.1.0-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1pn_8DDL3t7WsG2_SWYZVqw?pwd=168g", code: "168g", external: true },
    ],
    features: [
      { k: "完全离线", v: "内嵌 OpenCV.js 引擎，识别全程在本机内存完成，不上传、无网络请求" },
      { k: "自由使用", v: "依据 MIT 许可开放源码，当前版本自由使用，无广告" },
      { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
      { k: "自动识别", v: "双红区间 + 形态学闭运算 + 轮廓筛选，圆章、椭圆章、方章都能找出" },
      { k: "补色修复", v: "用周边红色补回被黑色签字 / 印刷字盖住的笔画，清除章内黑杂点" },
      { k: "四种输出", v: "透明底红章 / 白底红章 / 原图裁切 / 去黑字裁切" },
      { k: "批量导出", v: "单张另存、打包 ZIP（附印章清单 CSV）、桌面版可直接导出到文件夹" },
      { k: "多页 PDF", v: "内置 pdf.js 逐页渲染，每页单独列出、单独识别，清晰度 1.5×–3× 可调" },
    ],
    modules: [
      { k: "导入", v: "拖拽 / 多选，支持 PNG、JPG、WEBP、BMP、GIF、TIFF 图片与多页 PDF" },
      { k: "红色识别", v: "HSV 双红区间、饱和度 / 密度 / 形状比阈值，可调参数适应褪色与扫描件" },
      { k: "框合并", v: "重叠框按 IoU 合并，结果带编号、置信度、尺寸与红像素占比" },
      { k: "周边补色", v: "8 方向找可信红色按距离加权补色，可调半径，关闭即输出原始像素" },
      { k: "输出模式", v: "透明底 / 白底 / 原图裁切 / 去黑字裁切，统一章色消除暗红噪点" },
      { k: "导出", v: "单张 PNG、所选印章 ZIP（含印章清单.csv）、直接导出到文件夹" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
      { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装，内置离线引导器）" },
      { k: "内存", v: "建议 4 GB 及以上；首次加载约 13 MB 离线引擎，之后无需联网" },
      { k: "磁盘空间", v: "约 20 MB" },
      { k: "处理上限", v: "单次最多 60 个文件 / 200 页；单个 PDF 120 页、150 MB；单图单边 12000 px" },
      { k: "扫描建议", v: "扫描件建议 200 DPI 以上，过低分辨率细笔画印章可能漏检" },
      { k: "首次运行", v: "软件未购买代码签名，可能被 SmartScreen / Gatekeeper 拦截，属正常现象" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；确认是 64 位 Windows 且已安装 WebView2 运行时；也可换用 NSIS 安装版。" },
      { q: "SmartScreen 提示「未知发布者」或 macOS 提示「已损坏」？", a: "软件尚未购买代码签名，属正常现象。Windows 点「更多信息」→「仍要运行」；macOS 可在终端执行 xattr -dr com.apple.quarantine /Applications/SealExtractor.app 后重新打开。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项。" },
      { q: "文件会上传吗？", a: "不会。图片与 PDF 全程在本机内存处理，OpenCV 引擎已内嵌，无账号、无网络请求。" },
      { q: "有些印章识别不出来怎么办？", a: "印章褪色漏检时调低「红色饱和度下限」与「最小印章边长」；章被拆成几块时调大「笔画连接强度」；改完点「把参数应用到全部页面」。" },
      { q: "红色横线、手写红字被当成印章？", a: "调高「红色密度下限」、调小「形状比上限」，可过滤细长红条与红字块。" },
      { q: "导出的透明底 PNG 还有黑色碎字 / 毛边？", a: "保持「补色修复黑色压字」开启：黑色笔画太粗就调大「补色半径」，相邻笔画被连在一起则调小。想看原始像素可关掉开关并选「原图裁切」。" },
      { q: "章上有黑色签字，能去掉吗？", a: "选「去黑字裁切」模式并开启补色修复，可保留合同底纹、清除黑色签字与印刷字；透明底 / 白底模式也会清掉章内黑杂点并统一章色。" },
      { q: "PDF 很多页会不会卡？", a: "单页过大时会自动降低渲染清晰度以避免内存溢出；单个 PDF 最多处理 120 页、单次累计 200 页，超出请拆分后再导入。" },
      { q: "是否收费？", a: "采用 MIT 开源许可，当前版本依据许可自由使用，无广告。" },
    ],
    guide: {
      screenshot: "/assets/img/seal-extractor-guide.png",
      screenshotAlt: "印章提取主界面：左侧为文件列表与识别参数，中间为合同预览与红色编号标注框，右侧为识别出的 8 枚印章结果卡片",
      lead: "印章提取是「拖进来、看结果、勾选导出」的工具：左边调参数，中间看标注，右边勾选要导出的章。下面按真实界面走一遍，把一份两页合同里的 8 枚红章提取出来。",
      steps: [
        { n: 1, title: "下载与启动", body: "下载 Windows 便携版 zip 并解压到任意目录，双击「印章提取.exe」启动；也可运行 NSIS 安装版。macOS 打开 dmg 把应用拖入「应用程序」，首次被 Gatekeeper 拦截的处理方式见详情页常见问题。", tip: "便携版不写注册表，删除文件夹即卸载；首次打开需 1–3 秒加载离线引擎。" },
        { n: 2, title: "添加合同图片或 PDF", body: "把合同图片或多页 PDF 拖进窗口，或点右上「打开合同」。PDF 会逐页渲染、逐页识别，每页单独列出。软件自带一份两页「示例合同.pdf」，可直接拖进去试用（共 8 枚红章）。", shot: "/assets/img/guide/seal-files.png", shotAlt: "左侧「文件 / 页面」列表，导入 contract.pdf 后显示第 1/2 页与第 2/2 页，每页各 4 枚印章" },
        { n: 3, title: "看识别结果与标注", body: "中间预览区会用带编号的绿色框标出每一枚识别到的印章，右侧「识别结果」逐枚列出缩略图、置信度、尺寸与红色像素占比。点任一卡片可在原图上定位。", tip: "置信度分高 / 中 / 低，低的可能是红色表格线或手写红字，可取消勾选。", shot: "/assets/img/guide/seal-preview.png", shotAlt: "中间合同预览，红色圆章、椭圆章、矩形章被绿色编号框 1、2、3、4 标出" },
        { n: 4, title: "识别不准时调参数", body: "褪色漏检就调低「红色饱和度下限」和「最小印章边长」；章被拆成几块就调大「笔画连接强度」；红色横线 / 红字被误认就调高「红色密度下限」、调小「形状比上限」。改完点「把参数应用到全部页面」。", shot: "/assets/img/guide/seal-params.png", shotAlt: "左侧识别参数区：红色饱和度下限、最小印章边长、形状比上限、红色密度下限、笔画连接强度、重叠框合并" },
        { n: 5, title: "选输出模式与补色", body: "右侧「输出」下拉有透明底、白底、原图裁切、去黑字裁切四种。默认开启「补色修复黑色压字」，用周边红色补回被黑签字盖住的笔画并统一章色；黑色笔画粗就调大「补色半径」，想看原始像素就关掉开关并选「原图裁切」。", tip: "透明底只保留红色笔画，若合同本身有红色文字 / 表格线可能一起保留，建议用白底或原图裁切核对。", shot: "/assets/img/guide/seal-mode.png", shotAlt: "右侧输出模式下拉框（默认透明底红章）与「补色修复黑色压字」开关、补色半径滑块" },
        { n: 6, title: "勾选并批量导出", body: "在右侧逐枚勾选要导出的印章，点「保存这张 PNG」单张另存，或点「导出所选（ZIP）」得到每枚印章的 PNG 加一份印章清单 CSV；桌面版还能「导出到文件夹」把每枚直接写成独立 PNG。个别写入失败会明确列出，已写出的不回退。", shot: "/assets/img/guide/seal-cards.png", shotAlt: "右侧识别结果卡片列表，每张有勾选框、印章编号、置信度、尺寸与「保存这张 PNG」按钮" },
      ],
      namingTitle: "导出命名",
      naming: "单张保存与导出到文件夹时，文件名按「页码_来源_第几页_章编号.png」生成，例如 01_contract_P1_章1.png，多页多章不会重名。导出 ZIP 时另附一份「印章清单.csv」，记录每枚的来源、页码、坐标、尺寸与置信度，便于核对归档。",
      notes: [
        "扫描件建议 200 DPI 以上；过低分辨率下细笔画印章可能漏检。",
        "透明底模式只保留红色笔画，合同本身的红色文字 / 表格线可能一起保留，建议用白底或原图裁切模式核对。",
        "单次最多 60 个文件 / 200 页，单个 PDF 120 页、150 MB；单图单边不超过 12000 px，超大页面会自动降低渲染清晰度。",
      ],
    },
  },

  {
    id: "tixingmao",
    name: "提醒猫",
    tagline: "托盘 · 定时 · 工作日 · 悬浮猫咪",
    summary: "安静待在托盘，到点让一只会动的小猫来提醒你，还能自动跳过节假日。",
    description:
      "离线桌面提醒工具，平时驻留系统托盘，到点从屏幕指定位置弹出一只会动的小猫和提醒文字。支持一次性、每天、间隔三种提醒，可自动跳过周末与国家法定节假日并正确处理调休，所有数据保存在本机。",
    version: "1.0.1",
    updated: "2026-11-12",
    icon: "/assets/img/tixingmao-icon.png",
    cover: "/assets/img/tixingmao-cover.png",
    tags: ["提醒", "托盘", "番茄钟", "法定节假日", "桌面宠物", "定时"],
    featured: true,
    status: "live",
    url: "/apps/tixingmao/",
    guideUrl: "/apps/tixingmao/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/tixingmao",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 单文件 exe", url: TIXINGMAO_RELEASE + "Tixingmao-1.0.1-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 当前用户目录", url: TIXINGMAO_RELEASE + "Tixingmao-1.0.1-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · aarch64", url: TIXINGMAO_RELEASE + "Tixingmao-1.0.1-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: TIXINGMAO_RELEASE + "Tixingmao-1.0.1-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1n4vqkHtzzEwqc3SaIOVHpg?pwd=ljia", code: "ljia", external: true },
    ],
    features: [
      { k: "完全本地", v: "提醒与设置都保存在本机应用数据目录，无账号、无云同步、不联网" },
      { k: "自由使用", v: "依据 MIT 许可开放源码，当前版本自由使用，无广告" },
      { k: "安静驻留", v: "平时待在托盘，关闭主窗口不退出，不打扰你正在做的事" },
      { k: "会动的小猫", v: "到点弹出透明置顶悬浮层，猫咪会眨眼、摆尾、呼吸、拍爪，悬停即暂停" },
      { k: "法定工作日", v: "自动跳过周末与国家法定节假日，并正确处理官方调休上班日" },
      { k: "位置可选", v: "猫咪出现位置九宫格任选，左上到右下九个位置即时生效" },
      { k: "自己补假期", v: "新一年放假安排公布后，可在设置里手动标记或批量导入休息日与调休日" },
      { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
    ],
    modules: [
      { k: "一次性提醒", v: "指定日期时间，到点提醒一次；可设为完成后自动删除" },
      { k: "每天提醒", v: "每天固定时间，适合喝水、起身、日报等固定节奏" },
      { k: "间隔提醒", v: "每隔 N 分钟 / 小时 / 天循环提醒，可做简易番茄钟" },
      { k: "工作日模式", v: "仅法定工作日触发，遇到节假日与周末自动顺延" },
      { k: "悬浮提醒", v: "透明置顶、不抢键盘焦点、悬停暂停、点击关闭，多条依次排队" },
      { k: "假期维护", v: "单日标记休息 / 调休上班，或按行批量导入放假与调休日期" },
      { k: "托盘与排序", v: "托盘菜单快捷操作，提醒卡片拖拽排序，顺序本地保存" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
      { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装，内置离线引导器）" },
      { k: "内存", v: "建议 4 GB 及以上" },
      { k: "磁盘空间", v: "约 15 MB" },
      { k: "节假日数据", v: "内置 2024–2027 年中国法定节假日（含 2027 年最新安排）；更晚年份可在设置里手动补充" },
      { k: "首次运行", v: "软件未购买代码签名，可能被 SmartScreen / Gatekeeper 拦截，属正常现象" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；确认是 64 位 Windows 且已安装 WebView2 运行时；也可换用 NSIS 安装版。" },
      { q: "SmartScreen 提示「未知发布者」或 macOS 提示「已损坏」？", a: "软件尚未购买代码签名，属正常现象。Windows 点「更多信息」→「仍要运行」；macOS 可在终端执行 xattr -dr com.apple.quarantine /Applications/Tixingmao.app 后重新打开。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项；提醒数据另存在应用数据目录，卸载前可自行备份。" },
      { q: "关掉窗口是不是就不提醒了？", a: "不是。关闭主窗口只是把它收进托盘，后台仍按计划提醒。要完全退出，请右键托盘图标选「退出提醒猫」。" },
      { q: "到点没看到猫咪？", a: "猫咪是透明置顶悬浮层，默认出现在屏幕右下角。可在「系统设置 → 猫咪出现位置」改成更醒目的位置；也可点「预览猫咪」先看效果。" },
      { q: "悬浮层会抢走我正在打字的焦点吗？", a: "不会。悬浮层不抢键盘焦点，鼠标移入会暂停猫咪动画并显示关闭按钮，移开继续。" },
      { q: "节假日提醒准吗？2028 年呢？", a: "内置 2024–2027 年中国法定节假日与调休数据（含 2027 年国务院最新安排），会跳过周末与法定节假日并识别调休上班日。2028 年及以后可在「系统设置 → 法定节假日与调休」手动标记或批量导入，不必等软件更新。" },
      { q: "数据会上传吗？需要注册账号吗？", a: "不会、也不需要。所有提醒、位置与假期设置都保存在本机应用数据目录，无账号、无云同步、无网络请求。" },
      { q: "是否收费？", a: "采用 MIT 开源许可，当前版本依据许可自由使用，无广告。" },
    ],
    guide: {
      screenshot: "/assets/img/tixingmao-guide.png",
      screenshotAlt: "提醒猫主界面：左侧是「我的提醒」列表与今天的日期徽章，右侧是「新建提醒」表单",
      lead: "提醒猫是「设一次、它自己记着」的工具：左边看提醒、右边建提醒，到点猫咪从屏幕角落弹出来。下面按真实界面走一遍，设好你的第一条提醒。",
      steps: [
        { n: 1, title: "下载与启动", body: "下载 Windows 便携版 zip 并解压到任意目录，双击「提醒猫.exe」启动；也可运行 NSIS 安装版。macOS 打开 dmg 把应用拖入「应用程序」，首次被 Gatekeeper 拦截的处理方式见详情页常见问题。", tip: "便携版不写注册表，删除文件夹即卸载；启动后主窗口右上角会显示今天是工作日还是节假日。" },
        { n: 2, title: "认识界面", body: "窗口分两栏：左侧「我的提醒」列出已设的提醒，顶部有今天的日期徽章；右侧「新建提醒」是表单。页头右上角有「预览猫咪」「系统设置」「新建提醒」三个按钮。", shot: "/assets/img/guide/tm-main.png", shotAlt: "提醒猫主窗口：左侧我的提醒列表与今天「工作日」徽章，右侧新建提醒表单，页头有预览猫咪与系统设置按钮" },
        { n: 3, title: "新建一条提醒", body: "在右侧填「提醒名称」（必填），可选填「猫咪说的话」。提醒方式三选一：仅一次（指定日期时间）、每天（固定几点）、间隔提醒（每 N 分钟/小时/天）。需要跳过周末与法定节假日就保持勾选「只在法定工作日提醒」。", tip: "想做喝水、起身这类节奏提醒，选「每天」或「间隔提醒」最省事。", shot: "/assets/img/guide/tm-form.png", shotAlt: "新建提醒表单：提醒名称、猫咪说的话、提醒方式（仅一次/每天/间隔提醒）、每天几点与「只在法定工作日提醒」勾选项" },
        { n: 4, title: "选择猫咪出现位置", body: "点页头「系统设置」，在「猫咪出现位置」九宫格里选一个方位（左上、上中、右上、左中、居中、右中、左下、下中、右下），选择后立即生效，之后所有提醒都会从这里出现。", tip: "工作区右下角常被遮挡的话，可改成右上角或居中，更醒目。", shot: "/assets/img/guide/tm-position.png", shotAlt: "系统设置弹窗里的「猫咪出现位置」九宫格，九个方位可选，当前选中项高亮" },
        { n: 5, title: "预览并等猫咪来提醒", body: "点「预览猫咪」先看效果：一只米白色小猫从左下角探出，旁边深色卡片写着提醒标题与内容。到点后真实提醒同样弹出，鼠标移入会暂停动画并显示关闭按钮，移开继续，多条提醒会依次排队。", tip: "悬浮层透明置顶、不抢键盘焦点，可以放心继续手头的事；看完点右上角 × 关闭。", shot: "/assets/img/guide/tm-overlay.png", shotAlt: "桌面右下角弹出的猫咪悬浮提醒：米白色小猫插画配深色提醒卡片，卡片标题为「该喝水啦」" },
        { n: 6, title: "托盘与后台运行", body: "关闭主窗口不会退出，提醒猫继续在托盘运行；右键托盘图标可「打开提醒列表」「新建提醒」「测试悬浮提醒」或「退出提醒猫」，左键单击图标打开列表。提醒卡片可按住左侧圆点拖动排序，顺序自动保存。", shot: "/assets/img/guide/tm-tray.png", shotAlt: "托盘右键菜单：打开提醒列表、新建提醒、测试悬浮提醒、退出提醒猫" },
      ],
      namingTitle: "提醒与数据",
      naming: "提醒猫不生成输出文件：所有提醒、显示位置与自定义节假日都保存在系统应用数据目录（Windows 在 %APPDATA%\\com.tixingmao.desktop，macOS 在 ~/Library/Application Support/com.tixingmao.desktop），以 JSON 文件保存，不上传网络。数据文件若损坏会自动改名备份为 .json.broken 并重新建立，不会让程序崩溃。",
      notes: [
        "内置节假日数据覆盖 2024–2027 年（含 2027 年国务院最新放假安排）；2028 年及以后请在「系统设置 → 法定节假日与调休」手动标记或批量导入，不必等软件更新。",
        "所有时间按北京时间（UTC+8）计算；一次性提醒若选在法定节假日且开启了工作日模式，会自动顺延到下一个工作日。",
        "关闭主窗口只是收进托盘，仍在后台提醒；要完全退出请右键托盘图标选「退出提醒猫」。",
        "便携版解压即用、不写注册表；提醒数据单独存在应用数据目录，搬运时记得单独备份。",
      ],
    },
  },

  {
    id: "rili",
    name: "小日历",
    tagline: "桌面 Widget · 农历节气 · 法定假日",
    summary: "常驻桌面一角的轻量日历，农历、节气、法定假日与调休一目了然，还能倒计时下一个假期。",
    description:
      "墨点出品的桌面常驻小日历（Windows / macOS 原生，基于 Tauri 2）。无边框、半透明、可置顶，关窗即收进托盘；公历 + 农历 + 二十四节气同屏显示，内置 2026 / 2027 法定假日与调休并以「休 / 班」徽章标注，自动计算下一个法定假期倒计时。所有数据保存在本机，不联网。",
    version: "1.0.0",
    updated: "2026-11-13",
    icon: "/assets/img/rili-icon.png",
    cover: "/assets/img/rili-cover.png",
    tags: ["日历", "桌面Widget", "农历", "节气", "法定假日", "调休", "假期倒计时", "托盘"],
    featured: true,
    status: "live",
    url: "/apps/rili/",
    guideUrl: "/apps/rili/guide/",
    platforms: ["Windows", "macOS"],
    repo: "https://github.com/lizundao/rili",
    downloads: [
      { label: "Windows 便携版", os: "Windows", note: "解压即用 · 单文件 exe", url: RILI_RELEASE + "rili-1.0.0-portable-win-x64.zip" },
      { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 当前用户目录", url: RILI_RELEASE + "rili-1.0.0-setup-win-x64.exe" },
      { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · aarch64", url: RILI_RELEASE + "rili-1.0.0-aarch64.dmg" },
      { label: "macOS app（备选）", os: "macOS", note: "app 压缩包 · dmg 打不开时用", url: RILI_RELEASE + "rili-1.0.0-aarch64.app.zip" },
      { label: "百度网盘（备用）", os: "网盘", note: "免输码直达 · 永久有效", url: "https://pan.baidu.com/s/1WsaxPe9E6kHvsvtYgDR0UA?pwd=aqye", code: "aqye", external: true },
    ],
    features: [
      { k: "完全本地", v: "日历、农历与所有设置都保存在本机，无账号、无云同步、不联网" },
      { k: "自由使用", v: "依据 MIT 许可开放源码，当前版本自由使用，无广告" },
      { k: "桌面 Widget", v: "无边框、可透明、可置顶，像一张便签贴在屏幕一角" },
      { k: "收进托盘", v: "关闭窗口不退出，左键托盘图标即可显隐，不打扰手头工作" },
      { k: "中国历", v: "公历 + 农历 + 二十四节气同屏，基于开源历法库 tyme4ts" },
      { k: "法定假日与调休", v: "内置 2026 / 2027 国务院放假安排，日历上以「休 / 班」徽章标注并正确识别调休上班日" },
      { k: "假期倒计时", v: "自动计算今天距离下一个法定假期还有几天，一眼可见" },
      { k: "自己加节日", v: "新一年放假安排公布后，可在设置里按年份导入自己的节日与调休" },
    ],
    modules: [
      { k: "月历视图", v: "整月网格布局，今日高亮，周末与节假日一目了然" },
      { k: "农历与节气", v: "每格显示农历日期，节气当天标注节气名称" },
      { k: "休 / 班徽章", v: "法定放假日标「休」，调休上班日标「班」，与国务院安排一致" },
      { k: "假期倒计时", v: "顶部或侧栏显示「距 XX 假期还有 N 天」" },
      { k: "自定义节日", v: "按年份导入法定 / 自定义节日及调休，支持 2/5-2/13、1/31,2/14 等写法" },
      { k: "个性化", v: "透明度、字号缩放、窗口置顶、开机自启、系统字体切换、竖排 / 横排布局" },
    ],
    requirements: [
      { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
      { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装，内置离线引导器）" },
      { k: "内存", v: "建议 4 GB 及以上" },
      { k: "磁盘空间", v: "约 15 MB" },
      { k: "节假日数据", v: "内置 2026 / 2027 年中国法定节假日（含调休）；更晚年份可在设置里手动补充" },
      { k: "首次运行", v: "软件未购买代码签名，可能被 SmartScreen / Gatekeeper 拦截，属正常现象" },
    ],
    faq: [
      { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；确认是 64 位 Windows 且已安装 WebView2 运行时；也可换用 NSIS 安装版。" },
      { q: "SmartScreen 提示「未知发布者」或 macOS 提示「已损坏」？", a: "软件尚未购买代码签名，属正常现象。Windows 点「更多信息」→「仍要运行」；macOS 可在终端执行 xattr -dr com.apple.quarantine /Applications/rili.app 后重新打开。" },
      { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项；个性化设置另存在应用数据目录，卸载前可自行备份。" },
      { q: "关掉窗口日历就没了吗？", a: "不会。关闭窗口只是把小日历收进系统托盘，左键托盘图标即可重新显隐；要完全退出，右键托盘图标选「退出小日历」。" },
      { q: "农历和节气准吗？2028 年呢？", a: "农历与二十四节气基于开源历法库 tyme4ts 计算；法定假日内置 2026 / 2027 年安排，并正确识别调休上班日。2028 年及以后可在「设置 → 添加节日」按年份手动导入，不必等软件更新。" },
      { q: "数据会上传吗？需要注册账号吗？", a: "不会、也不需要。所有自定义节日、调休与个性化设置都保存在本机应用数据目录，无账号、无云同步、无网络请求。" },
      { q: "是否收费？", a: "采用 MIT 开源许可，当前版本依据许可自由使用，无广告。" },
    ],
    guide: {
      screenshot: "/assets/img/rili-guide.png",
      screenshotAlt: "小日历桌面 Widget：无边框半透明窗口，月历网格中今日高亮，农历与节气同屏，法定放假日以「休」徽章标注",
      lead: "小日历是「贴」在桌面一角的小日历：看日期、看农历节气、看法定假日与调休，还能倒计时下一个假期。下面从下载到摆好你的第一张日历，几分钟走通。",
      steps: [
        { n: 1, title: "下载与启动", body: "下载 Windows 便携版 zip 并解压到任意目录，双击「rili.exe」启动；也可运行 NSIS 安装版。macOS 打开 dmg 把应用拖入「应用程序」，首次被 Gatekeeper 拦截的处理方式见详情页常见问题。", tip: "便携版不写注册表，删除文件夹即卸载；启动后窗口默认半透明、无边框，像一张便签贴在屏幕上。" },
        { n: 2, title: "认识桌面日历", body: "窗口是一张整月网格：今天高亮，周末浅色区分，每格下方显示农历日期。窗口无边框、可拖动，关窗只是收进托盘，左键托盘图标即可重新显隐。", tip: "想让它一直看得见，可在设置里打开「窗口置顶」。" },
        { n: 3, title: "看农历、节气与法定假日", body: "每格显示农历日期，节气当天会标注节气名称（如「立春」「清明」）。法定放假日以「休」徽章标注，调休上班日以「班」徽章标注，与国务院办公厅安排一致。", tip: "2026 / 2027 年数据已内置，无需手动添加；更晚年份在「设置 → 添加节日」里补。" },
        { n: 4, title: "查看假期倒计时", body: "小日历会自动计算今天距离下一个法定假期还有几天，一眼可见，方便提前安排。下一个假期一过，会自动切换到再下一个。", tip: "倒计时跟随当前展示月份与内置假日数据实时更新。" },
        { n: 5, title: "个性化摆位", body: "在设置里调节透明度（30%–100%）、字号缩放（80%–160%）、是否使用系统字体、竖排 / 横排布局，以及是否开机自启、是否窗口置顶，把日历调成你顺眼的样子。", tip: "透明度调低一点，可以让它安静地浮在壁纸和窗口之间，不抢视线。" },
        { n: 6, title: "添加自己的节日与调休", body: "在「设置 → 添加节日」里按年份导入你关心的节日或单位调休，支持 2/5-2/13 这类区间与 1/31,2/14 这类逗号分隔写法，导入后会在月历上以徽章显示。", tip: "官方放假安排更新后，这里补一行就行，不必等软件发版。" },
      ],
      namingTitle: "设置与数据",
      naming: "小日历不生成输出文件：所有自定义节日、调休日期与个性化设置都保存在系统应用数据目录（Windows 在 %APPDATA%\\com.inkdot.calendar，macOS 在 ~/Library/Application Support/com.inkdot.calendar），不上传网络。",
      notes: [
        "农历与二十四节气基于开源历法库 tyme4ts 计算；法定假日内置 2026 / 2027 年（含调休上班日），2028 年及以后请在「设置 → 添加节日」手动导入，不必等软件更新。",
        "关闭窗口只是收进托盘，仍在后台运行；要完全退出请右键托盘图标选「退出小日历」。",
        "便携版解压即用、不写注册表；个性化设置单独存在应用数据目录，搬运时记得单独备份。",
      ],
    },
  },
];

export const liveApps = apps.filter((a) => a.status === "live");
export function getApp(id: string): App | undefined {
  return apps.find((a) => a.id === id);
}
