import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const TimeUp = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {score} = location.state
    console.log(score)
    const reattemptTest = () => {
        navigate("/questions")
    }
    return(
        <div className='timeup-container'>
            <Navbar />
            <div className='timeup-sub-con'>
                <img className='time-img' src = "https://res.cloudinary.com/dymvamc30/image/upload/v1713587725/calender_1_1_dy3gss.png" alt = "Time up" />
                <p>Time is up</p>
                <p className='context'>did not compliete the assessment within the time.</p>
                <h3 className='scorrrr'>Your Score: {score}</h3>
                <button className='reatempt' onClick={reattemptTest}>Reattempt</button>
            </div>
        </div>
    )
}

export default TimeUp