import svgPaths from "./svg-8662lavej6";
import imgToolNameHeader from "figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png";

function FileText() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <path d={svgPaths.p64a9000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10.4 11H5.6" id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          <path d="M10.4 8.6H5.6" id="Icon_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          <path d="M6.8 6.2H6.2H5.6" id="Icon_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          <path d="M9.2 2V5.6H12.8" id="Icon_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="backdrop-blur-[10px] backdrop-filter bg-[rgba(255,255,255,0.1)] h-[28px] relative rounded-[8px] shrink-0 w-[147px]" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[24px] py-[16px] relative w-[147px]">
          <FileText />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[-0.28px] whitespace-pre">{`{CategoryName}`}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start not-italic relative shrink-0 text-center text-white w-full">
      <p className="leading-[1.25] relative shrink-0 text-[48px] tracking-[-1.44px] w-full">Inches to Meters Converter (in to m)</p>
      <p className="leading-[1.5] relative shrink-0 text-[16px] tracking-[-0.32px] w-full">Convert in to m instantly with charts, formulas, and height examples.</p>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Text">
      <Badge />
      <Frame />
    </div>
  );
}

export default function ToolNameHeader() {
  return (
    <div className="relative rounded-[32px] shadow-[0px_4px_8px_-1px_rgba(13,13,18,0.02)] size-full" data-name="ToolNameHeader">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
        <div className="absolute bg-white inset-0 rounded-[32px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[32px]">
          <img alt="" className="absolute h-[113.05%] left-0 max-w-none top-0 w-full" src={imgToolNameHeader} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[80px] items-center justify-center overflow-clip px-[104px] py-[56px] relative size-full">
          <Text />
        </div>
      </div>
    </div>
  );
}