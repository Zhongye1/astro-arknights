// src/pages/_views/components/Footer.tsx
export default function Footer() {
  return (
    <div className="w-full h-[400px] bg-[#181818] text-[#8a8a8a] flex flex-col justify-center items-center relative z-10 border-t border-[#333]">
      {/* 顶部链接区 */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs font-bold tracking-wider text-white mb-8">
        <a href="#" className="hover:text-ark-blue transition-colors">
          个人信息保护政策
        </a>
        <span className="text-[#333]">|</span>
        <a href="#" className="hover:text-ark-blue transition-colors">
          儿童个人信息保护政策
        </a>
        <span className="text-[#333]">|</span>
        <a href="#" className="hover:text-ark-blue transition-colors">
          使用许可及服务协议
        </a>
        <span className="text-[#333]">|</span>
        <a href="#" className="hover:text-ark-blue transition-colors">
          应用权限
        </a>
        <span className="text-[#333]">|</span>
        <a href="#" className="hover:text-ark-blue transition-colors">
          家长监护
        </a>
        <span className="text-[#333]">|</span>
        <a href="#" className="hover:text-ark-blue transition-colors">
          客服中心
        </a>
      </div>

      {/* 备案号区域 */}
      <div className="flex flex-col md:flex-row gap-8 text-[10px] md:text-xs leading-loose mb-8">
        <div className="flex flex-col gap-1">
          <p>沪ICP备17022476号-1</p>
          <p>ISBN 978-7-498-05646-7</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>沪网文〔2022〕0241-018号</p>
          <p>沪公网安备 31010402005145号</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>国新出审〔2019〕49号</p>
        </div>
      </div>

      {/* 提醒文字 */}
      <div className="text-[10px] text-[#666] mb-8 text-center px-4">
        <p>
          亲爱的市民朋友，上海警方反诈劝阻电话"962110"系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听。
        </p>
      </div>

      <div className="w-[80%] h-px bg-[#333] mb-8" />

      {/* 底部 Logo 和版权 */}
      <div className="flex flex-col md:flex-row items-center justify-between w-[80%] gap-8">
        <div className="flex items-center gap-4">
          {/* 这里的Logo换成你项目里的图片 */}
          <div className="text-white font-black text-xl italic">HYPERGRYPH</div>
          <div className="text-white font-thin text-xl">STUDIO MONTAGNE</div>
        </div>

        <div className="text-[10px] text-[#666] flex flex-col md:items-end">
          <p>开发者：上海鹰角网络科技有限公司</p>
          <p>当前版本：2.6.91 更新时间：2026/01/09</p>
          <p>
            Copyright © 2017 - 2026 上海鹰角网络科技有限公司
            客服电话：021-64399377
          </p>
        </div>
      </div>
    </div>
  );
}
