import React, { useState, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Switch,
  TextField
} from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import MDButtonLoading from '@/components/MDLoadingButton'
import { createProduct } from '@/services/apiServices'

interface dialogProps {
  refreshParent: () => Promise<void>
}
const categories = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  }
]

const warehouses = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  }
]
export default function CreateProduct({ refreshParent }: dialogProps) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const { t } = useTranslation()
  const auth = useAuth()

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    resolver: undefined
  })

  const handleCancel = () => {
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const onSubmit = async (formData: any) => {
    console.log('Submitting form', formData)
    setLoading(true)
    try {
      const response = await createProduct(formData)

      if (response.status === 'success') {
        console.log('Product created successfully', response)
        refreshParent()
        setOpen(false)
      } else {
        console.error('Something went wrong:', response.message)
      }
    } catch (error) {
      // Xử lý lỗi từ API
      console.error('Request error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button disabled={loading} onClick={handleClickOpen} startIcon={<AddOutlined />} variant='outlined'>
        {loading ? (
          <>
            <CircularProgress size={'15px'} />
            {t('Create Product')}
          </>
        ) : (
          <>{t('Create Product')}</>
        )}
      </Button>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <h3>{t('Create Product')}</h3>
            <Grid container spacing={[5, 5]}>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { value, onChange } }) => (
                      <TextField size='small' required label={t('Name')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { value, onChange } }) => (
                      <TextField required size='small' label={t('Description')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='category'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        required
                        size='small'
                        id='category'
                        select
                        label='Category'
                        defaultValue='EUR'
                        helperText='Please select your category'
                      >
                        {categories.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='warehouse'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        required
                        size='small'
                        id='warehouse'
                        select
                        label='Warehouse'
                        defaultValue='1'
                        helperText='Please select your warehouse'
                      >
                        {warehouses.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='price'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        required
                        size='small'
                        label={t('Price')}
                        type='number'
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='stock'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        required
                        size='small'
                        label={t('Stock')}
                        type='number'
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <MDButtonLoading
              loading={loading}
              buttonProps={{
                variant: 'outlined',
                type: 'reset',
                onClick: () => {
                  reset()
                  setOpen(false)
                }
              }}
            >
              {t('Cancel')}
            </MDButtonLoading>
            <MDButtonLoading
              loading={loading}
              buttonProps={{
                variant: 'contained',
                type: 'submit'
              }}
            >
              {t('Submit')}
            </MDButtonLoading>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
