import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataType } from '../staff/Staff';
import { axiosBase } from '../../config/axiosBase';
import { useAuth } from '../../zustand/zustand';
import { Button, Input, Loader, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';

const Employee = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType>({} as DataType);
  const [error, setError] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { token } = useAuth();
  const [copy, setCopy] = useState<DataType>({} as DataType);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    async function fun() {
      try {
        const data = (
          await axiosBase.get(`employees/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;
        if (data) {
          setData(data);
          setCopy(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fun();
  }, []);

  const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      navigate('/staff');
    }
  }, [error]);

  const deleteEmployee = async () => {
    try {
      await axiosBase.post(
        `/employees/remove/${data.id}`,
        { id: data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Сотрудник удален');
      navigate('/staff');
    } catch {
      toast.error('Ошибка');
    }
  };

  const updateEmployee = async () => {
    const newInfo = { ...data };
    delete newInfo.userId;
    if (
      copy.address === data.address &&
      copy.age === data.age &&
      copy.firstName === data.firstName &&
      data.lastName === copy.lastName &&
      copy.position === data.position
    ) {
      return toast.error('Вы ничего не изменили');
    }
    try {
      await axiosBase.put(`/employees/edit/${data.id}`, newInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Сотрудник был изменен');
      navigate('/staff');
    } catch {
      toast.error('Ошибка');
    }
  };

  if (!token) return null;

  if (loading)
    return (
      <div className=" w-full flex justify-center items-center min-h-[250px]">
        <Loader color="blue" />
      </div>
    );

  return (
    <div className=" min-h-[350px] m-auto w-full max-w-[1600px] justify-center flex flex-col px-4">
      <h2 className=" mb-4">
        Сотрудник {copy.firstName} {copy.lastName}{' '}
      </h2>
      <Modal
        opened={opened}
        onClose={close}
        title={`Удалить сотрудника ${copy.firstName}?`}
        centered>
        <div className="flex gap-4 justify-end">
          <Button onClick={close} color="blue">
            Отменить
          </Button>
          <Button onClick={deleteEmployee} color="red">
            Удалить
          </Button>
        </div>
      </Modal>
      <div className="flex flex-col gap-4">
        <Input
          autoFocus
          name="firstName"
          value={data.firstName}
          onChange={changeInfo}
          variant="filled"
        />
        <Input name="lastName" value={data.lastName} onChange={changeInfo} variant="filled" />
        <Input name="age" value={data.age} onChange={changeInfo} variant="filled" />
        <Input name="position" value={data.position} onChange={changeInfo} variant="filled" />
        <Input name="address" value={data.address} onChange={changeInfo} variant="filled" />
      </div>
      <div className="flex justify-between mt-5">
        <Button onClick={updateEmployee} color="blue">
          Обновить работника
        </Button>
        <Button onClick={open} color="red">
          Удалить работника
        </Button>
      </div>
    </div>
  );
};

export default Employee;
