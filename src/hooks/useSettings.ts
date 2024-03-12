import { useContext } from 'react'
import { SettingsContext, SettingsContextValue } from '@/types/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
