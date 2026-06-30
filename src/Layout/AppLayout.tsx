import Sidebar from '../Components/SideBar/Sidebar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='relative flex'>
        <Sidebar/>
        <Outlet />
    </div>
  )
}

export default AppLayout