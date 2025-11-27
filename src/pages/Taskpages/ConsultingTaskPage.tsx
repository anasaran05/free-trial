// src/pages/taskpages/ConsultingTaskPage.tsx

'use client';

import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchTasks, organizeTasks, findTask, Task } from "@/lib/csv";
import { getCourseBySlug } from "@/lib/csv";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import { GlowButton } from "@/components/Button";

import {
  BookOpen,
  Award,
  ChevronRight,
  CheckCircle,
  FileText,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CSV_URL =
  import.meta.env.VITE_CSV_URL ||
  "https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv";

type PhaseKey = "D1" | "D2" | "D3" | "D4" | "D5";

interface ParsedAnswerKey {
  headers: string[];
  rows: string[][];
  extraText: string;
}

function parseMarkdownTable(text: string): ParsedAnswerKey {
  const lines = text.split("\n");

  let tableStart = -1;
  let tableEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("|")) {
      tableStart = i;
      break;
    }
  }

  if (tableStart === -1) {
    return { headers: [], rows: [], extraText: text.trim() };
  }

  for (let i = tableStart; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed.startsWith("|") || trimmed === "") {
      tableEnd = i - 1;
      break;
    }
  }

  if (tableEnd === -1) tableEnd = lines.length - 1;

  const tableLines = lines.slice(tableStart, tableEnd + 1);
  const before = lines.slice(0, tableStart);
  const after = lines.slice(tableEnd + 1);

  const clean = (line: string) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const headers = tableLines.length > 0 ? clean(tableLines[0]) : [];
  const rows: string[][] = [];

  for (let i = 1; i < tableLines.length; i++) {
    const trimmed = tableLines[i].trim();
    if (/^\|\s*-+/.test(trimmed)) continue;
    if (!trimmed.startsWith("|")) continue;
    const cells = clean(tableLines[i]);
    if (cells.every((c) => c === "")) continue;
    rows.push(cells);
  }

  const extraText = [...before, "", ...after].join("\n").trim();
  return { headers, rows, extraText };
}

function countMatchingKeywords(sentence: string, expected: string[]): number {
  const s = sentence.toLowerCase();
  return expected.filter((kw) => s.includes(kw.toLowerCase())).length;
}

function wordCount(s: string) {
  return s.trim().split(/\s+/).length;
}

function scorePhase(
  phase: PhaseKey,
  userText: string,
  correctText: string
): number {
  let pts = 0;
  const text = userText.toLowerCase();
  const ref = correctText.toLowerCase();

  const numericDrivers = [
    "1.46",
    "51",
    "29",
    "14",
    "6",
    "49",
    "96",
    "44",
    "918",
    "100",
  ];
  const matchedDrivers = countMatchingKeywords(text, numericDrivers);
  pts += Math.min(matchedDrivers, 3) * 3;

  const expectedMap: Record<PhaseKey, string[]> = {
    D1: ["risk", "behind", "plan", "gap", "loss"],
    D2: ["drivers", "root", "cause", "due", "issues"],
    D3: ["fix", "launch", "flow", "engine", "unified"],
    D4: ["100 days", "automate", "nationwide", "repair", "activate"],
    D5: ["fulfillment", "prescribing", "recovered", "rise", "impact"],
  };

  const expected = expectedMap[phase];
  const matched = countMatchingKeywords(text, expected);
  pts += Math.min(matched, 3) * 3;

  const wc = wordCount(userText);
  if (wc <= 28) pts += 2;
  else if (wc <= 35) pts += 1;

  const refWords = new Set(ref.split(/\W+/));
  const userWords = text.split(/\W+/);
  const overlap = userWords.filter((w) => refWords.has(w)).length;
 4;
  pts += Math.min(overlap, 4);

  if (pts > 20) pts = 20;
  return pts;
}

export default function ConsultingTaskPage() {
  const { courseSlug, chapterId, taskId } = useParams<{
    courseSlug: string;
    chapterId: string;
    taskId: string;
  }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fiveD, setFiveD] = useState<Record<PhaseKey, string>>({
    D1: "",
    D2: "",
    D3: "",
    D4: "",
    D5: "",
  });

  const [hasSubmittedFiveD, setHasSubmittedFiveD] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [score, setScore] = useState<number | null>(null);

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
    if (!courseId) {
      setError("Course not found");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const rows = await fetchTasks(CSV_URL);
      const structured = organizeTasks(rows);
      const found = findTask(structured, courseId, chapterId!, taskId!);

      if (!found) {
        setError("Task not found");
        setTask(null);
        return;
      }

      setTask(found);
    } catch (err) {
      console.error("Error loading consulting task:", err);
      setError("Failed to load task");
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  const parsedAnswerKey = useMemo<ParsedAnswerKey>(() => {
    if (!task?.resources?.answerKey) {
      return { headers: [], rows: [], extraText: "" };
    }
    return parseMarkdownTable(task.resources.answerKey);
  }, [task?.resources?.answerKey]);

  const scenarioText = task?.scenario || "";
  const referenceText = task?.resources?.pdfs?.[0] || "";

  const allPhasesFilled = useMemo(
    () => Object.values(fiveD).every((x) => x.trim().length > 0),
    [fiveD]
  );

  const handlePhaseChange = (phase: PhaseKey, value: string) => {
    setFiveD((prev) => ({ ...prev, [phase]: value }));
  };

  const handleSubmitFiveD = () => {
    if (!allPhasesFilled) return;

    const rows = parsedAnswerKey.rows;

    const refMap: Record<PhaseKey, string> = {
      D1: rows[0]?.[1] || "",
      D2: rows[1]?.[1] || "",
      D3: rows[2]?.[1] || "",
      D4: rows[3]?.[1] || "",
      D5: rows[4]?.[1] || "",
    };

    let total = 0;
    (Object.keys(fiveD) as PhaseKey[]).forEach((phase) => {
      total += scorePhase(phase, fiveD[phase], refMap[phase]);
    });

    setScore(total);
    setHasSubmittedFiveD(true);
    setShowAnswerKey(false);
  };

  const handleTaskCompleted = () => {
    if (courseSlug && taskId) {
      try {
        const completedKey = `course_${courseSlug}_completed_tasks`;
        const completed = sessionStorage.getItem(completedKey);
        const arr = completed ? (JSON.parse(completed) as string[]) : [];

        if (!arr.includes(taskId)) {
          arr.push(taskId);
          sessionStorage.setItem(completedKey, JSON.stringify(arr));
        }

        navigate("/cta", { state: { courseSlug } });
      } catch (err) {
        console.error("Error saving completion:", err);
        navigate("/cta", { state: { courseSlug } });
      }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50 w-screen h-screen">
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Task Error
              </h3>
              <p className="text-muted-foreground mb-4">
                {error || "Unable to load this consulting task."}
              </p>
              <Link to="/courses">
                <GlowButton>Back to Courses</GlowButton>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to={`/courses/${courseSlug}`}
              className="hover:text-foreground transition-colors"
            >
              Course
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to={`/courses/${courseSlug}/chapters/${chapterId}`}
              className="hover:text-foreground transition-colors"
            >
              Chapter
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{task.title}</span>
          </div>
        </nav>

        <div className="mb-12">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                {task.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{task.xp ?? 0} XP · Consulting 5D Brief</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="text-4xl font-bold text-white">
                    Scenario
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {scenarioText}
                </p>
              </CardContent>
            </Card>

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

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  ZANE 5D LIVE FIRE TEMPLATE – FILL IN 5 LINES ONLY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  One sentence per phase, max 28 words, C-suite crisp.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-white/10 rounded-xl text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold border-b border-white/10">
                          Phase
                        </th>
                        <th className="px-4 py-2 text-left font-semibold border-b border-white/10">
                          Your One-Sentence Executive Answer (write here)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {[
                        { key: "D1", label: "D1 Discover" },
                        { key: "D2", label: "D2 Diagnose" },
                        { key: "D3", label: "D3 Design" },
                        { key: "D4", label: "D4 Deploy" },
                        { key: "D5", label: "D5 Drive Impact" },
                      ].map((row) => (
                        <tr key={row.key}>
                          <td className="px-4 py-3 align-top font-semibold text-white">
                            {row.label}
                          </td>
                          <td className="px-4 py-3">
                            <textarea
                              className="w-full min-h-[56px] rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                              placeholder="Write your single executive sentence for this phase…"
                              value={fiveD[row.key as PhaseKey]}
                              onChange={(e) =>
                                handlePhaseChange(row.key as PhaseKey, e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      SCORING (How actual Partners score this)
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>
                        95–100 → Immediate Partner offer / $25 M engagement
                        signed
                      </li>
                      <li>90–94 → Principal fast-track</li>
                      <li>85–89 → Senior EM / strong respect</li>
                      <li>Below 85 → “Thanks, we’ll call you”</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                    <GlowButton
                      className="px-5 py-2 text-sm"
                      onClick={handleSubmitFiveD}
                      disabled={!allPhasesFilled}
                    >
                      Submit 5D Table
                    </GlowButton>

                    <button
                      type="button"
                      className={`px-3 py-1 text-xs rounded-md border transition ${
                        hasSubmittedFiveD
                          ? "border-primary text-primary hover:bg-primary/10"
                          : "border-border text-muted-foreground cursor-not-allowed"
                      }`}
                      disabled={!hasSubmittedFiveD}
                      onClick={() => setShowAnswerKey((prev) => !prev)}
                    >
                      View 5D Answer Key
                    </button>

                    {!hasSubmittedFiveD && (
                      <span className="text-xs text-muted-foreground">
                        Fill and submit all 5 phases to unlock the answer key.
                      </span>
                    )}
                  </div>

                  {score !== null && (
                    <div className="mt-4 p-4 rounded-lg bg-black/40 border border-white/10">
                      <p className="text-lg font-bold text-primary">
                        Your 5D Score: {score} / 100
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {score >= 95
                          ? "Outstanding: Partner-level brief."
                          : score >= 90
                          ? "Excellent: Principal fast-track."
                          : score >= 85
                          ? "Strong: Senior EM-level quality."
                          : "Below threshold: Refine clarity, drivers, and numbers."}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {hasSubmittedFiveD && showAnswerKey && (
              <Card className="bg-black/40 border border-yellow-500/30 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-2xl font-bold">
                    Partner-Level 5D Answer Key
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {parsedAnswerKey.headers.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-white/10 rounded-xl text-sm">
                        <thead className="bg-white/5">
                          <tr>
                            {parsedAnswerKey.headers.map((h, idx) => (
                              <th
                                key={idx}
                                className="px-4 py-2 text-left font-semibold border-b border-white/10 text-white"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {parsedAnswerKey.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className="px-4 py-2 align-top text-sm text-foreground"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {parsedAnswerKey.extraText && (
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {parsedAnswerKey.extraText}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 !text-2xl !font-bold text-white">
                  <FileText className="w-5 h-5" /> Instructions for Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {task.instructions ? (
                    task.instructions.split("\n").map((line: string, i: number) => {
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

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Complete Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Submit your 5D table first, then mark this consulting brief
                    as completed.
                  </p>
                  <GlowButton
                    className="w-full"
                    icon={<CheckCircle className="w-5 h-5" />}
                    onClick={handleTaskCompleted}
                    disabled={!hasSubmittedFiveD}
                  >
                    Task Completed
                  </GlowButton>
                  {!hasSubmittedFiveD && (
                    <p className="text-xs text-muted-foreground text-center">
                      Fill and submit all 5 phases to enable completion.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}