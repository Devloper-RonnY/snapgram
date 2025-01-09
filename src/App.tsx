import AuthLayout from './_auth/forms/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home } from './_root/pages'
import './globals.css'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Routes>
          <Route element={<AuthLayout />}/>
        <Route path='/sign-in' element={<SigninForm />} />
        <Route path='/sign-up' element={<SignupForm />} />
        </Routes>

        {/* Private Routes */}
        <Route element={<AuthLayout />}>
        <Route index element={<Home />}/>
        </Route>
      </Routes>
    </main>
  )
}

export default App