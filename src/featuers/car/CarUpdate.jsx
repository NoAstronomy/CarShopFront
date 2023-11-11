import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Modal, Popconfirm, Button, message } from 'antd'

import { CarServices } from '../services/index'
import { CarForm } from '../carForm/index'

export const CarUpdate = ({ isModalOpen, setIsModalOpen, car }) => {
    debugger
    const queryClient = useQueryClient()
    const { mutate } = useMutation(['update car'], (data) => CarServices.update(car.id, data))
    const { id: _, ...formValues } = car
    const { reset, getValues, control, formState: { errors } } = useForm({
        mode: 'onChange',
        values: formValues
    })

    const updateCar = () => {
        const data = getValues()

        if (Object.values(data).some(x => !x)) {
            message.error('Can not update car. Enter all input fields!')
        } 
        else {
            mutate(data, {
                onSuccess: () => {
                    queryClient.invalidateQueries('car')
                    queryClient.invalidateQueries('cars')
                    reset()
                    setIsModalOpen(false)
                }
            })
        }
    }

    return <>
        <Modal
            footer={[
                <Button key='cancel' onClick={() => setIsModalOpen(false)}>Cancel</Button>,
                <Popconfirm
                    key='update'
                    title='Update the car'
                    description='Are you sure to update this car?'
                    onConfirm={updateCar}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button key='ok' type='primary'>Ok</Button>
                </Popconfirm>
            ]}
            title="Car"
            open={isModalOpen}
            onOk={updateCar}
            onCancel={() => setIsModalOpen(false)}
        >
            <CarForm control={control} errors={errors} />
        </Modal>
    </>
}