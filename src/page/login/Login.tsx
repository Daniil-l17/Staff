import { Auth } from '../../components/auth/Auth';
import { useLocation } from 'react-router-dom';


export default function Login () {
  const {pathname} = useLocation()
  return (
    <Auth url={pathname} />
  );
};
