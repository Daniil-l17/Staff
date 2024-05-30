import { Button, Input, Modal } from '@mantine/core';
import { ButtonCustom } from '../../ui/button/Button';
import { useState } from 'react';

const positions = [
  'Front-end',
  'Back-end',
  'Дизайнер',
  'Тестировщик',
  'Аналитик',
  'Верстальщик',
  'Team Lead',
] as const;

export default function ModalCreate({
  opened,
  close,
  loading,
  addEmployee,
}: {
  opened: boolean;
  close: () => void;
  loading: boolean;
  addEmployee: (obj: {
    firstName: string;
    lastName: string;
    age: string;
    position: string;
    address: string;
  }) => void;
}) {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    age: '',
    position: '',
    address: '',
  });



  const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal
      size={'lg'}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      opened={opened}
      onClose={close}
      title="Добавить сотрудника"
      centered>
      <div className="flex flex-col gap-4 mt-2">
        <Input onChange={changeInfo} name="firstName" variant="filled" placeholder="Имя" />
        <Input onChange={changeInfo} name="lastName" variant="filled" placeholder="Фамилия" />
        <Input onChange={changeInfo} name="age" variant="filled" placeholder="Возраст" />
        <div className="flex flex-col mb-2 gap-2">
          <h2>Должность</h2>
          <div className="flex justify-start gap-3 flex-wrap">
            {positions.map(position => (
              <Button
                onClick={() => setUserInfo(prev => ({ ...prev, position }))}
                color={userInfo.position === position ? 'green' : 'blue'}>
                {position}
              </Button>
            ))}
          </div>
        </div>
        <Input onChange={changeInfo} name="address" variant="filled" placeholder="Адрес" />
      </div>
      <div className="flex mt-3 justify-end">
        <ButtonCustom
          isDisabled={loading}
          click={() => addEmployee(userInfo)}
          title="Добавить"
          width={140}
        />
      </div>
    </Modal>
  );
}
