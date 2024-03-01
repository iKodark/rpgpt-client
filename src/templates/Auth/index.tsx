import { SwitchTheme } from '@/components/switch-theme';

import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-end w-full p-10">
          <SwitchTheme />
        </div>

        <div className="my-12">
          <h1 className="text-9xl font-semibold text-center">RPGPT</h1>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Auth;