import React, {useState, useEffect} from 'react'
import { postUserData, checkInUser } from '../apicalls/UserCalls'
import './ParticipantForm.css'

const ParticipantForn = (props) => {
    const {match} = props;
    const eventId = match.params.eventId
    const [participantId, setParticipantId] = useState('')
    const [responseMsg, setResponseMsg] = useState('')
    const [responseMsgCheckIn, setresponseMsgCheckIn] = useState('')

    
    const [pdata, setPData] = useState({
        participant_email : '',
        participant_name : '',
        participant_number : '',
        participant_dob : ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setPData((prev) => ({
            ...prev,
            [name] : value
        }))
    }
    const submitData = async (e) => {
        e.preventDefault()
        const response = await postUserData(eventId, pdata)
        setResponseMsg(response)
    }
    const handleParticipantIdChange = (e) => {
        setParticipantId(e.target.value)
        console.log(participantId)
    }
    const checkIn = async () => {
        const response = await checkInUser(eventId, participantId)
        setresponseMsgCheckIn(response.message)
    }
  return (
    <div>
        <div className='checkingroup'>
            <input className='pid' name='participantId' value={participantId} onChange={handleParticipantIdChange}></input>
            <button className='checkinbtn' onClick={checkIn}>Check-IN</button>
            {responseMsgCheckIn && <h5 className='respmsg'>{responseMsgCheckIn}</h5>}
        </div>
        <label>OR</label>
        <form className='form' onSubmit={submitData}>
        <div className="form-group">
            <label className='pformlabel'>Email</label>
            <input type='email' name='participant_email' value={pdata.participant_email} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label className='pformlabel'>Name</label>
            <input type='text' name='participant_name' value={pdata.participant_name} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label className='pformlabel'>Phone no.</label>
            <input type='tel' name='participant_number' value={pdata.participant_number} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label className='pformlabel'>DOB</label>
            <input type="datetime-local" name="participant_dob" value={pdata.participant_dob} onChange={handleChange}/>
        </div>
        <button type="submit">Participate</button>
        <div className="response-container">
            {responseMsg && <h5 className='respmsg'>{responseMsg}</h5>}
        </div>
        </form>
    </div>
  )
}

export default ParticipantForn