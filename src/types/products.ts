// Cập nhật interface Products
export interface Products {
  id: number
  warehouse_id: number | null
  name: string
  description: string
  price: number
  category_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  children?: Products[]
  category: Category
  images: Image[]
}

interface Image {
  created_at: string
  updated_at: string
  deleted_at: null | string
  id: number
  product_id: number
  caption: string
  url: string
}

interface Category {
  created_at: string
  updated_at: string
  deleted_at: null | string
  id: number
  parent_id: number
  name: string
}
export interface BaseResponse<T> {
  status: string
  message: string
  data: T
}

export interface ProductsNode extends Products {
  children?: ProductsNode[]
}

export interface RenderTree {
  id: string
  name: string
  children?: RenderTree[]
}
