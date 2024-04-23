import {useNavigate, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar'
import './index.css'

const SubmitAssessment = () => {
  const [marks, setMarks] = useState(0)
  const [timer, setTimer] = useState('00:00:00')
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.state === null) {
      setMarks(0)
      setTimer('00:00:00')
    } else {
      const {score, time} = location.state
      setMarks(score)
      setTimer(time)
    }
  }, [])

  const reattemptSection = () => {
    navigate('/questions')
  }
  return (
    <div>
      <Navbar />
      <div className="submit-assess-container">
        <img
          className="submit-image"
          src="https://res.cloudinary.com/dymvamc30/image/upload/v1713587725/Asset_2_1_vmgfoz.png"
          alt="submit-img"
        />
        <p className="congrats">Congrats! You completed the Assessment</p>
        <p>
          Time Taken: <span className="sub-time">{timer}</span>
        </p>
        <h3 className="your-score">
          Your Score: <span className="score">{marks}</span>
        </h3>
        <button
          className="reattempt-btn"
          type="button"
          onClick={reattemptSection}
        >
          Reattempt
        </button>
      </div>
    </div>
  )
}

export default SubmitAssessment
