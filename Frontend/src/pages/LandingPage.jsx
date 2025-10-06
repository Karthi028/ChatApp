import Navbar from "../components/Navbar"
import { Outlet } from "react-router"
import { useThemeStore } from "../store/useThemeStore"

const LandingPage = () => {
  const { theme } = useThemeStore()
  return <div data-theme={theme}>
    <Navbar />
    <Outlet />
  </div>
}

export default LandingPage