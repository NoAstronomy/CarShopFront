import { Spin } from 'antd'
import style from './Preloader.module.css'

export const Preloader = () => <div className={style.preloader}>
    <Spin />
</div>