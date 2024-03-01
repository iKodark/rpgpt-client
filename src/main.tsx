import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes';
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

import "./global.css"

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="rpgpt-ui-theme">
        <RouterProvider router={Routes} />
        <Toaster
          position='top-right'
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'flex items-center space-x-2 p-2 rounded w-full',
              error: 'bg-red-300',
              success: 'bg-green-300',
              warning: 'bg-yellow-300',
              info: 'bg-blue-300',
              closeButton: '!bg-zinc-950 !text-white'
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
