import { createContext, useContext, useState } from "react"

interface ThemeContext {
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
}

const ThemeContext = createContext<ThemeContext>({
  theme: "light",
  setTheme: () => {},
})

export const ThemeProvider: React.FC<{
  attribute: string
  defaultTheme: "light" | "dark"
  enableSystem: boolean
  disableTransitionOnChange: boolean
  children: React.ReactNode
}> = ({ children, attribute, defaultTheme, enableSystem, disableTransitionOnChange }) => {
  const [theme, setTheme] = useState(defaultTheme)

  const systemTheme = enableSystem
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : null

  const effectiveTheme = systemTheme || theme

  return (
    <ThemeContext.Provider value={{ theme: effectiveTheme, setTheme }}>
      <div className={`${attribute}=${effectiveTheme}`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

