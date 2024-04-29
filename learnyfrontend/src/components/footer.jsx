import './css/footer.css'
import {Link} from 'react-router-dom'
const Footer = ()=>{
    return (
        <div className="footer">
            <div className="footerInside">
                <div className="footerCols">
                    <ol>
                        <h3>Learny</h3>
                        <Link to='/about-us'><li>About Us</li></Link>
                        <Link to='/services'><li>Our Services</li></Link>
                        <Link to='/privacy-policy'><li>Privacy Policy</li></Link>
                        
                    </ol>
                </div>
                <div className="footerCols">
                <ol>
                        <h3>Get Help</h3>
                        <Link to='/faq'><li>FAQ</li></Link>
                        <Link to='/affiliate-programs'><li>Affiliate Programs</li></Link>
                        <Link to='/live-chat-with-teacher'><li>Live chat with teacher</li></Link>
                        
                    </ol>
                </div>
                <div className="footerCols">
                <ol>
                        <h3>Online Learning</h3>
                        <Link to='/enroll-course'><li>Enroll Courses</li></Link>
                        <Link to='/drop-course'><li>Drop Courses</li></Link>
                        <Link to='/consultation'><li>Consultation</li></Link>
                        
                    </ol>
                </div>
                <div className="footerCols">
                <ol>
                        <h3>Follow Us</h3>
                        <div className="socials-container">
                            <div className="socials"><i className="fa-brands fa-facebook"></i></div>
                            <div className="socials"><i class="fa-brands fa-instagram"></i></div>
                            <div className="socials"><i class="fa-brands fa-twitter"></i></div>
                            <div className="socials"><i class="fa-brands fa-youtube"></i></div>
                        </div>
                    </ol>
                </div>
            </div>
            <div className="copyright-container">
            <span>&copy; 2024 - All rights reserved</span>
            </div>
        </div>
    )
}

export default Footer