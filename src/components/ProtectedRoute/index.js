import Cookies from 'js-cookie'
import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoute = () => {
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // return(
    //     <div>
    //         joiiii
    //     </div>
    // )
    if(jwtToken === undefined){
        return <Navigate to = "/login" />
    }
    return <Outlet />
}

export default ProtectedRoute