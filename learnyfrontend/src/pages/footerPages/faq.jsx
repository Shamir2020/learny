import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import './css/faq.css'

const FAQ = () => {
    return (
        <>
            <Navbar />
            <div className="faqContainer">
                <h2>Frequently Asked Questions (FAQ)</h2>

                <div className="faq">
                    <div className="question">Question 1: What is Lorem Ipsum?</div>
                    <div className="answer">: Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                </div>

                <div className="faq">
                    <div className="question">Question 2: Why do we use it?</div>
                    <div className="answer">Answer: It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                </div>

                <div className="faq">
                    <div className="question">Question 3: Where does it come from?</div>
                    <div className="answer">Answer: Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                </div>


            </div>
            <Footer />
        </>
    )
}

export default FAQ