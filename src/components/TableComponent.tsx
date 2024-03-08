import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Products } from '@/types/products' // Giả định đường dẫn này đúng
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
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'category_id', headerName: 'Category', width: 180 },
    { field: 'created_at', headerName: 'Created At ', width: 270 },
    { field: 'updated_at', headerName: 'Update At ', width: 270 }
  ]

  return (
    <div style={{ height: '100%', width: '100%', background: '#FFFFFF' }}>
      <TextField
        label='Search by name'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        fullWidth
        margin='normal'
      />
      <Button onClick={() => setSearchTerm('')} variant='contained' style={{ margin: '10px', background: '#DDDDDD' }}>
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
