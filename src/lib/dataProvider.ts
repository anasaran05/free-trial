import { pharmaNews, PharmaNewsItem } from "@/components/data/pharmaNews"
import { joinStream, JoinEvent } from "@/components/data/joinStream"

export async function getPharmaNews(): Promise<PharmaNewsItem[]> {
  return pharmaNews
}

export async function getJoinEvents(): Promise<JoinEvent[]> {
  return joinStream
}