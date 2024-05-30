import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@mantine/core';
import { axiosBase } from '../../config/axiosBase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../zustand/zustand';
import { toast } from 'react-toastify';

type dto = { email: string; password: string; name?: string };
type resultDto = { id?: string; email: string; name?: string; token: string };
export const Auth = ({ url }: { url: string }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [passwor, setPasswor] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { addToken,token } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<dto>({
    defaultValues: {},
  });

  useEffect(() => {
    if (isAuthUser || token) {
      navigate('/staff',{replace:true});
    }
  }, [isAuthUser,token]);





  const onSubmit: SubmitHandler<dto> = async data => {
    setLoading(true);
    if (url === '/register') {
      setErrorPassword(false);
      if (data.password === passwor) {
        try {
          const result = (await axiosBase.post<resultDto>('/user/register', data)).data;
          if ('token' in result) {
            addToken(result.token);
            setIsAuthUser(true);
          }
        } catch {
          setError(true);
          toast.error('Ошибка при регестрации');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setErrorPassword(true);
      }
    } else if (url === '/login') {
      try {
        const result = (await axiosBase.post<resultDto>('/user/login', data)).data;
        if ('token' in result) {
          addToken(result.token);
          setIsAuthUser(true);
        }
        toast.success('Вы вошли в аккаунт');
      } catch {
        setError(true);
        toast.error('Проверьте данные');
      } finally {
        setLoading(false);
      }
    }
  };

    if(token) return null

  return (
    <div className=" flex items-center min-h-[800px]">
      <form
        style={{ border: '1px solid #333' }}
        className="flex flex-col px-4 py-4 rounded-xl m-auto max-w-[500px] w-full min-h-[300px]"
        onSubmit={handleSubmit(onSubmit)}>
        <h2>{url !== '/login' ? 'Регестрация' : 'Вход'}</h2>
        <div className={`flex ${Object.keys(errors).length ? 'gap-4' : 'gap-6'} flex-col mt-8`}>
          {url !== '/login' ? (
            <>
              {' '}
              <div>
                <Input
                  {...register('name', { required: 'Имя не должно быть пустое' })}
                  variant="filled"
                  placeholder="Имя"
                />
                {errors.name && (
                  <p className=" mt-1 text-red-600 font-medium">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register('email', { required: 'Введите корректный email' })}
                  variant="filled"
                  placeholder="email"
                />
                {errors.email && (
                  <p className=" mt-1 text-red-600 font-medium">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register('password', { required: 'Пороль должен быть больше 6 символов' })}
                  variant="filled"
                  type="password"
                  placeholder="password"
                />
                {errors.password && (
                  <p className=" mt-1 text-red-600 font-medium">{errors.password.message}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <Input
                  {...register('email', { required: 'Введите корректный email' })}
                  variant="filled"
                  placeholder="email"
                />
                {errors.email && (
                  <p className=" mt-1 text-red-600 font-medium">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register('password', { required: 'Пороль должен быть больше 6 символов' })}
                  variant="filled"
                  type="password"
                  placeholder="password"
                />
                {errors.password && (
                  <p className=" mt-1 text-red-600 font-medium">{errors.password.message}</p>
                )}
              </div>
            </>
          )}
          {url !== '/login' && (
            <div>
              <Input
                type="password"
                value={passwor}
                onChange={e => setPasswor(e.target.value)}
                variant="filled"
                placeholder="подвердите пороль"
              />
              {errorPassword && (
                <p className=" mt-1 text-red-600 font-medium">Пороли не совпадают</p>
              )}
            </div>
          )}
        </div>
        {url !== '/login' && error ? (
          <p className="mt-2 text-red-600 font-medium">Ошибка при создание аккаунта</p>
        ) : url !== '/register' && error ? (
          <p className="mt-2 text-red-600 font-medium">Такого пороля или почты не существует</p>
        ) : null}
        <div className="flex py-3 px-3 mt-4 flex-1 items-end justify-end">
          <button hidden ref={ref}></button>
          <Button
            loading={loading}
            onClick={() => ref.current?.click()}
            w={url !== '/login' ? 180 : 120}>
            {url !== '/login' ? 'Создать аккаунт' : 'Войти'}
          </Button>
        </div>
      </form>
    </div>
  );
};
