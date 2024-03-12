'use client'
import React, { Fragment, useEffect, useState } from 'react'
import TableComponent from '../../components/TableComponent'
import { exportToExcel } from '../../components/ExportToExcel'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled
} from '@mui/material'
import { Products } from '@/types/products'
import { fetchProducts } from '@/services/apiServices'
import { Sidebar } from '../../components/Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { findAllChildren } from '@/utils/findAllChildren'
import { useRouter } from 'next/navigation'
import CardProduct from '@/components/CardProduct'

const MainPage: React.FC = () => {
  const [data, setData] = useState<Products[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grouped'>('list')
  const router = useRouter()
  const fetchProductsData = async () => {
    try {
      setIsLoading(true)
      const result = await fetchProducts()
      console.log('Result from API:', result)
      if (result.status === 'success') {
        if (Array.isArray(result.data.results)) {
          setData(result.data.results)
          setError(null)
        } else {
          setError('Data received is not an array')
        }
      } else {
        setError('Failed to fetch data')
      }
    } catch (err) {
      setError('An error occurred while fetching data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsData()
  }, [])

  useEffect(() => {
    console.log('Data:', data)
  }, [])

  const handleExport = () => {
    exportToExcel(data)
  }

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, nextView: 'list' | 'grouped') => {
    if (nextView !== null) {
      setViewMode(nextView)
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewModeChange}
        aria-label='View mode'
        style={{
          marginBottom: '20px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'white'
        }}
      >
        <ToggleButton value='list' aria-label='List'>
          List
        </ToggleButton>
        <ToggleButton value='grouped' aria-label='Grouped'>
          Card
        </ToggleButton>
      </ToggleButtonGroup>

      <div style={{ display: 'flex', flex: 1, margin: '0 0 100px 0' }}>
        <div style={{ flex: 1 }}>
          {viewMode === 'list' ? <TableComponent data={data} /> : <CardProduct products={data} />}
        </div>
      </div>

      <Button
        style={{
          margin: '0px 0px 10px 0px',
          width: '150px',
          height: '30px'
        }}
        onClick={handleExport}
        variant='contained'
        color='primary'
      >
        Export Excel
      </Button>

      <Button
        style={{
          width: '150px',
          height: '30px'
        }}
        variant='contained'
        color='primary'
        onClick={() => router.push('/place-order')} // Giả sử bạn đã tạo trang "/place-order"
      >
        Order Now
      </Button>
    </div>
  )
}

export default MainPage
