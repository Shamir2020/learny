import Footer from "../components/footer"
import Navbar from "../components/navbar"
import UniversityAnnouncementPage from "./adminUniversityAnnouncement"



const AdminAnnouncementPage = ()=>{
    return (
        <>
        <Navbar />
        <div className="admin-announcement-page learny-container">
            <UniversityAnnouncementPage />
        </div>
        <Footer />
        </>
        
    )
}

export default AdminAnnouncementPage