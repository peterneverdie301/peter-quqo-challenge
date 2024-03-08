'use client'
import React, { Fragment, useEffect, useState } from 'react'
import TableComponent from '../../components/TableComponent'
import { exportToExcel } from '../../components/ExportToExcel'
import {
  Avatar,
  Badge,
  Box,
  Button,
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

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))
const MainPage: React.FC = () => {
  const [data, setData] = useState<Products[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grouped'>('list')
  const [selectedAreaDetail, setSelectedAreaDetail] = useState<Products[] | null>(null)

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

  const handleNodeSelect = (nodeId: string) => {
    const selectedArea = data.find(area => area.id.toString() === nodeId)
    const childrenAreas = selectedArea ? findAllChildren(selectedArea.id, data) : []
    setSelectedAreaDetail(selectedArea ? [selectedArea, ...childrenAreas] : null)
  }

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleAvatarClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    router.push('/login')
  }
  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'sticky', top: 0, right: 0, m: 2 }}>
        <Badge
          overlap='circular'
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          onClick={handleAvatarClick}
        >
          <Avatar alt='Peter' sx={{ width: 40, height: 40 }} src='/images/avatars/1.png' />
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        >
          <Box sx={{ pt: 2, pb: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar alt='Peter' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
              </Badge>
              <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600 }}>Peter</Typography>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                  Admin
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: '0 !important' }} />
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/user-profile')}>
            <Box sx={styles}>Profile</Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/email')}>
            <Box sx={styles}>Inbox</Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/chat')}>
            <Box sx={styles}>Chat</Box>
          </MenuItem>
          <Divider />
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/account-settings/account')}>
            <Box sx={styles}>Settings</Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/pricing')}>
            <Box sx={styles}>Pricing</Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/login')}>
            <Box sx={styles}>FAQ</Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={handleLogout}>
            <Box sx={styles}>Log Out</Box>
          </MenuItem>
          <Divider />
        </Menu>
      </Box>
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
          List Products
        </ToggleButton>
        <ToggleButton value='grouped' aria-label='Grouped'>
          Group View
        </ToggleButton>
      </ToggleButtonGroup>

      <div style={{ display: 'flex', flex: 1, margin: '0 0 100px 0' }}>
        <div style={{ flex: 1 }}>
          {viewMode === 'list' ? (
            <TableComponent data={data} />
          ) : (
            <Sidebar data={data} onNodeSelect={handleNodeSelect} />
          )}
        </div>

        {viewMode === 'grouped' && selectedAreaDetail && (
          <div style={{ flex: 3, padding: '0 20px' }}>
            <DataGrid
              rows={selectedAreaDetail}
              columns={[
                { field: 'name', headerName: 'Name', width: 150 },
                { field: 'description', headerName: 'Description', type: 'string', width: 130 },
                { field: 'price', headerName: 'Price', width: 130 }
              ]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 20, page: 0 }
                }
              }}
              autoHeight
              hideFooter
            />
          </div>
        )}
      </div>

      <Button
        style={{
          position: 'fixed',
          left: '10',
          bottom: '10px',
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
          left: '1300px',
          bottom: '80px',
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
