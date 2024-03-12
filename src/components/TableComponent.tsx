import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Products } from '@/types/products'
import { Button, TextField } from '@mui/material'

interface TableProps {
  data: Products[]
}

// Hàm removeAccents di chuyển ra ngoài component
const removeAccents = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [displayData, setDisplayData] = useState<Products[]>([])

  // Tự động cập nhật displayData khi searchTerm hoặc data thay đổi
  useEffect(() => {
    const searchTermNormalized = removeAccents(searchTerm.toLowerCase())
    const filteredData = data.filter(product =>
      removeAccents(product.name.toLowerCase()).includes(searchTermNormalized)
    )
    setDisplayData(searchTermNormalized ? filteredData : data)
  }, [searchTerm, data])

  const columns: GridColDef[] = [
    {
      field: 'images',
      headerName: 'Image',
      width: 270,
      renderCell: params => {
        const firstImageUrl = params.value?.[0]?.url
        return firstImageUrl ? (
          <img src={firstImageUrl} alt='Product' style={{ width: '30px', height: 'auto' }} />
        ) : (
          <span>No image</span>
        )
      },
      // Đảm bảo bạn đang lấy dữ liệu images từ dữ liệu hàng
      valueGetter: params => params.row.images
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'category',
      headerName: 'Category',
      width: 180,
      valueGetter: params => params.row.category.name
    }
  ]

  return (
    <div style={{ height: '100%', width: '100%', background: '#FFFFFF' }}>
      <TextField
        style={{ margin: '10px', width: '85%' }}
        label='Search by name'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        fullWidth
        margin='normal'
      />
      <Button
        onClick={() => setSearchTerm('')}
        variant='contained'
        style={{ marginTop: '15px', background: '#DDDDDD' }}
      >
        Clear Search
      </Button>
      {displayData.length > 0 ? (
        <DataGrid
          rows={displayData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 }
            }
          }}
          checkboxSelection
          autoHeight
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default TableComponent
