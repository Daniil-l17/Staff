import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../zustand/zustand";
import { Loader, Table } from "@mantine/core";
import { ButtonCustom } from "../../ui/button/Button";
import { axiosBase } from "../../config/axiosBase";
import { useDisclosure } from "@mantine/hooks";
import ModalCreate from "../../components/modalcreate/ModalCreate";
import { toast } from "react-toastify";

export type DataType = {
    id?: string;
    firstName: string;
    lastName: string;
    age: string;
    position: string;
    address: string;
    userId?: string;
};

export default function Staff() {
    const { token } = useAuth();
    const naavigate = useNavigate();
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (!token) {
            naavigate("/");
        }
    }, [token]);

    useEffect(() => {
        setLoading(true);
        async function fun() {
            try {
                const result = (
                    await axiosBase.get<DataType[]>("/employees", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ).data;
                setData(result);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fun();
    }, []);

    const addEmployee = async (obj: {
        firstName: string;
        lastName: string;
        age: string;
        position: string;
        address: string;
    }) => {
        setLoading(true);
        try {
            const result = (
                await axiosBase.post("/employees/add", obj, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).data;
            setData(prev => [...prev, result]);
            close();
            toast.success("Пользователь добавлен");
        } catch {
            toast.error("Проверьте вся поля");
        } finally {
            setLoading(false);
        }
    };

    if (!token) return null;

    return (
        <div className="w-full !px-4 m-auto max-w-[1600px] mt-10">
            <div className=" mb-6">
                <ButtonCustom
                    click={open}
                    title="добавить сотрудника"
                    width={180}
                />
            </div>
            <ModalCreate
                loading={loading}
                addEmployee={addEmployee}
                opened={opened}
                close={close}
            />
            <Table striped withRowBorders={true}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Имя</Table.Th>
                        <Table.Th>Фамилия</Table.Th>
                        <Table.Th>Возраст</Table.Th>
                        <Table.Th>Адрес</Table.Th>
                        <Table.Th>Должность</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map(element => (
                        <Table.Tr
                            onClick={() => naavigate(`/employee/${element.id}`)}
                            className=" hover:bg-[#373c47] cursor-pointer"
                            key={element.id}
                        >
                            <Table.Td>{element.firstName}</Table.Td>
                            <Table.Td>{element.lastName}</Table.Td>
                            <Table.Td>{element.age}</Table.Td>
                            <Table.Td>{element.address}</Table.Td>
                            <Table.Td>{element.position}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            {loading && !data.length ? (
                <div className="w-full min-h-[400px] items-center flex justify-center">
                    <Loader color="blue" />
                </div>
            ) : null}
            {!loading && !data.length && !error ? (
                <div className=" mt-4 w-full">
                    <h2 className=" text-2lg text-center">
                        Сотрудников не найденно
                    </h2>
                </div>
            ) : null}
            {error && (
                <div className=" mt-10 w-full">
                    <h2 className=" text-red-500 font-medium text-2lg text-center">
                        Ошибка
                    </h2>
                </div>
            )}
        </div>
    );
}
