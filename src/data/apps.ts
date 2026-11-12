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
];

export const liveApps = apps.filter((a) => a.status === "live");
export function getApp(id: string): App | undefined {
  return apps.find((a) => a.id === id);
}
