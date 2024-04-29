import './css/enrollCourse.css'

const EnrollCourse = ()=>{
    return (
        <div class="enrollCourseContainer">
        <h1>Enroll in a Course</h1>
        <form action="#" method="post">
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" required />

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label for="course">Select Course:</label>
            <select id="course" name="course" required>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
                <option value="course3">Course 3</option>
               
            </select>

            <input type="submit" value="Enroll Now" />
        </form>
    </div>
    )
}

export default EnrollCourse