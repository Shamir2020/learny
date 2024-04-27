import './css/aboutUs.css'

const AboutUs = ()=>{
    return (
        <div className="about-us-container">
        <h1>About Us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget est ultricies, volutpat felis ac, volutpat nunc. Suspendisse vitae dolor nec enim dictum vulputate. Nunc nec lacus magna. Donec vitae massa nec nisi aliquet blandit. Vivamus sit amet odio sapien. Integer convallis nunc et tellus feugiat bibendum.</p>
       
        <h2>Our Team</h2>
        <ol className="team-container">
            <div class="team-member">
                
                <ul className="team-member-info">
                    <h3>John Doe</h3>
                    <p>Position: CEO</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </ul>
            </div>
            <div className="team-member">
                
                <ul className="team-member-info">
                    <h3>Jane Smith</h3>
                    <p>Position: CTO</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </ul>
            </div>
        </ol>
        {/* <!-- Add more team members as needed --> */}
    </div>
    )
}

export default AboutUs