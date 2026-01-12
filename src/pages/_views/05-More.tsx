import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import {
  viewIndex,
  readyToTouch,
} from "../../components/store/rootLayoutStore.ts";
import { directions } from "../../components/store/lineDecoratorStore";

// --- 类型定义 ---
interface AkCard {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  icon: React.ReactNode;
  desc?: string;
  onClick?: () => void;
}

// --- 数据配置 ---
// 这里使用了 Arknights 风格的图片和配色逻辑
const AK_CARDS: AkCard[] = [
  {
    id: "01",
    title: "在线体验",
    subtitle: "ONLINE EXPERIENCE",
    img: "/images/05-more/integrated_strategies.jpg",
    icon: (
      <img
        src="/images/05-more/icon-animation.png"
        alt="Online Experience"
        className="min-w-8 h-8"
      />
    ),
    onClick: () => (window.location.href = "/BDdraw_DEV/login"),
  },
  {
    id: "02",
    title: "代码仓库",
    subtitle: "REPOSITORY",
    img: "/images/05-more/reclamation_algorithm.jpg",
    icon: (
      <img
        src="/images/05-more/icon-reclamation_algorithm.png"
        alt="Repository"
        className="min-w-8 h-8"
      />
    ),
    onClick: () =>
      window.open("https://github.com/Zhongye1/BDdraw_DEV", "_blank"),
  },
  {
    id: "03",
    title: "相关文档",
    subtitle: "DOCUMENTATION",
    img: "/images/05-more/animation.jpg",
    icon: (
      <img
        src="/images/05-more/icon-integrated_strategies.png"
        alt="Documentation"
        className="min-w-8 h-8"
      />
    ),
    onClick: () =>
      window.open(
        "https://github.com/Zhongye1/BDdraw_DEV/tree/main/docs",
        "_blank"
      ),
  },
  {
    id: "04",
    title: "作者主页",
    subtitle: "AUTHOR PROFILE",
    img: "/images/05-more/terra_historicus.jpg",
    icon: (
      <img
        src="/images/05-more/icon-terra_historicus.png"
        alt="Author Profile"
        className="min-w-8 h-8"
      />
    ),
    onClick: () => window.open("https://github.com/Zhongye1", "_blank"),
  },
];

export default function More() {
  const $viewIndex = useStore(viewIndex);
  const $readyToTouch = useStore(readyToTouch);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isActive = $viewIndex === 5 && $readyToTouch;
    // 进入此页面时，通常禁用向下滚动，保留向上
    if (isActive)
      directions.set({ top: true, right: false, bottom: false, left: false });
    setActive(isActive);
  }, [$viewIndex, $readyToTouch]);

  return (
    <div
      className={`relative min-w-full h-full overflow-hidden bg-black transition-opacity duration-1000 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. 背景大水印文字 (MORE CONTENT) */}
      <div className="absolute bottom-[-2%] left-[-2%] z-0 select-none font-black text-[14vw] leading-none text-white/[0.04] tracking-tighter whitespace-nowrap pointer-events-none">
        MORE CONTENT
      </div>

      {/* 2. 右下角页码装饰 (参考图右下角) */}
      <div className="absolute bottom-8 right-10 z-20 flex flex-col items-end pointer-events-none">
        <div className="flex items-baseline gap-2">
          <span className="text-cyan-400 text-6xl font-black tracking-tighter">
            05
          </span>
          <span className="text-white/40 text-xl font-bold tracking-widest">
            / 05
          </span>
        </div>
        <div className="text-white text-xs tracking-[0.4em] font-bold mt-1">
          MORE
        </div>
      </div>

      {/* 3.主要内容区域 - 手风琴布局 */}
      <div className="relative z-10 flex min-w-full h-full">
        {AK_CARDS.map((card, index) => (
          <div
            key={card.id}
            onClick={card.onClick}
            className={`
              group relative h-full border-r border-white/10 cursor-pointer overflow-hidden
              transition-[flex-grow,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
              ${
                // 激活状态下：初始 flex-1，hover 时 flex-[1.7] (变宽)，其他非 hover 元素会自动被挤压
                // 未激活状态下：flex-0 (收起)
                active ? "flex-1 hover:flex-[1]" : "flex-[0]"
              }
            `}
          >
            {/* --- 背景图片层 --- */}
            <div className="absolute inset-0 z-0">
              {/* 图片：默认灰度+变暗，Hover时恢复色彩+放大 */}
              <div className="min-w-full h-full bg-black">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-50 transition-all duration-1000 
                             group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
              {/* 渐变遮罩：底部黑色渐变，保证文字清晰 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

              {/* 激活时的蓝色覆盖层 (可选 Arknights 风格装饰) */}
              <div className="absolute inset-0 bg-cyan-900/0 transition-colors duration-500 group-hover:bg-cyan-900/20 mix-blend-overlay" />
            </div>

            {/* --- 内容层 (底部对齐) --- */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 pb-24 md:p-12 md:pb-32">
              {/* 图标 (参考图中的菱形/Logo) */}
              <div className="mb-6 transform translate-y-4 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="w-16 h-16 flex items-center justify-center text-white text-4xl">
                  {/* 给图标加个简单的 Arknights 风格底座或阴影 */}
                  <div className="relative">
                    {/* 装饰性菱形背景 */}
                    <div className="absolute inset-0 bg-white/10 rotate-45 scale-75 backdrop-blur-sm group-hover:bg-cyan-400/20 transition-colors" />
                    <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {card.icon}
                    </span>
                  </div>
                </div>
              </div>

              {/* 标题 */}
              <h3 className="text-white text-4xl md:text-5xl font-black tracking-wider mb-2 drop-shadow-md">
                {card.title}
              </h3>

              {/* 英文副标题 */}
              <div className="text-white/60 text-sm font-mono font-bold tracking-[0.2em] mb-8 group-hover:text-cyan-400 transition-colors duration-300">
                {card.subtitle}
              </div>

              {/* View More 按钮区 */}
              <div className="flex flex-col gap-1 overflow-hidden">
                <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-widest group-hover:text-white transition-colors">
                  <span className="h-[2px] w-8 bg-white/50 group-hover:w-12 group-hover:bg-cyan-400 transition-all duration-500" />
                  <span>VIEW MORE</span>
                </div>
                {/* 英文描述 (可选) */}
                <div className="text-[10px] text-white/30 tracking-wider transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  CLICK TO NAVIGATE
                </div>
              </div>
            </div>

            {/* 顶部序号 (可选装饰) */}
            <div className="absolute top-10 left-10 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <span className="text-6xl font-black text-white/5 select-none">
                {card.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
