'use client'
import React from 'react'
import LoginForm from '../../components/LoginForm' // Đường dẫn tới file LoginForm của bạn

const LoginPage = () => {
  const handleLoginSuccess = (token: string) => {
    console.log('Đăng nhập thành công với token:', token)
  }

  return (
    <div>
      <LoginForm handleLoginSuccess={handleLoginSuccess} />
    </div>
  )
}

export default LoginPage
