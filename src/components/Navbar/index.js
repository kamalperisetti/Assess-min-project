import Cookies from 'js-cookie'
import './index.css'

const Navbar = () => {
  const logOut =() => {
    Cookies.remove('jwt_token')
    window.location.reload()
  }
  return(
    <nav className="nav-container">
      <div className="nav-image-container">
        <img
          className="nav-logo-image"
          src="https://res.cloudinary.com/dymvamc30/image/upload/v1713348212/samples/Group_8004_zhjlmk.png"
          alt="Logo"
        />
        <img
          className="nav-assess-image"
          src="https://res.cloudinary.com/dymvamc30/image/upload/v1713337842/samples/NXT_Assess_diyloz.png"
          alt="NXT Assess"
        />
      </div>
      <div>
        <button onClick={logOut} className="logout-btn" type="button">
          Logout
        </button>
      </div>
    </nav>
  )
}
  
  export default Navbar
  