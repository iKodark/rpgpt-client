import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils"

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme()

  const [expanded, setExpanded] = React.useState(true);

  const currentRoute = location.pathname.split("/")[2] || "";

  const handleToggleExpanded = () => {

    setExpanded(!expanded)
  }

  const handleClickMenu = (path: string) => {
    navigate(path);
  }

  const ExpandedIcon = expanded ? ArrowLeftToLine : ArrowRightToLine;

  return (
    <div className="flex min-h-screen w-fit">
      <div
        className={cn(
          "h-full shadow-md space-y-5 py-2 px-2 transition-[width] duration-1000",
          expanded ? "w-[300px]" : "w-[50px]"
        )}
      >
        <div
          className={cn(
            "w-full flex items-center justify-start space-x-3 px-6 py-2 transition-all duration-1000",
            expanded ? "px-6 justify-start" : "px-0 justify-center"
          )}
        >
          <img
            className={cn(
              expanded ? "w-10" : "w-10"
            )}
            src={theme === "dark" ? "/logo_orange.png" : "/logo.png"}
          />
          {
            expanded && <h1 className="text-3xl font-semibold text-center">RPGPT</h1>
          }
        </div>
        <div className="relative w-full space-y-2">
          {
            Object.entries(routes.dashboard.children).map(([key, value]) => {
              const path = `/dashboard${value.path}`;
              const isActive = currentRoute === `${value.path.split("/")[1] || ""}`;
              const Icon = value.icon;

              return (
                <a
                  key={key}
                  className={cn(
                    "w-full flex items-center space-x-4 px-6 py-1 font-medium text-zinc-500 hover:text-primary transition-colors duration-1000 cursor-pointer",
                    isActive && "text-primary hover:text-primary",
                    expanded ? "px-6 justify-start" : "px-0 justify-center"
                  )}
                  onClick={() => handleClickMenu(path)}
                >
                  <Icon size={expanded ? 24 : 28} />
                  {
                    expanded && <span>{value.label}</span>
                  }
                </a>
              )
            })
          }
        </div>
      </div>
      <div
        className={cn(
          "absolute flex items-center h-full transition-all duration-1000",
          expanded ? "left-[calc(300px)]" : "left-[calc(50px)]"
        )}
      >
        <div
          className="flex items-center justify-center shadow-md h-14 w-5 rounded-br-full rounded-tr-full text-primary font-semibold"
          onClick={handleToggleExpanded}
        >
          {
            <ExpandedIcon size={16} strokeWidth={3} />
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar;