import type { Story } from '@/types/story';

// Core
import { storyChapters as guardianChapters } from '@/components/data/Stories/general/guardianStory';
import { storyChapters as neuraBioChapters } from '@/components/data/Stories/general/neuraBioStory';
import { storyChapters as fracturedConsentChapters } from '@/components/data/Stories/general/fractured-consent';

// QA/QC
import { storyChapters as purityTooPerfectChapters } from '@/components/data/Stories/qa_qc/purity-too-perfect';
import { storyChapters as ambulanceBatchChapters } from '@/components/data/Stories/qa_qc/the-ambulance-batch';
import { storyChapters as cleanroomParadoxChapters } from '@/components/data/Stories/qa_qc/the-cleanroom-paradox';

// Pharmacovigilance
import { storyChapters as postMarketingHellChapters } from '@/components/data/Stories/Pv/post-marketing-hell';
import { storyChapters as signalInNoiseChapters } from '@/components/data/Stories/Pv/signal-in-the-noise';
import { storyChapters as caseWouldntCloseChapters } from '@/components/data/Stories/Pv/the-case-that-wouldnt-close';

// Clinical Research
import { storyChapters as deferredConsentChapters } from '@/components/data/Stories/Clinical_research/deferred-consent';
import { storyChapters as phantomSubjectChapters } from '@/components/data/Stories/Clinical_research/phantom-subject';
import { storyChapters as protocol302bChapters } from '@/components/data/Stories/Clinical_research/protocol302b.story';

// Add this at the top with your courseMap
export const courseMap: Record<string, string> = {
  "course_1": "qaqc",
  "course_2": "pharmacovigilance",
  "course_3": "clinicalresearch",
};

// Optional: reverse map for display names
export const courseDisplayNames: Record<string, string> = {
  "qaqc": "QA/QC & GMP",
  "pharmacovigilance": "Pharmacovigilance",
  "clinicalresearch": "Clinical Research",
  "regulatory": "Regulatory Affairs",
  "medicalaffairs": "Medical Affairs",
  "cdm": "Clinical Data Management",
  "public": "General / Public"
};

export const stories: Story[] = [
  {
    id: 'guardians-journey',
    title: "The Guardian's Journey",
    description: 'Rise from anxious trainee to leading global drug safety expert',
    estimatedDuration: '45–60 min',
    chapters: guardianChapters,
    coverImage: 'https://www.shutterstock.com/image-vector/bottle-medicine-target-blue-syringe-600nw-2602511367.jpg',
    courseId: 'public', // or 'course_2' if it's PV-focused
  },
  {
    id: 'neurabio',
    title: 'NeuraBio: Price of Innovation',
    description: 'Inside a biotech startup racing between breakthrough science and ethics',
    estimatedDuration: '60–75 min',
    chapters: neuraBioChapters,
    coverImage: 'https://cdn.mos.cms.futurecdn.net/H2K5LjsrakLauPmnZxYddF.jpg',
    courseId: 'public',
  },
  {
    id: 'fractured-consent',
    title: 'Fractured Consent',
    description: 'When clinical trial patients never truly understood what they signed',
    estimatedDuration: '50–70 min',
    chapters: fracturedConsentChapters,
    coverImage: 'https://lawwire.in/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-29-at-5.04.49-PM.webp',
    courseId: 'public', // Clinical Research
  },

  // QA/QC Stories
  {
    id: 'purity-too-perfect',
    title: 'Purity Too Perfect',
    description: 'QC analysts face the impossible: a drug batch that is “too pure” to be real',
    estimatedDuration: '35–50 min',
    chapters: purityTooPerfectChapters,
    coverImage: 'https://c02.purpledshub.com/uploads/sites/48/2024/04/age-of-stars.jpg?fit=800%2C548&webp=1&w=1200',
    courseId: 'course_1', // qaqc
  },
  {
    id: 'ambulance-batch',
    title: 'The Ambulance Batch',
    description: 'A last-minute rescue shipment spirals into a GMP disaster',
    estimatedDuration: '40–55 min',
    chapters: ambulanceBatchChapters,
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82RFAodyS3QdoH_MN_J7MDLe-Ini9eWUx6Q&s',
    courseId: 'course_1',
  },
  {
    id: 'cleanroom-paradox',
    title: 'The Cleanroom Paradox',
    description: 'Perfect environmental sampling hides a deeper contamination',
    estimatedDuration: '45–60 min',
    chapters: cleanroomParadoxChapters,
    coverImage: 'https://www.imec-int.com/sites/default/files/2021-12/Cleanroom_16.jpg',
    courseId: 'course_1',
  },

  // Pharmacovigilance
  {
    id: 'post-marketing-hell',
    title: 'Post-Marketing Hell',
    description: 'A blockbuster drug spirals into chaos after launch day',
    estimatedDuration: '50–70 min',
    chapters: postMarketingHellChapters,
    coverImage: 'https://www.brettonwoodsproject.org/wp-content/uploads/2024/11/surveillance.jpg',
    courseId: 'course_2',
  },
  {
    id: 'signal-in-the-noise',
    title: 'Signal in the Noise',
    description: 'The weakest AE signal becomes the deadliest case',
    estimatedDuration: '45–60 min',
    chapters: signalInNoiseChapters,
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYirut0A7bdP78G5vQBPrwYQVli27A9pxfQ&s',
    courseId: 'course_2',
  },
  {
    id: 'case-that-wouldnt-close',
    title: "The Case That Wouldn't Close",
    description: 'A PV investigation that outlives everyone assigned to it',
    estimatedDuration: '60–80 min',
    chapters: caseWouldntCloseChapters,
    coverImage: 'https://images.unsplash.com/photo-1526243741027-444d633d7365',
    courseId: 'course_2',
  },

  // Clinical Research
  {
    id: 'deferred-consent',
    title: 'Deferred Consent',
    description: 'Trauma trial participants were never conscious to agree',
    estimatedDuration: '45–65 min',
    chapters: deferredConsentChapters,
    coverImage: 'https://llri.in/wp-content/uploads/2025/03/Informed-Consent-Form-in-Clinical-Trials-4-1024x538.webp',
    courseId: 'course_3',
  },
  {
    id: 'phantom-subject',
    title: 'Phantom Subject',
    description: 'Site reports enrollment spikes but no patient ever arrives',
    estimatedDuration: '50–70 min',
    chapters: phantomSubjectChapters,
    coverImage: 'https://www.harborclinical.com/wp-content/uploads/plastic-surgery-research-Clinical-Trial-Facilities-4.jpg',
    courseId: 'course_3',
  },
  {
    id: 'protocol-302b',
    title: 'Protocol 302B',
    description: 'Amendments buried inside amendments collapse the trial',
    estimatedDuration: '60–80 min',
    chapters: protocol302bChapters,
    coverImage: 'https://content.kaspersky-labs.com/se/com/content/en-global/images/repository/isc/2017-images/web-img-21/web-img-21.jpg',
    courseId: 'course_3',
  },
];