import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../page/Home/Home';
import { Suspense, lazy } from 'react';
import { Loader } from '@mantine/core';
import Staff from '../page/staff/Staff';
import Employee from '../page/employee/Employee';



const Login = lazy(() => import('../page/login/Login'));
const Register = lazy(() => import('../page/registr/Register'));


export const Router = () => {

  return (
    <Suspense
      fallback={
        <div className=" w-full flex justify-center min-h-[800px] items-center">
          <Loader color="blue" />
        </div>
      }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee/:id" element={<Employee />} />
        <Route path="*" element={<Navigate to={'/'} replace />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </Suspense>
  );
};
