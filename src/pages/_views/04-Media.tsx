import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import {
  viewIndex,
  readyToTouch,
} from "../../components/store/rootLayoutStore.ts";
import { directions } from "../../components/store/lineDecoratorStore";

// 定义子分类类型
type Category = "monster_siren" | "gallery" | "operator" | "video";

interface CategoryData {
  id: Category;
  en: string;
  cn: string;
  logo: string;
  activeImg: string;
  desc: string;
}

const CATEGORIES: CategoryData[] = [
  {
    id: "monster_siren",
    en: "MONSTER SIREN",
    cn: "塞壬唱片",
    logo: "/images/04-media/logo_monster_siren.27beba82.png",
    activeImg: "/images/04-media/monster_siren_active.8f01230d.png",
    desc: "一个已知或未知的世界\nHTTPS://AK.HYPERGRYPH.COM/",
  },
  {
    id: "gallery",
    en: "GALLERY",
    cn: "插画珍藏",
    logo: "/images/04-media/logo_gallery.08a04a01.png",
    activeImg: "/images/04-media/gallery_active.d45cfc72.png",
    desc: "记录大地上的点滴瞬间",
  },
  {
    id: "operator",
    en: "OPERATOR",
    cn: "干员档案",
    logo: "/images/04-media/logo_operator.c6543e50.png",
    activeImg: "/images/04-media/operator_active.d697ef2d.png",
    desc: "罗德岛核心干员机密资料",
  },
  {
    id: "video",
    en: "VIDEO",
    cn: "影像资料",
    logo: "/images/04-media/logo_video.c1de0303.png",
    activeImg: "/images/04-media/video_active.693c91f3.png",
    desc: "泰拉世界的活动影像记录",
  },
];

export default function Media() {
  const $viewIndex = useStore(viewIndex);
  const $readyToTouch = useStore(readyToTouch);
  const [active, setActive] = useState(false);
  const [currentCat, setCurrentCat] = useState<Category>("monster_siren");

  useEffect(() => {
    const isActive = $viewIndex === 4 && $readyToTouch;
    if (isActive)
      directions.set({ top: false, right: true, bottom: true, left: false });
    setActive(isActive);
  }, [$viewIndex, $readyToTouch]);

  const activeData = CATEGORIES.find((c) => c.id === currentCat)!;

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-black transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
      style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* 背景大水印文字 */}
      <div className="absolute bottom-10 left-10 text-[180px] font-black text-white/5 leading-none select-none pointer-events-none">
        ABOUT TERRA
      </div>

      {/* 左侧侧边导航 */}
      <div className="absolute top-1/4 left-16 z-20">
        <h2 className="text-white text-xl font-bold mb-6 tracking-tighter">
          ABOUT TERRA
        </h2>
        <div className="flex flex-col gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center group cursor-pointer"
              onClick={() => setCurrentCat(cat.id)}
            >
              <div
                className={`w-3 h-3 border border-white/50 mr-3 flex items-center justify-center transition-all ${currentCat === cat.id ? "bg-white" : ""}`}
              >
                {currentCat === cat.id && <div className="w-1 h-1 bg-black" />}
              </div>
              <span
                className={`text-xs tracking-widest transition-colors ${currentCat === cat.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}
              >
                {cat.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 中央核心视觉区 (等轴3D场景) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[1000px] h-[600px]">
          {/* 基础桌子贴图 */}
          <img
            src="/images/04-media/about_terra.44839d14.png"
            className="absolute inset-0 w-full h-full object-contain opacity-80"
            alt="base"
          />

          {/* 动态高光层 - 根据选择切换显示的部件 */}
          <div className="absolute inset-0 transition-all duration-700">
            {CATEGORIES.map((cat) => (
              <img
                key={cat.id}
                src={cat.activeImg}
                className={`absolute z-30 inset-0 w-full h-full object-contain transition-opacity duration-500 ${currentCat === cat.id ? "opacity-100" : "opacity-0"}`}
                alt={cat.id}
              />
            ))}
          </div>
          {/* 浮动的Logo标识 */}
          <div className="absolute inset-0 transition-all duration-700">
            {CATEGORIES.map((cat) => (
              <img
                key={cat.id}
                src={cat.logo}
                className={`absolute z-40 inset-0 w-full h-full object-contain transition-opacity duration-500 ${currentCat === cat.id ? "opacity-100" : "opacity-0"}`}
                alt={cat.id}
              />
            ))}
          </div>

          {/* 框(Monster Siren) */}
          <div
            className={`${currentCat === "monster_siren" ? "opacity-100 scale-100" : "opacity-0 scale-110"} transition-all duration-500 ease-in-out origin-center absolute inset-0 `}
          >
            <div>
              <div
                className="absolute top-[37%] left-[18%] w-[100px] h-[100px] bg-ark-blue z-10"
                style={{
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
                }}
              />
              <div
                className="absolute top-[43%] left-[20%] w-[140px] h-[140px] border-8 border-white z-20"
                style={{
                  boxShadow: `
                    12px 16px 32px rgba(0, 0, 0, 0.65),
                     6px  8px 20px rgba(0, 0, 0, 0.45),
                     3px  4px 12px rgba(0, 0, 0, 0.30),
                    -2px -2px 16px rgba(60, 180, 220, 0.18)
                  `,
                  transition:
                    "all 700ms ease-in-out, box-shadow 800ms ease-out",
                }}
              />
            </div>
          </div>

          {/* 框(Gallery) */}
          <div
            className={`${currentCat === "gallery" ? "opacity-100 scale-100" : "opacity-0 scale-110"} transition-all duration-500 ease-in-out origin-center absolute inset-0 `}
          >
            <div>
              <div
                className="absolute top-[0%] left-[25%] w-[130px] h-[130px] bg-ark-blue"
                style={{
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
                }}
              />
              <div
                className="absolute top-[10%] left-[32%] w-[140px] h-[140px] border-8 border-white"
                style={{
                  boxShadow: `
                    12px 16px 32px rgba(0, 0, 0, 0.65),
                     6px  8px 20px rgba(0, 0, 0, 0.45),
                     3px  4px 12px rgba(0, 0, 0, 0.30),
                    -2px -2px 16px rgba(60, 180, 220, 0.18)
                  `,
                  transition:
                    "all 700ms ease-in-out, box-shadow 800ms ease-out",
                }}
              />
            </div>
          </div>

          {/* 框(Operator) */}
          <div
            className={`${currentCat === "operator" ? "opacity-100 scale-100" : "opacity-0 scale-110"} transition-all duration-500 ease-in-out origin-center absolute inset-0 `}
          >
            <div>
              <div
                className="absolute top-[17%] left-[67%] w-[100px] h-[100px] bg-ark-blue"
                style={{
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
                }}
              />
              <div
                className="absolute top-[22%] left-[70%] w-[160px] h-[140px] border-8 border-white"
                style={{
                  boxShadow: `
                    12px 16px 32px rgba(0, 0, 0, 0.65),
                     6px  8px 20px rgba(0, 0, 0, 0.45),
                     3px  4px 12px rgba(0, 0, 0, 0.30),
                    -2px -2px 16px rgba(60, 180, 220, 0.18)
                  `,
                  transition:
                    "all 700ms ease-in-out, box-shadow 800ms ease-out",
                }}
              />
            </div>
          </div>

          {/* 框(Video) */}
          <div
            className={`${currentCat === "video" ? "opacity-100 scale-100" : "opacity-0 scale-110"} transition-all duration-500 ease-in-out origin-center absolute inset-0 `}
          >
            <div>
              <div
                className="absolute top-[62%] left-[57%] w-[100px] h-[100px] bg-ark-blue"
                style={{
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
                }}
              />
              <div
                className="absolute top-[67%] left-[60%] w-[180px] h-[180px] border-8 border-white"
                style={{
                  boxShadow: `
                    12px 16px 32px rgba(0, 0, 0, 0.65),
                     6px  8px 20px rgba(0, 0, 0, 0.45),
                     3px  4px 12px rgba(0, 0, 0, 0.30),
                    -2px -2px 16px rgba(60, 180, 220, 0.18)
                  `,
                  transition:
                    "all 700ms ease-in-out, box-shadow 800ms ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 左下角详情介绍 */}
      <div className="absolute bottom-24 left-16 z-20 max-w-md">
        <h1 className="text-white text-5xl font-bold tracking-tighter uppercase">
          {activeData.en}
        </h1>
        <div className="flex items-end gap-4 mt-2 mb-8">
          <h2 className="text-white text-7xl font-bold">{activeData.cn}</h2>
          <div className="h-1 w-24 bg-cyan-400 mb-4" />
        </div>

        <p className="text-gray-400 text-xs tracking-widest whitespace-pre-line leading-loose">
          {activeData.desc}
        </p>

        <button className="mt-10 group flex items-center bg-cyan-400 hover:bg-white transition-colors px-1 py-1 pr-12">
          <div className="bg-black text-cyan-400 p-2 text-[10px] font-bold">
            查看详情
            <br />
            READ MORE
          </div>
          <div className="ml-4 text-black group-hover:translate-x-2 transition-transform">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>

      {/* 右侧装饰性元素 */}
      {/* <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-cyan-400 text-6xl font-bold">04</span>
          <span className="text-white/40 text-2xl">/ 05</span>
        </div>
        <div className="text-white text-xs tracking-[0.3em] font-light">
          ABOUT TERRA
        </div>
      </div> */}
    </div>
  );
}
