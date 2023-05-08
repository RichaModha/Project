import React,{useState,useEffect} from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import './Style.css';
//import { Navigate } from "react-router-dom";

function LoginForm()
{
    const[loginUsername,setLoginUsername]=useState("");
    const[loginPassword,setLoginPassword]=useState("");
    const[errorMessage,setErrorMessage]=useState("");
    // const[loginState, setLoginState] = useState("")
    const navigate = useNavigate();
    
    const login = async (e) => {
        e.preventDefault();
        // This where we would have our post method
        //console.log({ loginUsername, loginPassword })
        const data = { loginUsername, loginPassword }
        await axios.post('http://localhost:8080/login', data)
            .then(res=>
            {
                //console.log(res.data);
                if(res.status===200)
                {
                    setErrorMessage("");
                    //console.log(res.data['user_id']);
                    navigate(`/coopschedule/${res.data['user_id']}`)
                }
               else
                {
                   setErrorMessage("Login unsuccessful. Try again!");
                }
            }
            )
            .catch(error => {
                setErrorMessage("Login unsuccessful. Try again!");
            })
    }

    return(
        <div class="loginform">
            <form onSubmit={login}>
                <h2>Sign in</h2>
                <label>Username : </label><input onChange={e=>setLoginUsername(e.target.value)} required/><br></br>
                <label>Password : </label><input onChange={e=>setLoginPassword(e.target.value)} required/><br></br><br></br>
                <button type="submit">Sign in</button>
            </form>
            {/* <button type="submit" onClick={login}>Sign in</button> */}
            {errorMessage?<p>{errorMessage}</p>:null}
        </div>
    )
}

export default LoginForm;