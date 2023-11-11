import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../../pages/home/index'
import {NotFound} from '../../pages/notFound/index'

export const Router = () => <>
    <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/' />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
</>