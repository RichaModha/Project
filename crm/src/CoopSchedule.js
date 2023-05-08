import React,{useState,useEffect} from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Style.css';
//const id='';

function CoopSchedule()
{
    const[errorMessage,setErrorMessage]=useState("");
    const[schedule,setSchedule]=useState("");
    const[schedule_id,setScheduleId]=useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const CoopSchedule = () => 
    {
        let id = useParams();
        return(id);
    };

    const get_coop_schedule = async(e) => {
        //e.preventDefault();
        const data = CoopSchedule();
        //console.log(data);
        await axios.post('http://localhost:8080/student_coop_schedule',data )
            .then(res=>
            {
                //console.log(res.data);
                setSchedule(res.data);
            })
            .catch(error => {
                setErrorMessage("No Co-op Schedule found!");
            })
    }

    const edit = (schedule_id,weekday,subject) => {
        navigate("/editcoopschedule/"+id+"/"+schedule_id+"/"+weekday+"/"+subject);
    }

    const logout = () => {
        navigate("/");
    }

    const delete_schedule = (item_id) => {
        //console.log(item_id);
        setScheduleId(item_id);
        delete_schedule_route_call();
    }

    const delete_schedule_route_call = async(e) => {
        const data={schedule_id};
        console.log(schedule_id);
        await axios.delete('http://localhost:8080/delete_schedule',data)
            .then(res=>
            {
                //console.log(res.data);
                setSchedule(res.data);
            })
            .catch(error => {
                setErrorMessage("Error! Try again.");
            })
    }

    get_coop_schedule();

    return(
        <div>
        <div class="myschedule">
            <h1>My Coop Schedule</h1>
            {schedule?(
                <table>
                    <thead>
                        <tr>
                            <th>WEEDKAY</th>
                            <th>SUBJECT</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map(item=>(
                        <tr>
                            <td>{item.weekday}</td>
                            <td>{item.subject}</td>
                            <td><button type="submit" onClick={() => edit(item.id,item.weekday,item.subject)}>Edit</button>
                                <button type="submit" onClick={() => delete_schedule(item.id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            ):
            (
                <p>{errorMessage}</p>
            )}     
        </div>
        <div class="logout_button"><button onClick={logout}>Logout</button></div>
        </div>
    )
}

export default CoopSchedule;