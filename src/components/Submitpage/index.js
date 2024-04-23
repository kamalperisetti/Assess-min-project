import Navbar from '../Navbar'
import './index.css'
import {useNavigate, useLocation} from 'react-router-dom'

const SubmitAssessment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {score, time} = location.state
    console.log(time)
    const reattemptSection = () => {
        navigate('/questions')
    }
    return(
        <div>
            <Navbar />
            <div className='submit-assess-container'>
                <img className='submit-image' src = 'https://res.cloudinary.com/dymvamc30/image/upload/v1713587725/Asset_2_1_vmgfoz.png' alt = "submit-img" />
                <p className='congrats'>Congrats! You completed the Assessment</p>
                <p>Time Taken: <span className='sub-time'>{time}</span></p>
                <h3 className='your-score'>Your Score: <span className='score'>{score}</span></h3>
                <button className='reattempt-btn' type = 'button' onClick={reattemptSection}>Reattempt</button>
            </div>
        </div>
            
    )
}

export default SubmitAssessment