import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

const Conversation = ({conversation}) => {

    const decode = jwtDecode(localStorage.getItem('token'))

    const userId = decode.id

    const navigate = useNavigate()

    const goToMessengerPage = (id) => {
        navigate(`/messenger-page/${id}`)
        window.location.reload()
    }

    const [imageUrl, setimageUrl] = useState("")
    const [name, setName] = useState('')


    useEffect(()=>{
        const extractReceiverInfo = ()=>{
            if (conversation.members[0]._id != userId){

                setimageUrl(conversation.members[0].profile.profilePic)
                setName(conversation.members[0].name)
            }
            else {
                setimageUrl(conversation.members[1].profile.profilePic)
                setName(conversation.members[1].name)
            }
        }
        extractReceiverInfo()
    },[conversation])

    return (
        <div onClick={() => goToMessengerPage(conversation._id)} className="conversation-card">
            <div className="conversation-card-col-1">
                <img src={`http://localhost:3000/${imageUrl}`} alt="error" />
            </div>
            <div className="conversation-card-col-2">
                <h3>{name}</h3>
                <p>This is a message</p>
            </div>

        </div>
    )
}


export default Conversation