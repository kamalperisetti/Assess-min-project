import './index.css'
import {useState} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPasword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()
  console.log(username)
  const toTheLoginPage = async () => {
    const url = 'https://apis.ccbp.in/login'
    const optinos = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    try {
      const response = await fetch(url, optinos)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token)
        navigate("/")
      } else {
        setErrMsg(data.error_msg)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const showPassword = () => {
    setShowPass(prevState => !prevState)
  }
  return (
    <div className="login-main-container">
      <div className="login-container">
        <img
          className="logo-image"
          src="https://res.cloudinary.com/dymvamc30/image/upload/v1713336875/samples/image_28_Traced_gbeyjm.png"
          alt="Logo"
        />
        <img
          className="assess-image"
          src="https://res.cloudinary.com/dymvamc30/image/upload/v1713337842/samples/NXT_Assess_diyloz.png"
          alt="NXT Assess"
        />
        <label className="username" htmlFor="name">
          Username
        </label>
        <input
          className="input"
          id="name"
          value={username}
          type="text"
          placeholder="Username"
          onChange={e => {
            setUserName(e.target.value)
            setErrMsg('')
          }}
        />
        <label className="username" htmlFor="password">
          Password
        </label>

        <input
          className="input"
          id="password"
          value={password}
          type={showPass ? "text" : "password"}
          placeholder="Password"
          onChange={e => {
            setPasword(e.target.value)
            setErrMsg('')
          }}
        />
        <div className="show-password">
          <input id="check" type="checkbox" onChange={showPassword}/>
          <label htmlFor="check">Show Password</label>
        </div>
        <button className="login-btn" type="button" onClick={toTheLoginPage}>
          Login
        </button>
        <p className="error">{errMsg}</p>
      </div>
    </div>
  )
}

export default Login
