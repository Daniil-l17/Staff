import { useLocation } from "react-router-dom"
import { Auth } from "../../components/auth/Auth"


export default function Register () {
  const {pathname} = useLocation()
  return (
    <Auth url={pathname} />
  )
}
