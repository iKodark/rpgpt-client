import React from 'react'

import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <div className="my-20">
          <h1 className="text-9xl font-semibold text-center">RPGPT</h1>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Auth;