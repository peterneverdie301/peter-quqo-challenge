import Button, { ButtonProps } from '@mui/material/Button'
import { CircularProgress } from '@mui/material'
import type { ReactNode } from 'react'

interface loadingButtonProps {
  children?: ReactNode
  loading?: boolean
  buttonProps?: ButtonProps
  onLoadingText?: string
}

export default function MDButtonLoading({
  children,
  loading = false,
  buttonProps = {},
  onLoadingText = ''
}: loadingButtonProps) {
  return (
    <Button {...buttonProps} disabled={loading}>
      {loading ? (
        <>
          <CircularProgress size={'15px'} style={{ marginRight: '10px' }} /> {onLoadingText || ''}
        </>
      ) : (
        <></>
      )}
      {children}
    </Button>
  )
}
