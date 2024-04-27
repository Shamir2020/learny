import './messengerPage.css'
import shamir from '../../images/shamir.jpg'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Conversation from './conversation'
import Message from './message'

import io from 'socket.io-client'

const Messenger = () => {

    const navigate = useNavigate()
    const params = useParams()

    const convoId = params.covoId

    const scrollRef = useRef()

    const decode = jwtDecode(localStorage.getItem('token'))


    const role = decode.role

    const userId = decode.id

    const [conversations, setConversations] = useState([])

    const [currentReceiver, setCurrentReceiver] = useState(null)


    const [messages, setMessages] = useState([])

    const [newMessage, setNewMessage] = useState('')

    const socket = useRef()




    const FetchConversations = async () => {

        console.log('Inside fetch conversation ')
        const response = await fetch(`/api/conversation/all/${userId}`)

        if (response.ok) {
            const data = await response.json()
            setConversations(data)

        }
        else {
            toast.error('Conversations could not be loaded')
            console.log('Conversations could not be loaded')
        }
    }

    const filterReceiver = (conversation) => {

        if (conversation.members[0]._id != userId) {

            setCurrentReceiver(conversation.members[0])


        }
        if (conversation.members[1]._id != userId) {

            setCurrentReceiver(conversation.members[1])

        }

    }


    const FetchSelectedConversation = async () => {
        if (convoId != 'all') {
            const response = await fetch(`/api/conversation/${convoId}`)
            if (response.ok) {
                const data = await response.json()
                filterReceiver(data)


            }
            else {
                const data = await response.json()
                toast.error(data)
                toast.error('Conversation could not be loaded')
            }
        }

    }

    const SubmitMessage = async (e) => {
        e.preventDefault()

        socket.current.emit('sendMessage', {
            senderId: userId,
            receiverId: currentReceiver._id,
            text: newMessage
        })

        const response = await fetch(`/api/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversationId: convoId,
                senderId: userId,
                text: newMessage
            })
        })
        if (response.ok) {
            const data = await response.json()
            setNewMessage('')
            setMessages([...messages, data])
        }
    }


    useEffect(() => {
        FetchConversations()
        FetchSelectedConversation()

    }, [])

    useEffect(() => {
        const getMessages = async () => {
            const response = await fetch(`/api/message/${convoId}`)

            if (response.ok) {
                const data = await response.json()
                setMessages(data)

                console.log(data)
            }
        }
        getMessages()
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messages])

    useEffect(() => {

        socket.current = io('ws://localhost:8900')

    }, [])

    useEffect(() => {
        socket.current.emit('addUser', userId)
    }, [])

    useEffect(() => {
        socket.current.on('getMessage', message => {
            console.log(message.senderId, message.text)
            console.log(`Convo Name - ${currentReceiver?.name} - ${currentReceiver?._id}`)
            if (message.senderId == currentReceiver?._id) {
                setMessages([...messages, { senderId: message.senderId, text: message.text, createdAt: Date.now() }])
            }
        })
    }, [currentReceiver])


    return (
        <>

            <div className="messenger-container">
                <div className="messenger-col-1">
                    <div className="conversation-header">
                        <h2 style={{ margin: "20px 50px" }}>Conversations</h2>
                    </div>

                    {conversations && conversations.map((conversation, index) => {
                        return (
                            <Conversation conversation={conversation} />
                        )
                    })}


                </div>




                <div className="messenger-col-2">

                    {currentReceiver && (
                        <>
                            <div className="conversation-header">
                                <div className="conversation-header-col-1">
                                    <img src={`http://localhost:3000/${currentReceiver.profile.profilePic}`} alt="error" />
                                </div>
                                <div className="conversation-header-col-2">
                                    <h3>{currentReceiver.name}</h3>
                                    <p className="small-text">Active 22m ago</p>
                                </div>

                            </div>

                            <div className="message-box">
                                {messages && messages.map((message) => {
                                    return (
                                        <div ref={scrollRef}>
                                            <Message message={message} own={message.senderId === userId} />
                                        </div>
                                    )
                                })}
                            </div>

                            <form className="message-input-container">
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} name="message" />
                                <button onClick={SubmitMessage}>Send</button>
                            </form>
                        </>

                    )}

                    {!currentReceiver && (
                        <div className="no-conversation-container">
                            <h2>No conversation to load</h2>
                        </div>
                    )}


                </div>



                <div className="messenger-col-3">


                    {currentReceiver && (
                        <>
                            <div className="messenger-col-3-image-container">
                                <img src={`http://localhost:3000/${currentReceiver.profile.profilePic}`} alt="error" />
                                <h3>{currentReceiver.name}</h3>
                                <p>Active 12m ago</p>
                            </div>

                            <div className="messenge-col3-info-container">
                                <p>Knows Bengali</p>
                                <p>student of BSC</p>
                            </div>
                        </>
                    )}



                </div>
            </div>
        </>
    )
}

export default Messenger