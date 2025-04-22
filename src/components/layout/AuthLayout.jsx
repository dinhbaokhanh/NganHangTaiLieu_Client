import { Outlet } from 'react-router-dom'
import LoginBg from '../../assets/login_background.jpg'
import Title from '../shared/Title'

const AuthLayout = () => {
  return (
    <div
      style={{ backgroundImage: `url(${LoginBg})` }}
      className="flex items-center justify-center min-h-screen px-4 bg-cover bg-center bg-no-repeat"
    >
      <Title />
      <div className="bg-white p-6 sm:p-8 border border-gray-500 w-full max-w-[400px] shadow-lg mx-4 rounded-md">
        <h2 className="text-red-600 text-center text-lg font-sans font-bold">
          PTIT DOCUMENTS
        </h2>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
