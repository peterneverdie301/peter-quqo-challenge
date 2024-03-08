export interface UserInfo {
  created_at: string
  updated_at: string
  deleted_at: string | null
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  username: string
  password: string // Lưu ý: Thông thường, password không nên được gửi qua API
}

export interface ApiResponse {
  data: UserInfo[]
  status: string
  message: string
}
