import './App.css';
import { Route, Routes} from "react-router-dom";
//import UsersList from './UsersList';
import LoginForm from './LoginForm';
import CoopSchedule from './CoopSchedule';
import EditCoopSchedule from './EditCoopSchedule';

function App() {
  
  return ( 
    <div id='App'>
      <h1 class="heading">MY SCHEDULE MANAGER</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/coopschedule/:id" element={<CoopSchedule />} />
        <Route path="/editcoopschedule/:id/:schedule_id/:weekday/:subject" element={<EditCoopSchedule />} />
      </Routes>
    </div>
  )
}

export default App;