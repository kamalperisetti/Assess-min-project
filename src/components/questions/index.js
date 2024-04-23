import {useState, useEffect} from 'react'
import Navbar from '../Navbar'
import './index.css'
import { useNavigate } from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'

const Questions = () => {
  const [questionList, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [isGood, setIsGood] = useState(true)
  const [optionType, setOptionType] = useState("DEFAULT")
  const [questionNumber, setQuestionNumber] = useState(0)
  const [attemptedQuestion, setAttemptedQuestions] = useState(0)
  const [isQuestionAttempted, setIsQuestionAttempted] = useState(false)
  const [notAttemptedQuestion, setNotAttemptedQuestion] = useState(10)
  const [correct, setCorrect] = useState(false)
  const [selectedAns, setSelectedAns] =  useState(null)
  const [loader, setLoader] = useState(true)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [time, setTime] = useState(600)
  const [firstQuestion, setFirstQuestion] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const getTheQuestions = async () => {
      const url = 'https://apis.ccbp.in/assess/questions'
      const options = {
        method: 'GET',
      }
      try {
        const response = await fetch(url, options)
        const data = await response.json()
        setQuestions(data.questions)
        setFirstQuestion(data.questions[0])
        const len = data.total
        setTotalQuestions(len)
        setIsGood(true)
        setLoader(false)
      } catch (e) {
        console.log(e)
        setIsGood(false)

      }
    }
    getTheQuestions()
  }, [])

  const formatTime = tt => {
    let minutes = Math.floor(tt / 60)
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let seconds = tt % 60
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `00:${minutes.toString()}:${seconds.toString()}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(prevState => prevState - 1)
      } else {
        navigate('/timeup', {state : {score}})
        clearInterval(interval)
        
        console.log(typeof(time))
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [time])

 
  const getTheQuestionRequired = (item, index) => {
    setQuestionNumber(index)
    setFirstQuestion(questionList[index])
    setFirstQuestion(item)
  
    setIsQuestionAttempted(false)
    setOptionType(item.options_type)
  }
  const onClickingTheAnswer = item => {
    setCorrect(item.is_correct)
    setIsQuestionAttempted(true)
    setSelectedAns(item)
    
  }

  const onChangeTheAns = (event) =>{
    const obj = JSON.parse(event)
    setCorrect(obj.is_correct)
    setIsQuestionAttempted(true)
    console.log(obj.is_correct)
  }

  const getNexQuestion = () => {
    if (correct === 'true') {
      setScore(prevState => prevState + 1)
    }
    if (questionNumber < 9) {
      setQuestionNumber(questionNumber + 1)
      setFirstQuestion(questionList[questionNumber + 1])
      setOptionType(questionList[questionNumber + 1].options_type)
      setCorrect(false)
    }
    if(isQuestionAttempted){
      setAttemptedQuestions(prvState => prvState + 1)
    }
    setNotAttemptedQuestion(totalQuestions - attemptedQuestion - 1)
    setIsQuestionAttempted(false)
  }

  const imageRendering = () => {
    return(
      <div>
            {optionType === "IMAGE" && 
            <ul>
              {firstQuestion !== undefined && 
              <div className='kkkk'>
                {firstQuestion.options.map((each) =>
                <div  key = {each.id}> <img key = {each.id} 
                className = {`options-image ${selectedAns !== null && selectedAns.id === each.id && "iii"}`}
                onClick={() => onClickingTheAnswer(each)}
                src = {each.image_url} 
                alt={each.text}/> </div> 
               )}
              </div>}
            </ul>}
        </div>
    )
  }
  const selectRender = () => {
    return(
      <div> 
        {optionType === "SINGLE_SELECT" && (
          <select className='option-drop-down' onChange={(event) => onChangeTheAns(event.target.value)} defaultValue={firstQuestion.options[0].text}>
            <option>Select One</option>
            {firstQuestion.options.map((each) => (
              <option className='option' key={each.id} value={JSON.stringify(each)}>
                {each.text}
              </option>
            ))}
          </select>
        )}
    </div>
    )
  }

  const  defaultRender = () => {
    return(
      <div>
        {firstQuestion.options !== undefined && (
                <ul>
                  {firstQuestion.options.map(each => (
                    <button
                      className="ans-btn"
                      type="button"
                      key={each.id}
                      onClick={() => onClickingTheAnswer(each)}
                    >
                      {each.text}
                    </button>
                  ))}
                </ul>
              )}
      </div>
    )
  }

  const basedOntheQuestionType = () => {
    switch (optionType) {
      case ( "IMAGE"):
        return(
          <>
            {imageRendering()}
          </>
        )
      case ("SINGLE_SELECT"):
        return(
          <>
            {selectRender()}
          </>
        )
      case("DEFAULT"):
      return(
        <>
        {defaultRender()}
        </>
      )
      default:
        break
    }
  }
  const submitingTheAssessment = () => {
    navigate('/submited', {state : {score,  time: formatTime(time)}} )
  }

  const loadingSection = () => {
    return(
      <div className="loader-container" >
        <ThreeDots  color="#263868" height={50} width={50} />
      </div>
    )
  }
  
  return (
    <div>
      <Navbar />
      <div>    
        {loader ? <div className='load'>{loadingSection()}
        </div> :
       <div>
         {isGood ? 
    <div className="mcqs-main-container">
        <div className="all-con">
          <div className="time-container">
            <p>Time Left</p>
            <p>{formatTime(time)}</p>
          </div>

          <div className="submit-container">
            <div className="ans-and-uns-questions">
              <p>
                <span ><b className="ans-que">{attemptedQuestion}</b></span> Answered Questions
              </p>
              <p>
                <span className="uns-que">{notAttemptedQuestion}</span> Unanswered Questions
              </p>
            </div>

            <hr />
            <b>Questions({totalQuestions})</b>
            <ul>
              {questionList.map((each, index) => (
                <button
                  className={`question-number ${index === questionNumber && "selected-question"}`}
                  type="button"
                  key={each.id}
                  onClick={() => {
                    getTheQuestionRequired(each, index )
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </ul>
            <button className="submit-btn" type="button" 
             onClick={submitingTheAssessment}>
              Submit Assessment
            </button>
          </div>
        </div>
        <div className="question-container">
            <div >
              <div className='only-question'>
              <p className="question">{questionNumber +1}. {firstQuestion.question_text}</p>
            
                  {basedOntheQuestionType()}
            </div>
             {questionNumber !==totalQuestions-1 && <button
                className="nxtquestion-btn"
                type="button"
                onClick={getNexQuestion}
              >
                Next Question
              </button> }
              
            </div>
          
        </div>

      </div>:
      <div className='went-wrong-container'>
        {loadingSection()}
        <img className='wrong-image' src = "https://res.cloudinary.com/dymvamc30/image/upload/v1713587725/Group_7519_vfmwpx.png" alt = "Something went Wrong" />
        <h3>Oops! Something wemt wrong</h3>
        <p>We are having some trouble</p>
        <button className='wrong-retry-btn'>Retry</button>
      </div>}
        </div>}
</div>
   
      
    </div>
    
  )
}

export default Questions
