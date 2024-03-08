'use client'
import React, { useState, FormEvent, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useRouter } from 'next/navigation'

interface UserCredentials {
  username: string
  password: string
}

interface LoginFormProps {
  handleLoginSuccess: (token: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLoginSuccess }) => {
  const router = useRouter()

  const [credentials, setCredentials] = useState<UserCredentials>({ username: '', password: '' })
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (response.ok) {
        const { data } = await response.json() // Giả sử rằng phản hồi có đúng cấu trúc như bạn đã mô tả
        localStorage.setItem('jwt', data.access_token) // Lưu trữ access_token vào localStorage
        handleLoginSuccess(data.access_token) // Gọi callback với access_token
        router.push('/home') // Chuyển hướng người dùng đến trang /home
      } else {
        const errorMessage = await response.text()
        setErrorMessage(errorMessage || 'Login failed')
      }
    } catch (error: any) {
      setErrorMessage(`Login failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      // If there is a JWT token in localStorage, redirect the user to the main page
      router.push('/home')
    }
  }, []) // Run this effect only once when the component mounts

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={credentials.username}
            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={credentials.password}
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          {errorMessage && <Typography color='error'>{errorMessage}</Typography>} {/* Hiển thị thông báo lỗi */}
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
