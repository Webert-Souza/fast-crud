export type User = {
  id: number
  name: string
  email: string
  created_at?: Date
  password: string
  groupId: number
  group?: { name: string }
}

export type Group = {
  id: number
  name: string
  created_at?: Date
  users: []
}