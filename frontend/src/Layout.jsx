import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <div>
            <Navbar />
            <main className='pt-14'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout