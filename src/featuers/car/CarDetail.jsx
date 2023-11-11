import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal, Button, Popconfirm, message } from 'antd'
import Meta from 'antd/es/card/Meta'

import { CarServices } from '../services/index'
import { Price } from '../price/index'
import { Preloader } from '../preLoader/index'
import { CarUpdate } from './index'

import style from '../../featuers/car/Car.module.css'

const CartDetailModal = ({ isModalOpen, setIsModalOpen, id }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data } = useQuery(['car'], () => CarServices.getById(id))
  const { mutate } = useMutation(['delete car'], id => CarServices.delete(id))

  if (isModalOpen && !data?.name) {
    return <><Preloader /></>
  }

  const deleteCar = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('cars')
        message.success('Car deleted!')
        setIsModalOpen(false)
      }
    })
  }

  return <>
    <Modal
      footer={[
        <Popconfirm
          key='delete'
          title='Delete the car'
          description='Are you sure to delete this car?'
          onConfirm={deleteCar}
          okText='Yes'
          cancelText='No'
        >
          <Button key='delete' danger>Delete</Button>,
        </Popconfirm>,
        <Button key='update' onClick={() => setIsUpdateModalOpen(true)}> Update Info</Button>,
        <Button key='ok' onClick={() => setIsModalOpen(false)} type='primary'>Ok</Button>
      ]}
      title={data?.name}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      width={1600}
    >
      <div className={style.carImg} style={{
        backgroundImage: `url(${data?.image})`,
        width: 1500,
        height: 800,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',

      }} />
      <Meta title={<Price price={data?.price} />} description={data?.description || 'No description'} />
    </Modal>
    <CarUpdate isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} car={data} />
  </>
}

export const CarDetail = ({ isModalOpen, setIsModalOpen, id }) => isModalOpen
  ? <CartDetailModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id} />
  : <></>