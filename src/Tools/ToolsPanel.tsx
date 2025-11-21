import { useState, useMemo } from "react";
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

export default function ToolsPanel({ courseId, lessonId, onOpenChange }: ToolsPanelProps) {
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

  const courseMap: Record<string, keyof typeof toolsData> = {
    course_1: "qaqc",
    course_2: "clinicalresearch",
    course_3: "pharmacovigilance",
    course_4: "cdm",
    course_5: "regulatory",
    course_6: "medicalaffairs",
  };

  const courseKey = courseMap[courseId] || "qaqc";

  const courseTools = toolsData[courseKey].map((tool) => ({
    ...tool,
    url: tool.link,
    icon:
      typeof tool.icon === "string" && tool.icon.startsWith("http")
        ? <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
        : <span className="text-3xl">{tool.icon}</span>,
  }));

  const sharedTools = toolsData.shared.map((tool) => ({
    ...tool,
    url: tool.link,
    icon:
      typeof tool.icon === "string" && tool.icon.startsWith("http")
        ? <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
        : <span className="text-3xl">{tool.icon}</span>,
  }));

  const allTools = [...courseTools, ...sharedTools];

  const memoizedTools = useMemo(() => allTools, [courseId]);

  const parseLesson = (id: string) => {
    if (!id) return [0, 0, 0];
    const parts = id.trim().split("_").slice(1).map((p) => Number(p));
    return parts.every((n) => !isNaN(n)) ? parts : [0, 0, 0];
  };

  const isToolUnlocked = (tool: ToolItem) => {
    if (!tool.unlockLessonId) return true;
    if (!lessonId) return false;

    const getCourse = (id: string) => Number(id.split("_")[1]);

    const lessonCourse = getCourse(lessonId);
    const toolCourse = getCourse(tool.unlockLessonId);

    if (lessonCourse !== toolCourse) return false;

    const a = parseLesson(lessonId);
    const b = parseLesson(tool.unlockLessonId);

    for (let i = 0; i < a.length; i++) {
      if (a[i] > b[i]) return true;
      if (a[i] < b[i]) return false;
    }
    return true;
  };

  const getChapterNumber = (unlockLessonId?: string) => {
    if (!unlockLessonId) return "";
    return unlockLessonId.split("_")[2] || "";
  };

  const getToolPosition = (index: number, progress: number) => {
    const total = memoizedTools.length;
    const angle = (index / total) * 360;
    const radius = 180 * (progress / 100);
    return {
      x: Math.cos((angle * Math.PI) / 180) * radius,
      y: Math.sin((angle * Math.PI) / 180) * radius,
      delay: index * 50,
      scale: progress / 100,
      opacity: Math.min(progress / 100, 1),
    };
  };

  return (
    <>
      <div className="fixed right-6 z-[60]" style={{ top: "82px" }}>
        <button
          onClick={toggleOpen}
          className="bg-white text-primary-foreground p-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img src="https://img.icons8.com/ios-filled/50/work.png" alt="Tools Icon" className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="relative w-[500px] h-[500px]" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full flex items-center justify-center">

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
                  className="relative w-full h-full transition-transform duration-400"
                  style={{
                    transform: hoveredTool ? "rotateY(180deg)" : "rotateY(0deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute w-full h-full rounded-full bg-gradient-to-b from-background/95 to-primary/5 flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-5xl text-primary font-bold">Ω</span>
                  </div>

                  <div
                    className="absolute w-full h-full rounded-full bg-gradient-to-b from-background/95 to-primary/5 flex flex-col items-center justify-center p-3 scale-[0.8]"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
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

                        {!isToolUnlocked(hoveredTool) && (
                          <p className="mt-1 text-[9px] text-red-600 font-medium">
                            Unlocks at Chapter {getChapterNumber(hoveredTool.unlockLessonId)}
                          </p>
                        )}

                        <p className="text-[10px] text-muted-foreground leading-snug px-2">
                          {hoveredTool.description || "No description available."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {memoizedTools.map((tool, index) => {
                const pos = getToolPosition(index, animationProgress);
                const unlocked = isToolUnlocked(tool);

                return (
                  <a
                    key={tool.name}
                    href={unlocked ? tool.url : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute flex items-center justify-center w-16 h-16 rounded-full ${
                      unlocked ? "shadow-lg hover:scale-105" : "opacity-60 cursor-not-allowed"
                    }`}
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                      opacity: pos.opacity,
                      transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1) ${pos.delay}ms`,
                    }}
                    onClick={(e) => !unlocked && e.preventDefault()}
                    onMouseEnter={() => setHoveredTool(tool)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    {tool.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}