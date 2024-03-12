'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { Badge, Divider, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Products } from '@/types/products'
import { findAllChildren } from '@/utils/findAllChildren'
import AppBarContent from './vertical/AppBarContent'
import Link from 'next/link'

const pageLinks = {
  Products: '/home',
  Customer: '/customer', // Giả sử đây là đường dẫn mặc định cho Customer, thay đổi nếu cần
  Cart: '/place-order'
}

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))
function ResponsiveAppBar() {
  const [data, setData] = useState<Products[]>([])
  const [selectedAreaDetail, setSelectedAreaDetail] = useState<Products[] | null>(null)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const router = useRouter()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/home'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Logo Q
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.entries(pageLinks).map(([page, href]) => (
              <Link key={page} href={href} passHref>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {Object.entries(pageLinks).map(([page, href]) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={href} passHref>
                    <Typography textAlign='center' sx={{ width: '100%', display: 'block' }}>
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AppBarContent
            hidden={false}
            // settings={initialSettings}
            toggleNavVisibility={() => {}}
            saveSettings={values => {}}
          />

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
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
