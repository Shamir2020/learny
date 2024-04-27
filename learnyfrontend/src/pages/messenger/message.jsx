import { useState } from 'react'
import {format} from 'timeago.js'

const Message = ({message, own})=>{
    
    

    return (
        <div className='message-container'>
            {own? <><span className='sender-text'><p className="sender">{message.text}</p> <p className="tiny-text">{format(message.createdAt)}</p></span></>: 
            <><span className='receiver-text'><p className="receiver">{message.text}</p> <p className="tiny-text">{format(message.createdAt)}</p></span></>}
        </div>
    )
}

export default Message