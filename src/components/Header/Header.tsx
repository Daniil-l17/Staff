import { useNavigate } from 'react-router-dom';
import { ButtonCustom } from '../../ui/button/Button';
import { useAuth } from '../../zustand/zustand';
import { toast } from 'react-toastify';

export const Header = () => {
  const navigate = useNavigate();

  const { token, addToken } = useAuth();



  return (
    <header className="flex items-center justify-between py-4 px-4 w-full max-w-[1600px] m-auto">
      <h1 onClick={() => navigate('/')} className=" cursor-pointer text-[32px]">
        Сотрудники
      </h1>
      {token ? (
        <div className="flex items-center gap-8">
          <h2 className=" cursor-pointer text-lg font-medium" onClick={() => navigate('/staff')}>
            Сотрудники
          </h2>
          <div className="flex mt-1 gap-3 cursor-pointer items-center" onClick={() => {addToken(''),toast.error('Вы вышли с аккаунта')}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 hoverLogo ">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex h-[34px] gap-8">
          <ButtonCustom link="/login" title="войти" />
          <ButtonCustom link="/register" title="Создать аккаунт" />
        </div>
      )}
    </header>
  );
};
