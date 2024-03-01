import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { SwitchTheme } from "@/components/switch-theme";
import { UserRoundCog } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClickMenu = (path: string) => {
    navigate(path);
  }

  return (
    <div className="w-full flex items-center justify-between space-x-5 py-2 px-4 shadow-md">
      <SwitchTheme />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            className="w-full flex items-center space-x-2 py-1 font-medium text-zinc-500 hover:text-primary transition-colors duration-300 cursor-pointer"
            onClick={() => handleClickMenu("profile")}
          >
            <UserRoundCog size={20} />
            <span>Meu perfil</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Header;