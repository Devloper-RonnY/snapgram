import LeftSideBar from '@/components/shared/leftSideBar'
import Topbar from '@/components/shared/Topbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSideBar />

      <section className='flex flex-1 h-full'>
      <Outlet />
      </section>
      
    </div>
  )
}

export default RootLayout