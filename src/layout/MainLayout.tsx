
import { ToastContainer } from 'react-toastify';
import { Header } from '../components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <>
    <ToastContainer />
      <Header />
      {children}
    </>
  );
};
