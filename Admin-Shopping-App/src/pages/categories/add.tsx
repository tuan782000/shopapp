import { Button, Card, Form, Input, Space, message } from 'antd';
import { useState } from 'react';
import { handleCategoryAPI } from '../api/categoryAPI';

const AddNewCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const handleAddNewCategory = async (values: any) => {
        setIsLoading(true);
        const data = { ...values };
        const api = '/add-category';

        try {
            await handleCategoryAPI(api, data, 'post');
            message.success('Add new category successfully');
            form.resetFields();
            window.history.back();
        } catch (error: any) {
            console.log(error);
            error.message(message.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='col-8 offset-2'>
            <Card title='Add new category'>
                <Form
                    disabled={isLoading}
                    form={form}
                    size='large'
                    layout='vertical'
                    onFinish={handleAddNewCategory}
                >
                    <Form.Item
                        name={'title'}
                        rules={[
                            {
                                required: true,
                                message: 'title is required'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Title'
                            allowClear
                            maxLength={150}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        name={'Description'}
                        rules={[
                            {
                                required: true,
                                message: 'Description is required'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Description'
                            allowClear
                            maxLength={150}
                            showCount
                        />
                    </Form.Item>
                </Form>
                <div className='text-end mt-4'>
                    <Space>
                        <Button
                            disabled={isLoading}
                            type='primary'
                            ghost
                            danger
                            style={{ padding: '20px 40px' }}
                            onClick={() => form.resetFields()}
                        >
                            Reset all fields
                        </Button>

                        <Button
                            disabled={isLoading}
                            type={'primary'}
                            style={{ padding: '20px 40px' }}
                            onClick={() => form.submit()}
                        >
                            Publish
                        </Button>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default AddNewCategory;
