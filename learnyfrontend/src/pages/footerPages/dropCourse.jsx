import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import './css/dropCourse.css'

const DropCourse = () => {
    return (
        <>
            <Navbar />
            <div className="dropCourseContainer">
                <h1>Drop Course</h1>
                <form action="#" method="post">
                    <label for="course">Select Course to Drop:</label>
                    <select id="course" name="course" required>
                        <option value="course1">Course 1</option>
                        <option value="course2">Course 2</option>
                        <option value="course3">Course 3</option>

                    </select>

                    <input type="submit" value="Drop Course" />
                </form>
            </div>
            <Footer />
        </>
    )
}

export default DropCourse