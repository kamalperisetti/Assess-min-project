import {useNavigate} from 'react-router'
import "./index.css"
const PageNotFound = () => {
    const navigate = useNavigate()
    const moveToHomePage = () => {
        navigate("/")
    }
    return(
        <div className="not-found">
            <img className="not-found-img" src="https://res.cloudinary.com/dymvamc30/image/upload/v1713587725/Group_7504_v11qxz.png" alt = "Page Not Found" />
            <button className='home-btn' type = "buttom" onClick = {moveToHomePage}>Home</button>
        </div>
    )
}

export default PageNotFound