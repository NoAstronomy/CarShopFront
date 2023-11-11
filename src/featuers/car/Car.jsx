import { useState } from 'react'
import { Button, Card } from "antd"
import Meta from 'antd/es/card/Meta'

import { Price } from '../price/index'
import { CarDetail } from './index'

import style from './Car.module.css'


export const Car = ({ id, name, image, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return <>
    <Card
      hoverable={false}
      title={name}
      cover={<div className={style.carImg} style={{
        backgroundImage: `url(${image})`,
        width: '99.5%',
        height: '10rem',
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto'
      }} />}
    >
      <Meta title={<Price price={price} />} />
      <Button style={{ marginTop: '1em' }} onClick={() => setIsModalOpen(true)}> Read more</Button>
    </Card>
    <CarDetail isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id} />
  </>
}