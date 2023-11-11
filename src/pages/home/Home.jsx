import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CarCreate } from '../../featuers/car/index'

import { Space, Button, List, Layout } from 'antd'

import { Car } from '../../featuers/car/index'
import { CarServices } from '../../featuers/services/index'
import { Preloader } from './../../featuers/preLoader/index'

import '../../style.css'

const { Header, Content } = Layout

export const Home = () => {
  const { data, isLoading } = useQuery(['cars'], () => CarServices.getAll())
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return <Preloader />
  }

  return <>
    <Space
      direction='vertical'
      size='large'
      style={{
        display: 'flex'
      }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Button type='primary' onClick={() => setIsModalOpen(true)}>CREATE NEW CAR</Button>
          <CarCreate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Header>
        <Content style={{ margin: '10px 30px' }}>
          <List
            grid={{
              gutter: 32,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4
            }}
            dataSource={data}
            renderItem={car => <List.Item><Car {...car} /></List.Item>}
          />
        </Content>
      </Layout>
    </Space>
  </>
}