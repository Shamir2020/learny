
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Login from './pages/login'
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import VerifyEmail from './pages/verifyEmail';
import ForgetPassword1 from './pages/forgetPassword1';
import ChangePassword from './pages/changePassword';
import ProfilePage from './pages/profilePage';
import UpdateProfile from './pages/updateProfilePage';
import Home from './pages/home';
import AccountPage from './pages/accountPage';
import DashboardPage from './pages/dashboardPage';
import AdminLogin from './admin/adminLogin';
import UserTypeSelection from './pages/userTypeSelection';
import AboutUs from './components/aboutUs';
import AdminDashboard from './admin/adminDashboard';
import CourseCatelogPage from './pages/CourseCatelogPage';
import AdminCoursePage from './admin/adminCoursePage';
import AdminTeacherPage from './admin/adminTeacherPage';
import AdminStudentPage from './admin/adminStudentPage';
import AdminCourseCategoryPage from './admin/adminCourseCategoryPage';
import FormCategoryPage from './admin/CategoryForm';
import TestImageUpload from './test/testImage';
import CourseForm from './admin/CourseForm';
import CourseViewPage from './pages/CourseViewPage';
import TeacherCatelogPage from './pages/teacherCatelogPage';
import TeacherCourseCatelog from './pages/teacherCourseCatelog';
import AdminAnnouncementPage from './admin/adminAnnouncementPage';
import UniversityAnnouncementForm from './admin/UniversityAnnouncementForm';
import TeacherCourses from './teacher/teacherCourses';
import CourseInsidePage from './pages/CourseInsidePage';
import CourseContentForm from './teacher/courseContentForm';
import LectureForm from './teacher/lectureForm';
import LectureInsidePage from './pages/lectureInsidePage';
import CourseAnnouncementPage from './teacher/courseAnnouncementPage';
import CourseAnnouncementForm from './teacher/courseAnnouncementForm';
import Messenger from './pages/messenger/messengerPage';
import SearchPage from './pages/searchPage';
import ConsultationTracker from './teacher/consultationTracker';
import ConsultationForm from './teacher/consultationForm';
import ConsultationPage from './pages/consultationPage';
import AffiliatePrograms from './pages/footerPages/affiliatePrograms';
import Consultation from './pages/footerPages/consultation';
import DropCourse from './pages/footerPages/dropCourse';
import EnrollCourse from './pages/footerPages/enrollCourse';
import FAQ from './pages/footerPages/faq';
import LiveChatWithTeacher from './pages/footerPages/liveChatWithTeacher';
import PrivacyPolicy from './pages/footerPages/privacyPolicy';
import Services from './pages/footerPages/services';
import DepartmentCatelog from './pages/department';
import AdminDepartment from './admin/adminDepartment';
import DepartmentForm from './admin/departmentForm';


function App() {

  return (
    <div className="App">

      
      <Toaster position='top-right' toastOptions={{ duration: 2000 }} />


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/register/:type`} element={<Register />} />
          <Route path="/users/:id/verify/:token" element={<VerifyEmail />} />
          <Route path='/forgetpassword1' element={<ForgetPassword1 />} />
          <Route path='/users/:id/changepassword/:token' element={<ChangePassword />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/user-selection' element={<UserTypeSelection />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/course-catelog' element={<CourseCatelogPage />} />


          <Route path='/department-catalog-page' element={<DepartmentCatelog />} />


          <Route path='/search-page/:keyword' element={<SearchPage />} />

          <Route path='/course-view-page/:id' element={<CourseViewPage />} />
          <Route path='/course-inside-page/:id' element={<CourseInsidePage />} />

          <Route path='/teacher-catelog' element={<TeacherCatelogPage />} />

          <Route path='/lecture-inside-page/:id' element={<LectureInsidePage />} />

          <Route path='/messenger-page/:covoId' element={<Messenger />} />


          <Route path='/teacher-consultation/:id' element={<ConsultationPage />}/>

          {/* Admin  */}

          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-course-page' element={<AdminCoursePage />} />
          <Route path='/admin-teacher-page' element={<AdminTeacherPage />} />
          <Route path='/admin-student-page' element={<AdminStudentPage />} />
          <Route path='/admin-category-page' element={<AdminCourseCategoryPage />} />
          <Route path='/admin-category-form' element={<FormCategoryPage />} />
          <Route path='/admin-announcement-page' element={<AdminAnnouncementPage />} />
          <Route path='/admin-announcement-form' element={<UniversityAnnouncementForm />} />



          <Route path='/admin-course-form' element={<CourseForm />} />

          <Route path='/admin-department-page' element={<AdminDepartment />} />

          <Route path='/admin-department-form' element={<DepartmentForm />} />

          {/* Admin */}


          {/* Footer Pages  */}
          <Route path='/affiliate-programs' element={<AffiliatePrograms />} />
          <Route path='/consultation-footer' element={<Consultation />} />
          <Route path='drop-course' element={<DropCourse />} />
          <Route path='/enroll-course' element={<EnrollCourse />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='live-chat-with-teacher' element={<LiveChatWithTeacher />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/services' element={<Services />} />

          {/* Footer Pages  */}


          {/* Teacher  */}

          <Route path='/teacher-course-catelog/:id' element={<TeacherCourseCatelog />} />

          <Route path='/teacher-courses-dashboard' element={<TeacherCourses />} />

          <Route path='/teacher-course-content-form/:id' element={<CourseContentForm />} />

          <Route path='/teacher-lecture-form/:id' element={<LectureForm />} />

          <Route path='/course-announcement-page/:id' element={<CourseAnnouncementPage />} />

          <Route path='/course-announcement-form/:id' element={<CourseAnnouncementForm />} />

          <Route path='/teacher-courses-consultaions' element={<ConsultationTracker />} />

          <Route path='/teacher-consultation-form' element={<ConsultationForm />} />

          {/* Teacher */}



          {/* Test  */}

          <Route path='/upload-test-image' element={<TestImageUpload />} />


          {/* Test */}


          <Route path='/admin' element={<AdminLogin />} />

        </Routes>



    </div>
  );
}

export default App;
