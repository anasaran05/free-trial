import { useState, useEffect } from "react";
import { toolsData } from "@/components/data/toolsdata";

interface ToolItem {
  name: string;
  icon: string | JSX.Element;
  url: string;
  unlockLessonId?: string;
  description?: string;
}

interface ToolsPanelProps {
  courseId?: string;
  lessonId?: string;
  onOpenChange?: (open: boolean) => void;
}

export default function ToolsPanel({ courseId = "course_1", lessonId, onOpenChange }: ToolsPanelProps) {
  const [open, setOpen] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<ToolItem | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const toggleOpen = () => {
    if (!open) {
      setOpen(true);
      setAnimationProgress(0);
      setTimeout(() => setAnimationProgress(100), 10);
    } else {
      setAnimationProgress(0);
      setTimeout(() => {
        setOpen(false);
        setHoveredTool(null);
      }, 350);
    }
    onOpenChange?.(!open);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) toggleOpen();
  };

  // Course mapping to tool sets
  const courseMap: Record<string, keyof typeof toolsData> = {
    course_1: "qaqc",
    course_2: "pharmacovigilance",
    course_3: "clinicalresearch",
    course_4: "regulatory",
    course_5: "medicalaffairs",
    course_6: "cdm",
  };

  // Determine which tools to show
  const courseKey = courseMap[courseId] || "qaqc";

  const courseTools: ToolItem[] = toolsData[courseKey]?.map((tool) => ({
    ...tool,
    url: tool.link,
    icon:
      typeof tool.icon === "string" && tool.icon.startsWith("http") ? (
        <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
      ) : (
        <span className="text-3xl">{tool.icon}</span>
      ),
  })) || [];

  const sharedTools: ToolItem[] = toolsData.shared.map((tool) => ({
    ...tool,
    url: tool.link,
    icon:
      typeof tool.icon === "string" && tool.icon.startsWith("http") ? (
        <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
      ) : (
        <span className="text-3xl">{tool.icon}</span>
      ),
  }));

  const allTools: ToolItem[] = [...courseTools, ...sharedTools];

  // Unlock logic
  const isToolUnlocked = (tool: ToolItem) => {
    if (!tool.unlockLessonId) return true;
    if (!lessonId) return false;
    return lessonId >= tool.unlockLessonId;
  };

  const getChapterNumber = (unlockLessonId?: string) => {
    if (!unlockLessonId) return "";
    const parts = unlockLessonId.split("_");
    return parts[2] || "";
  };

  const getToolPosition = (index: number, progress: number) => {
    const totalTools = allTools.length;
    const angle = (index / totalTools) * 360;
    const baseRadius = 180;
    const animatedRadius = baseRadius * (progress / 100);
    const x = Math.cos((angle * Math.PI) / 180) * animatedRadius;
    const y = Math.sin((angle * Math.PI) / 180) * animatedRadius;
    const delay = index * 50;
    return { x, y, delay, scale: progress / 100, opacity: Math.min(progress / 100, 1) };
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed right-6 z-[60]" style={{ top: "82px" }}>
        <button
          onClick={toggleOpen}
          className="bg-white text-primary-foreground p-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/work.png"
            alt="Tools Icon"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Tools Panel */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleBackdropClick}
        >
          <div
            className="relative w-[500px] h-[500px] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Radial Menu */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Center Flip */}
              <div
                className="absolute w-[220px] h-[220px] rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  perspective: "1000px",
                }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    transform: hoveredTool ? "rotateY(180deg)" : "rotateY(0deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full rounded-full bg-gradient-to-b from-background/95 to-primary/5 shadow-2xl border border-primary/30 backdrop-blur-lg flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-5xl text-primary font-bold">Ω</span>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute w-full h-full rounded-full bg-gradient-to-b from-background/95 to-primary/5 shadow-2xl border border-primary/30 backdrop-blur-lg flex flex-col items-center justify-center p-3 scale-[0.8]"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {hoveredTool && (
                      <div className="flex flex-col items-center text-center space-y-1">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                          {hoveredTool.icon}
                        </div>
                        <h3 className="text-sm font-semibold text-white">{hoveredTool.name}</h3>
                        <div
                          className={`px-2 py-[2px] rounded-full text-[9px] font-medium ${
                            isToolUnlocked(hoveredTool)
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isToolUnlocked(hoveredTool) ? "Unlocked" : "Locked"}
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-snug px-2">
                          {hoveredTool.description || "No description available."}
                        </p>
                        {!isToolUnlocked(hoveredTool) && (
                          <p className="mt-1 text-[9px] text-red-600 font-medium">
                            🔒 Unlocks at Chapter {getChapterNumber(hoveredTool.unlockLessonId)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tools */}
              {allTools.map((tool, index) => {
                const { x, y, delay, scale, opacity } = getToolPosition(index, animationProgress);
                const unlocked = isToolUnlocked(tool);

                return (
                  <a
                    key={tool.name}
                    href={unlocked ? tool.url : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute flex items-center justify-center w-16 h-16 rounded-full ${
                      unlocked
                        ? "hover:from-primary-dark hover:to-primary shadow-lg"
                        : "opacity-60 cursor-not-allowed"
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px) scale(${scale})`,
                      opacity,
                      transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                    }}
                    onClick={(e) => !unlocked && e.preventDefault()}
                    onMouseEnter={() => setHoveredTool(tool)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <div className="flex items-center justify-center">{tool.icon}</div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </>
  );
}
