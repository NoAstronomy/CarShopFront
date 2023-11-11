import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Empty, Modal, message } from 'antd'

import { CarServices } from '../services/index'
import { CarForm } from '../carForm/index'

export const CarCreate = ({ isModalOpen, setIsModalOpen }) => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation(['create car'], (data) => CarServices.create(data))
    const { reset, getValues, control, formState: { errors } } = useForm({
        mode: 'onChange'
    })

    const createCar = () => {
        const data = getValues()

        if (Object.values(data).some(x => !x)) {
            message.error('Can not create car. Enter all input fields!')
        }
        else {
            mutate(data, {
                onSuccess: () => {
                    queryClient.invalidateQueries('cars')
                    reset()
                    setIsModalOpen(false)
                }
            })
        }
    }

    return <>
        <Modal
            title='Car'
            open={isModalOpen}
            onOk={createCar}
            onCancel={() => setIsModalOpen(false)}
        >
            <CarForm control={control} errors={errors} />
        </Modal>
    </>
}