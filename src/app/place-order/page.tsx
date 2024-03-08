'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextField, Box } from '@mui/material'

const PlaceOrderPage: React.FC = () => {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement & {
      customerName: { value: string }
      address: { value: string }
      paymentMethod: { value: string }
    }
    const orderDetails = {
      customerName: form.customerName.value,
      address: form.address.value,
      paymentMethod: form.paymentMethod.value
    }

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails))
    alert('Thank you for your order!')
    router.push('/home')
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        marginTop: '200px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete='off'
    >
      <TextField name='customerName' label='Customer Name' required />
      <TextField name='address' label='Address' required />
      <TextField name='paymentMethod' label='Payment Method' required />
      <Button
        style={{
          top: '20px',
          width: '150px',
          height: '30px'
        }}
        type='submit'
        variant='contained'
        color='primary'
      >
        Place Order
      </Button>
    </Box>
  )
}

export default PlaceOrderPage
