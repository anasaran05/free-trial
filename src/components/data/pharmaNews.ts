export interface PharmaNewsItem {
  id: string
  title: string
  source: string
  date: string
}

export const pharmaNews: PharmaNewsItem[] = [
  { id: "gsk-01", title: "GSK announces phase 3 results", source: "FiercePharma", date: "2025-01-11" },
  { id: "pfizer-01", title: "Pfizer adopts AI for drug discovery", source: "BioPharmaDive", date: "2025-01-07" }
]