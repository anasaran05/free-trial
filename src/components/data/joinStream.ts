export interface JoinEvent {
  name: string
  state: string
  joinedAt: string
}

export const joinStream: JoinEvent[] = [
  { name: "Sanjay", state: "Tamil Nadu", joinedAt: "2025-01-21T10:01:00Z" },
  { name: "Ritika", state: "Maharashtra", joinedAt: "2025-01-21T10:01:20Z" },
  { name: "Ahmed", state: "Karnataka", joinedAt: "2025-01-21T10:01:40Z" }
]