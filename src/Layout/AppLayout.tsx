import Sidebar from '../Components/SideBar/Sidebar'
import { Outlet } from 'react-router-dom'
import type { dataProp } from '../data/data'
import type React from 'react'

export interface getData {
  Data: dataProp[],
  setData: React.Dispatch<React.SetStateAction<dataProp[]>>
}

const AppLayout: React.FC<getData> = ({ Data, setData }) => {
  return (
    <div className='relative flex'>
      <Sidebar Data={Data} setData={setData} />
      <Outlet />
    </div>
  )
}

export default AppLayout