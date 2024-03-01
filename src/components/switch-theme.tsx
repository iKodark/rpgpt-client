import * as SwitchPrimitives from "@radix-ui/react-switch"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Switch } from "./ui/switch"

const SwitchTheme = () => {

  const { setTheme, theme } = useTheme();

  const handleChangeTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  }

  return (
    <Switch
      icons={{
        checked: {
          icon: Sun,
          iconProps: {
            color: "#060614",
            size: 12
          }
        },
        unchecked: {
          icon: Moon,
          iconProps: {
            color: "#060614",
            size: 12
          }
        }
      }}
      defaultChecked={theme === "dark"}
      onCheckedChange={handleChangeTheme}
    />
  )
}

SwitchTheme.displayName = SwitchPrimitives.Root.displayName

export { SwitchTheme }
