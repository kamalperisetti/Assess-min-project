import {useLocation, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar'
import './index.css'

const TimeUp = () => {
  const [marks, setMarks] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.state === null) {
      setMarks(0)
      console.log('Jiii')
    } else {
      const {score} = location.state
      setMarks(score)
    }
  }, [])
  console.log('Hii')

  const reattemptTest = () => {
    navigate('/questions')
  }

  return (
    <div className="timeup-container">
      <Navbar />
      <div className="timeup-sub-con">
        <img
          className="time-img"
          src="https://res.cloudinary.com/dymvamc30/image/upload/v1713587725/calender_1_1_dy3gss.png"
          alt="Time up"
        />
        <p>Time is up</p>
        <p className="context">
          did not compliete the assessment within the time.
        </p>
        <h3 className="scorrrr">Your Score: {marks}</h3>
        <button type="button" className="reatempt" onClick={reattemptTest}>
          Reattempt
        </button>
      </div>
    </div>
  )
}

export default TimeUp
