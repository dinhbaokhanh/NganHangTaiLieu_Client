import React, { useState } from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
      {isLogin ? (
        <div>
          <div>Login Form</div>
          <button onClick={() => setIsLogin(!isLogin)}>
            Switch to Register
          </button>
        </div>
      ) : (
        <div>
          <div>Register Form</div>
          <button onClick={() => setIsLogin(!isLogin)}>Switch to Login</button>
        </div>
      )}
    </>
  )
}

export default Login
