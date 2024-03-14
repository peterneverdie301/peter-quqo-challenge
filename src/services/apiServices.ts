import { BaseResponse, Products } from '@/types/products'
import { ApiResponse, UserInfo } from '@/types/userInfo'
import request from 'umi-request'

interface ProductResponse {
  results: Products[]
}

export const fetchProducts = async (): Promise<BaseResponse<ProductResponse>> => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem('jwt')

    const response = await request.get<BaseResponse<ProductResponse>>('http://localhost:8080/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response
  } catch (error) {
    throw new Error('Failed to fetch products data')
  }
}

export const fetchUserInfo = async (): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem('jwt')

    const response = await request.get<ApiResponse>('http://localhost:8080/customers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response
  } catch (error) {
    throw new Error('Failed to fetch user info')
  }
}

export const createProduct = async (data: any): Promise<BaseResponse<any>> => {
  try {
    const token = localStorage.getItem('jwt')

    const response = await request.post<BaseResponse<any>>('http://localhost:8080/products', {
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return response
  } catch (error) {
    throw new Error('Failed to create product')
  }
}
