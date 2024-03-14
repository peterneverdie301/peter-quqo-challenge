'use client'
import React from 'react'
import {
  Card,
  CardContent,
  TextField,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  Box
} from '@mui/material'
import { Field } from 'rc-field-form'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const categories: string[] = ['1', '2', '3' /* ... */]
const parentProviders: string[] = ['Provider A', 'Provider B', 'Provider C' /* ... */]
const timezones: string[] = ['America/Mexico_City', 'America/Bogota', 'Asia/Ho_Chi_Minh' /* ... */]

export interface BasicInfoProps {
  name: string
  category: string
  parentProvider: string
  timezone: string
}

const BasicInfoCard: React.FC<BasicInfoProps> = ({ name, category, parentProvider, timezone }) => {
  return (
    <Grid style={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Field name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
              {({ field, meta }) => (
                <Box display='flex' alignItems='center'>
                  <TextField
                    {...field}
                    fullWidth
                    label='Name'
                    error={meta?.touched && meta?.error ? true : false}
                    helperText={meta?.touched && meta?.error ? meta.error : null}
                  />
                  <Tooltip title='Please input your name correctly'>
                    <IconButton size='small'>
                      <ErrorOutlineIcon color='error' />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Field>
          </Grid>

          <Grid item xs={3}>
            <Field name='category' rules={[{ required: true, message: 'Please select your category!' }]}>
              {({ field, meta }) => (
                <FormControl fullWidth error={meta?.touched && !!meta?.error}>
                  <InputLabel>category</InputLabel>
                  <Select {...field} label='category'>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>

                  {meta?.touched && meta?.error && <FormHelperText>{meta.error}</FormHelperText>}
                </FormControl>
              )}
            </Field>
          </Grid>
          <Grid item xs={3}>
            <Field name='parentProvider' rules={[{ required: true, message: 'Please select your parent provider!' }]}>
              {({ field, meta }) => (
                <FormControl fullWidth error={meta?.touched && !!meta?.error}>
                  <InputLabel>Parent Provider</InputLabel>
                  <Select {...field} label='Parent Provider'>
                    {parentProviders.map((provider: string) => (
                      <MenuItem key={provider} value={provider}>
                        {provider}
                      </MenuItem>
                    ))}
                  </Select>
                  {meta?.touched && meta?.error && <FormHelperText>{meta.error}</FormHelperText>}
                </FormControl>
              )}
            </Field>
          </Grid>
          <Grid item xs={3}>
            <Field name='timezone' rules={[{ required: true, message: 'Please select your timezone!' }]}>
              {({ field, meta }) => (
                <FormControl fullWidth error={meta?.touched && !!meta?.error}>
                  <InputLabel>Timezone</InputLabel>
                  <Select {...field} label='Timezone'>
                    {timezones.map((timezone: string) => (
                      <MenuItem key={timezone} value={timezone}>
                        {timezone}
                      </MenuItem>
                    ))}
                  </Select>
                  {meta?.touched && meta?.error && <FormHelperText>{meta.error}</FormHelperText>}
                </FormControl>
              )}
            </Field>
          </Grid>
        </Grid>
      </CardContent>
    </Grid>
  )
}

export default BasicInfoCard
