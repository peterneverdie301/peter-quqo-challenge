'use client'
import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, Avatar, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'

// Giả định cấu trúc dữ liệu trả về từ API
interface Customer {
  id: number
  name: string
  avatar: string // Giả định rằng dữ liệu trả về từ API có trường avatar
}

const UserProfile: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    // Hàm để gọi API và lấy dữ liệu
    const fetchCustomerData = async () => {
      setIsLoading(true)
      try {
        // Giả định bạn lưu token JWT trong localStorage với key là 'jwt'
        const token = localStorage.getItem('jwt')
        const response = await fetch('http://localhost:8080/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Thêm Authorization header với Bearer token
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (data && data.data && data.data.results.length > 0) {
          // Lấy người dùng đầu tiên trong mảng kết quả
          setCustomer(data.data.results[0])
        } else {
          // Xử lý trường hợp không có dữ liệu trả về hoặc trả về lỗi
          console.error('No data returned from API')
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomerData()
  }, [])

  return (
    <Grid container spacing={6} justifyContent='center' alignItems='center' style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6} textAlign='center'>
        {isLoading ? (
          <CircularProgress />
        ) : customer ? (
          <Box>
            <Avatar src={customer.avatar} sx={{ width: 56, height: 56, margin: 'auto' }} />
            <Typography variant='h6' sx={{ mt: 2 }}>
              {customer.name}
            </Typography>
          </Box>
        ) : (
          <Typography>No customer data found</Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default UserProfile
