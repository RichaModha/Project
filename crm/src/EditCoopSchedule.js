import React,{useState,useEffect} from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Style.css';
//const id='';

function EditCoopSchedule()
{
    const navigate = useNavigate();
    const {id,schedule_id,weekday,subject} = useParams();
    const[inputWeekday,setInputWeekday]=useState(weekday);
    const[inputSubject,setInputSubject]=useState(subject);
    const[errorMessage,setErrorMessage]=useState("");
    const[successMessage,setSuccessMessage]=useState("");

    const save = async(e) => {
        const data = { schedule_id, inputWeekday, inputSubject }
        console.log(data);
        await axios.put('http://localhost:8080/update_schedule',data)
            .then(res=>
            {
                //console.log(res.data);
                setSuccessMessage("Schedule updated successfully!");
            })
            .catch(error => {
                setErrorMessage("Error! Try again.");
            })
    }

    const cancel = () => {
        console.log(id);
        navigate("/coopschedule/"+id);
    }
    
    const logout = () => {
        navigate("/");
    }

    return(
        <div>
        <div class="updateschedule">
            <h1>Update My Coop Schedule</h1>
            Weekday :<input value={inputWeekday} onChange={e=>setInputWeekday(e.target.value)}></input><br></br><br></br>
            Subject :<input value={inputSubject} onChange={e=>setInputSubject(e.target.value)}></input><br></br><br></br>

            <button onClick={save}>Save</button>
            <button onClick={cancel}>{successMessage?"Back":"Cancel"}</button>
            {errorMessage?<p>{errorMessage}</p>:null}
            {successMessage?<p>{successMessage}</p>:null}
        </div>
        <div class="logout_button"><button onClick={logout}>Logout</button></div>
        </div>
    )
}

export default EditCoopSchedule;