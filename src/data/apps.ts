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
    naming: string;
    notes: string[];
  };
};

const PDF_RELEASE = "https://github.com/lizundao/pdf-toolbox/releases/download/v1.0.0/";
const IMG_RELEASE = "https://github.com/lizundao/image-processor/releases/download/v1.0.0/";

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
      { label: "百度网盘（备用）", os: "网盘", note: "含全部 4 个文件 · 点击直达免输码 · 永久有效", url: "https://pan.baidu.com/s/1_BSgdShljYNtmQowzeCw8w?pwd=zky6", code: "zky6", external: true },
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
      { label: "百度网盘（备用）", os: "网盘", note: "含全部 4 个文件 · 点击直达免输码 · 永久有效", url: "https://pan.baidu.com/s/1-KMz_BdD8bVwuAsdcAjcGw?pwd=pjbc", code: "pjbc", external: true },
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
];

export const liveApps = apps.filter((a) => a.status === "live");
export function getApp(id: string): App | undefined {
  return apps.find((a) => a.id === id);
}
