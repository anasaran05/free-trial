// src/onboarding/taskPageSteps.ts
import { Step } from "react-joyride";

export const taskPageSteps: Step[] = [
  { target: '[data-tour="task-title"]',           content: "This is your real-world simulation mission...", placement: "bottom", disableBeacon: true },
  { target: '[data-tour="scenario-card"]',        content: "The full scenario...", placement: "top", disableBeacon: true },
  { target: '[data-tour="tools-panel"]',          content: "Your professional toolkit...", placement: "bottom", disableBeacon: true },
  
  // These now exist on mobile → will show everywhere
  { target: '[data-tour="reference-documents-card"]', content: "These are your reference materials...", placement: "top", disableBeacon: true },
  { target: '[data-tour="fillable-documents-card"]',  content: "Here are the templates/forms...", placement: "top", disableBeacon: true },
  { target: '[data-tour="first-resource-btn"]',       content: "You must open and review EVERY required document...", placement: "bottom", disableBeacon: true },
  { target: '[data-tour="progress-card"]',            content: "Live tracker...", placement: "top", disableBeacon: true }, // changed to "top" for mobile
  
  { target: '[data-tour="complete-task-btn"]',    content: "Final submission...", placement: "top", disableBeacon: true },
  { target: '[data-tour="answer-key-card"]',      content: "Optional: See the expected outcome...", placement: "top", disableBeacon: true },
  { target: "body",                               content: "Welcome to ZANE ΩMEGA simulations...", placement: "center", disableBeacon: true },
];