'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

interface IProps {
  children: React.ReactNode
}

const Providers:React.FC<IProps> = ({children}) => {
  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
export default Providers;