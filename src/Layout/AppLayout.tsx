import Sidebar from '../Components/SideBar/Sidebar'
import { Outlet } from 'react-router-dom'
import type { dataProp } from '../data/data'
import type React from 'react'

export interface getData {
  Data: dataProp[],
  setData: React.Dispatch<React.SetStateAction<dataProp[]>>,
  isLoading: boolean,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AppLayout: React.FC<Omit<getData,'isLoading'>> = ({ Data, setData ,isOpen,setIsOpen }) => {
  return (
    <div className='relative flex'>
      <Sidebar Data={Data} setData={setData} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Outlet />
    </div>
  )
}

export default AppLayout