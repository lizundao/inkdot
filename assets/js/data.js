/**
 * 墨点 inkdot · 工具数据
 * ------------------------------------------------------------------
 * 新增一款工具：复制下面对象，改字段即可。首页与「全部工具」页会
 * 自动读取本文件渲染，无需改动任何 HTML。
 *
 * status: "live"  已上架（显示下载按钮、可进详情页）
 *         "soon"  即将上线（首页显示占位卡，不给下载链接）
 * featured: true  在首页「精选」区以大卡展示
 */
(function () {
  "use strict";

  var RELEASE = "https://github.com/lizundao/pdf-toolbox/releases/download/v1.0.0/";

  window.INKDOT = window.INKDOT || {};

  window.INKDOT.site = {
    name: "墨点",
    en: "inkdot",
    slogan: "小工具，一点就够用",
    description: "墨点 inkdot 是离线、本地运行的桌面小工具集合。文件不出设备，即下即用。",
    url: "https://inkdot.cn",
    email: "277059707@qq.com",
    icp: "京ICP备17010528号-6",
    authorUrl: "https://lizundao.com",
    year: 2026
  };

  // 五条承诺（首页 Hero 右侧「放心用，不折腾」）
  window.INKDOT.promises = [
    { tag: "离线", text: "本地运行，断网也能用，不依赖云端" },
    { tag: "隐私", text: "数据不出设备，不收集、不上传、不追踪" },
    { tag: "轻巧", text: "解压即用，不写注册表，删文件夹即卸载" },
    { tag: "中文", text: "界面中文，符合国人使用习惯" },
    { tag: "开放", text: "依据 MIT 许可开放源码，当前版本自由使用" }
  ];

  window.INKDOT.apps = [
    {
      id: "pdf-toolbox",
      name: "PDF 工具箱",
      tagline: "压缩 · 合并 · 转换 · 水印 · 脱敏",
      summary: "压缩、合并、转换、水印、脱敏，PDF 全能本地处理。",
      description: "离线桌面 PDF 多功能工具，集成压缩、页面编辑、格式转换、水印版式、安全隐私、脱敏涂黑、扫描增强与预览。文件本地处理，不上传云端。",
      version: "1.0.0",
      updated: "2026-06-11",
      icon: "assets/img/pdf-toolbox-icon.png",
      cover: "assets/img/pdf-toolbox-cover.png",
      tags: ["PDF", "压缩", "合并", "水印", "脱敏", "格式转换"],
      featured: true,
      status: "live",
      url: "apps/pdf-toolbox/index.html",
      platforms: ["Windows", "macOS"],
      downloads: [
        { label: "Windows 便携版", os: "Windows", note: "解压即用 · 约 5 MB", url: RELEASE + "PDF-Toolbox-1.0.0-portable-win-x64.zip" },
        { label: "Windows 安装包", os: "Windows", note: "NSIS 安装 · 约 4 MB", url: RELEASE + "PDF-Toolbox-1.0.0-setup-win-x64.exe" },
        { label: "macOS（Apple 芯片）", os: "macOS", note: "dmg 镜像 · 约 5.5 MB", url: RELEASE + "PDF-Toolbox-1.0.0-aarch64.dmg" }
      ],
      // 详情页：核心特点
      features: [
        { k: "完全离线", v: "文件在本地处理，不上传云端（Office 转 PDF 会调用本机 Office）" },
        { k: "自由使用", v: "依据 MIT 许可开放，当前版本无需付费，无广告" },
        { k: "绿色便携", v: "便携版解压即用，不写注册表，删文件夹即卸载" },
        { k: "中文友好", v: "界面中文，水印支持系统字体（微软雅黑、宋体等）" },
        { k: "拖放操作", v: "各工具页支持将 PDF / 图片 / Office 文件拖入窗口" },
        { k: "智能输出", v: "自动建议输出路径：原文件名-功能名.pdf，与源文件同目录" }
      ],
      // 详情页：功能一览
      modules: [
        { k: "压缩", v: "结构流压缩，批量处理" },
        { k: "扫描增强", v: "内嵌图片 JPEG 重压缩、降分辨率、转灰度" },
        { k: "页面工具", v: "合并、拆分、提取、删除、旋转、重排、插入、裁剪、统一尺寸、去空白页" },
        { k: "格式转换", v: "图片↔PDF、PDF↔文本、Office→PDF、PDF 批量导出图片" },
        { k: "水印版式", v: "文字 / 图片水印、页眉页脚、页码" },
        { k: "安全隐私", v: "加密、解密、清除元数据" },
        { k: "脱敏涂黑", v: "预览框选敏感区域，输出涂黑 PDF" },
        { k: "预览信息", v: "内置预览、缩略图、元数据查看与编辑" }
      ],
      // 详情页：系统要求
      requirements: [
        { k: "操作系统", v: "Windows 10 / 11（64 位）；macOS Apple 芯片（aarch64）" },
        { k: "内存", v: "建议 4 GB 及以上" },
        { k: "磁盘空间", v: "约 50 MB" },
        { k: "Office 转 PDF", v: "需本机已安装 Microsoft Word / Excel / PowerPoint" },
        { k: "运行时", v: "Windows 需 WebView2 运行时（Win10/11 通常已预装）" }
      ],
      // 详情页：常见问题
      faq: [
        { q: "双击 exe 没反应？", a: "检查是否被杀毒软件拦截；尝试右键 → 以管理员身份运行；确认是 64 位 Windows。" },
        { q: "SmartScreen 提示「未知发布者」？", a: "软件尚未购买代码签名，属正常现象。点击「更多信息」→「仍要运行」即可。" },
        { q: "便携版如何卸载？", a: "直接删除解压文件夹即可，不会在系统中残留注册表项。" },
        { q: "处理失败，提示 PDF 损坏或无法打开？", a: "部分加密、扫描或结构异常的 PDF 可能不支持。可尝试先用浏览器或 Adobe Acrobat 打开并「另存为」再处理。" },
        { q: "输出文件在哪里？会覆盖原文件吗？", a: "默认与源文件同目录，文件名带功能后缀（如 报告-压缩.pdf），不会覆盖源文件，除非手动把输出路径设为与源文件相同。" },
        { q: "中文水印显示方块或乱码？", a: "在「水印版式 → 字体」选择微软雅黑、宋体等中文字体，不要留空。" },
        { q: "脱敏涂黑后还能复制出文字吗？", a: "涂黑层覆盖在内容上方，一般阅读看不到，但底层文字理论上仍可能被专业工具提取。高敏感场景建议配合「清除元数据」，或打印后再扫描。" },
        { q: "是否收费？有无联网上传？", a: "当前版本依据 MIT 许可自由使用。文件本地处理，无账号、无云上传（Office 转换调用本机 Office）。" }
      ]
    }

    // ↓ 后续工具：复制上面对象，改 status 为 "live" 即可自动上架
    // {
    //   id: "finance-toolbox",
    //   name: "财务工具箱",
    //   ...
    //   status: "soon"
    // }
  ];
})();
