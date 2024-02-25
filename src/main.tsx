import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes';
import { RouterProvider } from "react-router-dom";

import "./global.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={Routes} />
  </React.StrictMode>,
)
