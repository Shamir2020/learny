import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import './css/services.css'
const Services = () => {
    return (
        <>
            <Navbar />
            <div className="learny-container">
                <div class="ServiceContainer">
                    <h2>Our Services</h2>

                    <div class="service">
                        <h3>Service 1</h3>
                        <p>Description of Service 1 goes here...</p>
                    </div>

                    <div class="service">
                        <h3>Service 2</h3>
                        <p>Description of Service 2 goes here...</p>
                    </div>

                    <div class="service">
                        <h3>Service 3</h3>
                        <p>Description of Service 3 goes here...</p>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default Services