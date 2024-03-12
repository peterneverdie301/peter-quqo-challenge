import { MouseEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'
import Icon from '@/components/checkout/custom-radio/icons/icon'
import { Products } from '@/types/products'

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardProduct = ({ products }: { products: Products[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid container spacing={3}>
      {' '}
      {/* Thêm spacing để tạo khoảng cách giữa các card */}
      {products?.map((product, index) => (
        <Grid item key={index} xs={12} sm={6}>
          {' '}
          <Card>
            <Grid container spacing={6}>
              <StyledGrid item md={5} xs={12}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                </CardContent>
              </StyledGrid>
              <Grid item md={7} xs={12}>
                <CardContent>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    {product.name}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    Price:{' '}
                    <Box component='span' sx={{ fontWeight: 600 }}>
                      ${product.price}
                    </Box>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button startIcon={<Icon icon='mdi:cart-plus' />} sx={{ '& svg': { mr: 2 } }}>
                      Add to Cart
                    </Button>
                    <IconButton
                      aria-label='share'
                      aria-haspopup='true'
                      onClick={handleClick}
                      aria-controls='share-menu'
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Icon icon='mdi:share-variant' />
                    </IconButton>
                    <Menu open={open} id='share-menu' anchorEl={anchorEl} onClose={handleClose}>
                      <MenuItem onClick={handleClose}>
                        <Icon icon='mdi:facebook' />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Icon icon='mdi:twitter' />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Icon icon='mdi:linkedin' />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Icon icon='mdi:google-plus' />
                      </MenuItem>
                    </Menu>
                  </Box>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default CardProduct
