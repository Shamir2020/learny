import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import './css/liveChatWithTeacher.css'

const LiveChatWithTeacher = () => {
    return (
        <>
            <Navbar />
            <div class="liveChatContainer">
                <h1>About Live Chat with Teacher</h1>
                <p>Welcome to our live chat feature where you can directly connect with our teachers for assistance, guidance, and support.</p>
                <p>Here's how our live chat works:</p>
                <ul>
                    <li>Instant access to our teachers for real-time help with your questions.</li>
                    <li>Convenient and easy-to-use interface for seamless communication.</li>
                    <li>Flexible scheduling to accommodate your busy lifestyle.</li>
                </ul>
                <p>Whether you need help with coursework, clarification on a topic, or advice on your academic journey, our teachers are here to support you every step of the way.</p>
                <p>Get started with our live chat feature today and experience the benefits of personalized assistance from our dedicated team of educators!</p>
            </div>
            <Footer />
        </>
    )
}

export default LiveChatWithTeacher