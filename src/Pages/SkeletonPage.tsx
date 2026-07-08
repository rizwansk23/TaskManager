import React from "react";

const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#1e2130 25%,#262b3d 50%,#1e2130 75%)",
  backgroundSize: "1200px 100%",
  animation: "shimmer 1.6s infinite linear",
  borderRadius: 6,
};

// Tiny helper so JSX stays clean
const Sk: React.FC<{ w?: number | string; h?: number; r?: number; style?: React.CSSProperties }> = ({
  w = "100%", h = 12, r = 6, style,
}) => (
  <div style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...shimmerStyle, ...style }} />
);

// // ── Sidebar skeleton ──────────────────────────────────────────────────────────
// const SidebarSkeleton: React.FC = () => (
//   <aside className="w-[220px] shrink-0 bg-[#13151a] border-r border-white/[0.07] flex flex-col">
//     {/* Brand */}
//     <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.07]">
//       <Sk w={34} h={34} r={10} />
//       <Sk w={70} h={16} />
//     </div>

//     {/* Project list */}
//     <div className="px-3 py-4 flex-1">
//       <Sk w={60} h={10} style={{ marginBottom: 14 }} />

//       {/* Active project row */}
//       <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e2130] mb-1">
//         <Sk w={8} h={8} r={99} />
//         <Sk w={50} h={12} />
//         <div className="flex-1" />
//         <Sk w={14} h={12} r={3} />
//         <Sk w={14} h={12} r={3} />
//       </div>

//       {/* Other rows */}
//       {[40, 36].map((w, i) => (
//         <div key={i} className="flex items-center gap-2 px-3 py-2 mb-1">
//           <Sk w={8} h={8} r={99} />
//           <Sk w={w} h={12} />
//           <div className="flex-1" />
//           <Sk w={14} h={12} r={3} />
//           <Sk w={14} h={12} r={3} />
//         </div>
//       ))}
//     </div>
//   </aside>
// );

// ── Task row skeleton ─────────────────────────────────────────────────────────
const TaskRowSk: React.FC<{ nameW: string }> = ({ nameW }) => (
  <div className="flex items-center gap-3 px-3 py-2.25 rounded-xl mb-1">
    <Sk w={8}  h={8}  r={99} />
    <Sk w={16} h={16} r={4}  />
    <Sk w={nameW} h={12} />
    <div className="flex-1" />
    <Sk w={44} h={11} />
  </div>
);

// ── Section header skeleton ───────────────────────────────────────────────────
const SectionHeaderSk: React.FC<{ titleW: number }> = ({ titleW }) => (
  <div className="flex items-center gap-2 mb-2 mt-1">
    <Sk w={titleW} h={13} />
    <Sk w={22} h={22} r={99} />
    <div className="flex-1 h-px" style={{ ...shimmerStyle, height: 1 }} />
  </div>
);

// ── Main content skeleton ─────────────────────────────────────────────────────
export const MainSkeleton: React.FC = () => (
  <div className="flex-1 bg-[#0f1117] flex flex-col overflow-hidden w-full">
    {/* Topbar */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
      <Sk w={80} h={22} />
      <Sk w={110} h={32} r={8} />
    </div>

    {/* Search */}
    <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.07]">
      <Sk h={34} r={8} />
      <Sk w={22} h={18} r={3} style={{ flexShrink: 0 }} />
    </div>

    {/* Sections */}
    <div className="px-5 py-4 overflow-y-auto flex-1">
      {/* To Do */}
      <SectionHeaderSk titleW={55} />
      <TaskRowSk nameW="38%" />
      <TaskRowSk nameW="52%" />

      <div className="h-4" />

      {/* In Progress */}
      <SectionHeaderSk titleW={74} />
      <TaskRowSk nameW="30%" />

      <div className="h-4" />

      {/* Done */}
      <SectionHeaderSk titleW={38} />
      <TaskRowSk nameW="22%" />
    </div>
  </div>
);

// ── Full page skeleton — drop this where your MainPage renders ────────────────
const SkeletonPage: React.FC = () => {
  return (
    <>
      {/* Keyframe injection (only once) */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0 }
          100% { background-position:  600px 0 }
        }
      `}</style>

      <div className="flex w-full h-screen overflow-hidden bg-[#0f1117]">
        {/* <SidebarSkeleton /> */}
        <MainSkeleton />
      </div>
    </>
  );
};

export default SkeletonPage;
