import React, { useState } from 'react'
import { api } from '../api/api'
// React Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, Form, Input, Select, Space } from 'antd';
const { Option } = Select;
import toast from 'react-hot-toast';

const Users = () => {
    // Get
    const { data } = useQuery({ queryKey: ['users'], queryFn: () => api.get("/users") });
    const users = data?.data;
    const [editUser, setEditUser] = useState(null);

    // Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        setEditUser(null);
        form.resetFields();
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Form
    const [form] = Form.useForm();
    const onFinish = values => {
        if (editUser) {
            editMutation.mutate(values);
        } else {
            addMutation.mutate(values);
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({ firstName: 'Abdulaziz', lastName: 'Ergashev', job: "SWE", country: "Uzbekistan", age: "19", gender: 'male', });
    };

    // Get Access
    const queryClient = useQueryClient();
    // Add
    const addMutation = useMutation(
        {
            mutationFn: (user => api.post("/users", user)),
            // Refetch
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] })
                toast.success("User added successfully");
                setIsModalOpen(false);
            }
        }
    );

    // Delete
    const onDelete = (id) => {
        deleteMutation.mutate(id);
    }
    const deleteMutation = useMutation(
        {
            mutationFn: (id) => api.delete(`/users/${id}`),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["users"] })
                toast.error("User deleted successfully");
            }
        }
    );


    // Edit
    const onEdit = (user) => {
        setIsModalOpen(true);
        setEditUser(user);
        form.setFieldsValue(user);
    }
    const editMutation = useMutation(
        {
            mutationFn: (user) => api.put(`users/${editUser.id}`, user),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] })
                toast.success("User edited successfully");
                setIsModalOpen(false);
            }
        }
    );


    return (
        <> {
            !users?.length && users !== undefined
                ?
                <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>
                    <p>No users found</p>
                    <div>
                        <Button className='!bg-sky-400 !border-sky-200 hover:!bg-sky-500 !text-white' onClick={showModal}>
                            Add
                        </Button>
                    </div>
                </div>
                :
                <div className="pt-[80px]">
                    <div className='users'>
                        <div className='pb-24 w-full flex flex-col gap-3 items-center justify-start'>
                            <div className='w-[1350px] flex items-center justify-end'>
                                <Button className='!bg-sky-400 !border-sky-200 hover:!bg-sky-500 !text-white' onClick={showModal}>
                                    Add
                                </Button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>N</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Gender</th>
                                        <th>Nationality</th>
                                        <th>Age</th>
                                        <th>Job</th>
                                        <th>Company</th>
                                        <th colSpan={2}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user, index) => (
                                            <tr key={user.id} className='border border-gray-600 rounded-lg'>
                                                <td>{index + 1}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td className='capitalize'>{user.gender}</td>
                                                <td>{user.country}</td>
                                                <td>{user.age}</td>
                                                <td>{user.job}</td>
                                                <td>{user.company}</td>
                                                <td><Button className='hover:!border-sky-400 !text-sky-500' onClick={() => onEdit(user)}>Edit</Button></td>
                                                <td><Button className='!bg-pink-600 !border-pink-400 hover:!bg-pink-700 !text-white' onClick={() => onDelete(user.id)}>Delete</Button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
        }
            <Modal
                title="Add a new user"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    layout='vertical'
                    className='w-full grid grid-cols-2 gap-x-2 gap-y-0'
                >
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please type your first name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please type your last name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="job" label="Job" rules={[{ required: true, message: 'Please type your job!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="country" label="Nationality" rules={[{ required: true, message: 'Please type your nationality!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please type your age!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item className='col-span-2 flex justify-end !mb-0'>
                        <Space>
                            {
                                !editUser &&
                                <Button className='!text-sky-500' type="link" htmlType="button" onClick={onFill}>
                                    Fill form
                                </Button>
                            }
                            {
                                editUser
                                    ?
                                    <Button className='hover:!border-sky-400 !text-sky-500' htmlType="button">
                                        Discard changes
                                    </Button>

                                    :
                                    <Button className='hover:!border-sky-400 !text-sky-500' htmlType="button" onClick={onReset}>
                                        Reset
                                    </Button>
                            }
                            <Button className='!bg-sky-400 !border-sky-200 hover:!bg-sky-500 !text-white' type="primary" htmlType="submit">
                                {
                                    editUser ? "Save" : "Submit"
                                }
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Users