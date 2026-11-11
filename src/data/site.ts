/**
 * 墨点 inkdot · 站点级配置
 * ------------------------------------------------------------------
 * 页头、页脚、备案、联系方式等全站公共信息集中在此。
 * 改这里 → 所有页面同步更新（由 BaseLayout 统一渲染）。
 */
export const site = {
  name: "墨点",
  en: "inkdot",
  slogan: "小工具，一点就够用",
  description: "墨点 inkdot 是离线、本地运行的桌面小工具集合。文件不出设备，即下即用。",
  url: "https://inkdot.cn",
  email: "277059707@qq.com",
  icp: "京ICP备17010528号-6",
  icpUrl: "https://beian.miit.gov.cn",
  authorUrl: "https://lizundao.com",
  year: 2026,
};

/** 首页 Hero 右侧「放心用，不折腾」五条承诺 */
export const promises = [
  { tag: "离线", text: "本地运行，断网也能用，不依赖云端" },
  { tag: "隐私", text: "数据不出设备，不收集、不上传、不追踪" },
  { tag: "轻巧", text: "解压即用，不写注册表，删文件夹即卸载" },
  { tag: "中文", text: "界面中文，符合国人使用习惯" },
  { tag: "开放", text: "依据 MIT 许可开放源码，当前版本自由使用" },
];

/** 打赏区块（详情页与教程页显示）。二维码图片放 public/assets/img/ 下。 */
export const donate = {
  enabled: true,
  title: "觉得好用，请我喝杯茶",
  note: "你的支持，是我继续打磨小工具的动力。",
  // 收款码就绪后，把图片命名为 donate-qr.png 放到 public/assets/img/，
  // 再把下面的 qrReady 改为 true，全站详情页/教程页即自动显示真实二维码。
  qrReady: false,
  qrImage: "/assets/img/donate-qr.png",
  // 没有二维码或作为补充的文字链接（爱发电 / 个人页等）
  linkText: "其他支持方式",
  linkUrl: "https://lizundao.com",
};
