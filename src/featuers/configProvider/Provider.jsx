import { ConfigProvider } from 'antd'
import { QueryClientProvider } from '@tanstack/react-query'

import {queryClient} from '../client/index'
import {Router} from '../router/index'

export const Provider = () => <>
  <ConfigProvider
    theme={{
      token: {
        colorBgLayout: '#34486a'
      }
    }}
  >
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </ConfigProvider>
</>