'use client';

import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchTasks, organizeTasks, findTask, Task } from "@/lib/csv";
import { getCourseBySlug } from '@/lib/csv';
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import { GlowButton } from "@/components/Button";

import { ChevronRight, CheckCircle, FileText } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CSV_URL =
  import.meta.env.VITE_CSV_URL ||
  "https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv";

export default function SimulationTaskPage() {
  // Now using courseSlug instead of courseId
  const { courseSlug, chapterId, taskId } = useParams<{
    courseSlug: string;
    chapterId: string;
    taskId: string;
  }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);

  // Resolve courseId from slug (needed for findTask)
  const course = useMemo(() => {
    if (!courseSlug) return null;
    return getCourseBySlug(courseSlug);
  }, [courseSlug]);

  const courseId = course?.id;

  useEffect(() => {
    if (courseId) {
      loadTask();
    }
  }, [courseId, chapterId, taskId]);

  const loadTask = async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      setError(null);

      const rows = await fetchTasks(CSV_URL);
      const structured = organizeTasks(rows);

      const found = findTask(structured, courseId, chapterId!, taskId!);

      if (!found) {
        setError("Task not found");
        return;
      }

      setTask(found);
    } catch (err) {
      console.error(err);
      setError("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  // Scenario text
  const scenarioText = task?.scenario || "";

  // Reference text from first PDF field
  const referenceText = task?.resources?.pdfs?.[0] || "";

  // Options parsed from forms[0]
  const options = useMemo(() => {
    if (!task?.resources?.forms?.[0]) return [];

    const block = task.resources.forms[0];

    const result: { key: string; title: string; content: string }[] = [];

    const chunks = block.split(/Option\s+/i).filter(Boolean);

    chunks.forEach((chunk) => {
      const key = chunk.trim().charAt(0).toUpperCase(); // A / B / C
      const rest = chunk.substring(1).trim();

      const titleLine = rest.split("\n")[0].trim();
      const content = rest.replace(titleLine, "").trim();

      result.push({
        key,
        title: `Option ${key} – ${titleLine}`,
        content,
      });
    });

    return result;
  }, [task]);

  // Outcomes parsed from answerKey
  const outcomes = useMemo(() => {
    if (!task?.resources?.answerKey) return {};

    const text = task.resources.answerKey;

    const out: Record<string, string> = {};

    ["A", "B", "C"].forEach((key) => {
      const regex = new RegExp(`If you chose ${key}[\\s\\S]*?(?=If you chose [ABC]|$)`, "i");
      const match = text.match(regex);
      if (match) out[key] = match[0].trim();
    });

    return out;
  }, [task]);

  const confirmChoice = () => {
    if (!selectedOption) return;
    setShowOutcome(true);
  };

  const completeSimulation = () => {
    // Use courseSlug for navigation (same as regular TaskPage)
    navigate("/cta", { state: { courseSlug } });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <DotLottieReact
          src="/animations/animation.lottie"
          loop
          autoplay
          style={{ width: 200, height: 200 }}
        />
      </div>
    );
  }

  if (error || !task || !courseSlug) {
    return (
      <div className="min-h-screen p-20 text-center text-red-400 text-xl">
        {error || "Simulation not found"}
      </div>
    );
  }

  const selectedOutcome = selectedOption && showOutcome ? outcomes[selectedOption] : "";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb – now uses courseSlug */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to={`/courses/${courseSlug}`}
              className="hover:text-foreground"
            >
              Course
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to={`/courses/${courseSlug}/chapters/${chapterId}`}
              className="hover:text-foreground"
            >
              Chapter
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{task.title}</span>
          </div>
        </nav>

        {/* Top header */}
        <div className="mb-10">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                AI
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                {task.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    {task.xp ?? 0} XP · Simulation Task
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scenario */}
            <Card>
              <CardHeader>
                <p className="text-4xl font-semibold text-white">Scenario</p>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {scenarioText}
                </p>
              </CardContent>
            </Card>

            {/* Reference Document */}
            {referenceText && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Reference Document
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <details className="bg-black/20 rounded-xl border border-white/10 p-4 cursor-pointer">
                    <summary className="text-lg font-semibold text-white cursor-pointer">
                      View Reference Details
                    </summary>
                    <div className="mt-4 text-gray-300 whitespace-pre-line max-h-80 overflow-y-auto pr-2">
                      {referenceText}
                    </div>
                  </details>
                </CardContent>
              </Card>
            )}

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-400 text-2xl font-bold">
                  Choose Your Action
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {options.map((opt) => (
                  <div
                    key={opt.key}
                    onClick={() => {
                      setSelectedOption(opt.key);
                      setShowOutcome(false);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      selectedOption === opt.key
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <div className="text-white font-semibold text-lg mb-1">
                      {opt.title}
                    </div>
                    <div className="text-gray-300 whitespace-pre-line">
                      {opt.content}
                    </div>
                  </div>
                ))}

                {selectedOption && (
                  <GlowButton className="w-full mt-4" onClick={confirmChoice}>
                    Confirm Choice
                  </GlowButton>
                )}
              </CardContent>
            </Card>

            {/* Outcome – Mobile */}
            {selectedOutcome && (
              <div className="block lg:hidden">
                <Card className="bg-black/40 border border-yellow-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 text-2xl font-bold">
                      Outcome: Option {selectedOption}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200 whitespace-pre-line leading-relaxed">
                      {selectedOutcome}
                    </p>
                    <GlowButton
                      className="w-full mt-6"
                      icon={<CheckCircle className="w-5 h-5" />}
                      onClick={completeSimulation}
                    >
                      Complete Simulation
                    </GlowButton>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right Column – Desktop only */}
          <div className="space-y-6">
            {/* Instructions */}
            <Card>
              <CardHeader>
                <p className="flex items-center gap-2 text-2xl font-bold text-white">
                  <FileText className="w-5 h-5" /> Instructions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {task.instructions ? (
                    task.instructions
                      .split("\n")
                      .map((line: string, i: number) => {
                        const t = line.trim();
                        if (!t) return null;
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-primary font-medium">•</span>
                            <span>{t}</span>
                          </div>
                        );
                      })
                  ) : (
                    <p>No instructions provided.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Outcome – Desktop */}
            {selectedOutcome && (
              <Card className="hidden lg:block bg-black/40 border border-yellow-500/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-2xl font-bold">
                    Outcome: Option {selectedOption}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 whitespace-pre-line leading-relaxed">
                    {selectedOutcome}
                  </p>
                  <GlowButton
                    className="w-full mt-6"
                    icon={<CheckCircle className="w-5 h-5" />}
                    onClick={completeSimulation}
                  >
                    Complete Simulation
                  </GlowButton>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}