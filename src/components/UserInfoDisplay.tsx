import React, { useState, useEffect } from 'react'
import { UserInfo, ApiResponse } from '../types/userInfo' // Đảm bảo đường dẫn đúng
import { Avatar, Box, Typography, Paper, Popover, Button, List, ListItem, ListItemText } from '@mui/material'
import { fetchUserInfo } from '@/services/apiServices' // Đảm bảo đường dẫn đúng

const UserInfoDisplay: React.FC = () => {
  const [userInfos, setUserInfos] = useState<UserInfo[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'user-info-popover' : undefined

  const handleFetchUserInfo = async () => {
    try {
      const response = await fetchUserInfo()
      console.log(response)
      if (response.status === 'success' && Array.isArray(response.data)) {
        setUserInfos(response.data)
      } else {
        console.error('Failed to fetch user info or data is not an array')
        setUserInfos([])
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  useEffect(() => {
    handleFetchUserInfo()
  }, [])

  return (
    <div>
      <Button
        aria-describedby={id}
        variant='contained'
        onClick={handleClick}
        sx={{ position: 'fixed', top: 58, right: 10 }}
      >
        Info
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Paper sx={{ padding: 2, maxWidth: 360 }}>
          <List>
            {userInfos.map((userInfo, index) => (
              <ListItem key={index} alignItems='flex-start'>
                <ListItemText
                  primary={userInfo.name}
                  secondary={
                    <>
                      <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                        {userInfo.address}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popover>
    </div>
  )
}

export default UserInfoDisplay
