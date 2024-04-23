import './index.css'
import Navbar from '../Navbar'
import {useNavigate} from 'react-router-dom'

const Instructions = () => {

  const navigate = useNavigate()

  const startAssessmentPage = () => {
    navigate("/questions")
  }
  return (
    <div>
       <Navbar />
      <div className="main-assessment-container">
      <div className="assessment-container">
        <div className="image-">
          <img
            className="assessment-image"
            src="https://res.cloudinary.com/dymvamc30/image/upload/v1713349197/samples/Group_1_hueb07.png"
            alt="imag"
          />
        </div>
        <div className="instruction-container">
          <p className="instruction">Instructions</p>
          <p className="instruction-points">1. Total Questions: 10</p>
          <p className="instruction-points">2. Types of Questions: MCQs</p>
          <p className="instruction-points">3. Duration: 10 Mins</p>
          <p className="instruction-points">
            4. Marking Scheme: Every Correct response, get 1 mark
          </p>
          <p className="instruction-points">
            5. All the progress will be lost, if you reload during the
            assessment
          </p>
          <button className="start-assessment-btn" type="button" onClick={startAssessmentPage}>
            Start Assessment
          </button>
        </div>
      </div>
    </div>
    </div>
    
  )
}
export default Instructions
