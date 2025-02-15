import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Sidebar from './components/sideBar/sidebar';
import Slider from './components/slider/getSlider/Slider';
import AddSlider from './components/slider/addSlider/AddSlider';
import EditSlider from './components/slider/editSlider/EditSlider';
import Homeinfo from './components/homeInfo/getHomeinfo/Homeinfo';
import Client from './components/clients/getClient/Client';
import AddClient from './components/clients/addClient/AddClient';
import EditClient from './components/clients/editClient/EditClient';
import EditHomeinfo from './components/homeInfo/editHomeinfo/EditHomeinfo';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Service from './components/service/getService/Service';
import AddService from './components/service/addService/AddService';
import EditService from './components/service/editService/EditService';
import Project from './components/project/getProject/Project';
import AddProject from './components/project/addProject/AddProject';
import EditProject from './components/project/editProject/EditProject';
import HomeAward from './components/home-awards/homeAwards/HomeAwards';
import AddHomeAwards from './components/home-awards/addHomeAwards/AddHomeAwards';
import EditHomeAwards from './components/home-awards/editHomeAwards/EditHomeAwards';
import AboutOverview from './components/about-overview/getAboutOverview/AboutOverview';
import EditOverview from './components/about-overview/editAboutOverview/EditAboutOverview';
import Awards from './components/about-awards/getAwards/Awards';
import AddAwards from './components/about-awards/addAwards/AddAwards';
import EditAwards from './components/about-awards/editAwards/EditAwards';
import Career from './components/about-Career/getCareer/Career';
import EditCareer from './components/about-Career/editCareer/EditCareer';
import MainService from './components/mainService/mainService/MainService';
import AddMainService from './components/mainService/addMainService/AddMainService';
import EditMainService from './components/mainService/editMainService/EditMainService';
import WhyusTitle from './components/whyus_title/whyusTitle/WhyusTitle';
import AddWhyusTitle from './components/whyus_title/addWhyusTitle/AddWhyusTitle';
import EditWhyusTitle from './components/whyus_title/editWhyusTitle/EditWhyusTitle';
import WhyusContent from './components/whyus_content/whyusContent/WhyusContent';
import AddWhyusContent from './components/whyus_content/addWhyusContent/AddWhyusContent';
import AddInnovation from './components/innovation/addInnovation/AddInnovation';
import Innovation from './components/innovation/getInnovation/Innovation';
import EditInnovation from './components/innovation/editInnovation/EditInnovation';
import PortFolio from './components/portFolio/getPortFolio/PortFolio';
import AddPortfolio from './components/portFolio/addPortFolio/AddPortFolio';
import EditPortfolio from './components/portFolio/editPortFolio/EditPortFolio';
import EditWhyusContent from './components/whyus_content/editWhyusContent/EditWhyusContent';
import AllTitle from './components/all-title/allTitle/AllTitle';
import EditAllTitle from './components/all-title/EditAllTitle/EditAllTitle';
import Contact from './components/contact/getContact/Contact';
import EditContact from './components/contact/editContact/EditContact';
import ContactForm from './components/contactForm/ContactForm';
import JobApplication from './components/jobApplication/JobApplication';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        
        <Sidebar/>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route path='/home-slider' exact element={<ProtectedRoute><Slider /></ProtectedRoute>} />
          <Route path='/add_slider' exact element={<ProtectedRoute><AddSlider /></ProtectedRoute>} />
          <Route path='/edit_slider/:id' exact element={<ProtectedRoute><EditSlider /></ProtectedRoute>} />
          <Route path='/home-info' exact element={<ProtectedRoute><Homeinfo /></ProtectedRoute>} />
          <Route path='/edit-homeinfo/:id' exact element={<ProtectedRoute><EditHomeinfo /></ProtectedRoute>} />
          <Route path='/home-client' exact element={<ProtectedRoute><Client /></ProtectedRoute>} />
          <Route path='/add_client' exact element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
          <Route path='/edit_client/:id' exact element={<ProtectedRoute><EditClient /></ProtectedRoute>} />
          <Route path='/home-service' exact element={<ProtectedRoute><Service /></ProtectedRoute>} />
          <Route path='/add-service' exact element={<ProtectedRoute><AddService /></ProtectedRoute>} />
          <Route path='/edit-service/:id' exact element={<ProtectedRoute><EditService /></ProtectedRoute>} />
          <Route path='/home-project' exact element={<ProtectedRoute><Project /></ProtectedRoute>} />
          <Route path='/add-project' exact element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route path='/edit-project/:id' exact element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
          <Route path='/home-awards' exact element={<ProtectedRoute><HomeAward /></ProtectedRoute>} />
          <Route path='/add-home-awards' exact element={<ProtectedRoute><AddHomeAwards /></ProtectedRoute>} />
          <Route path='/edit-home-awards/:id' exact element={<ProtectedRoute><EditHomeAwards /></ProtectedRoute>} />
          <Route path='/about-overview' exact element={<ProtectedRoute><AboutOverview /></ProtectedRoute>} />
          <Route path='/edit-overview/:id' exact element={<ProtectedRoute><EditOverview /></ProtectedRoute>} />
          <Route path='/about-awards' exact element={<ProtectedRoute><Awards /></ProtectedRoute>} />
          <Route path='/add-about-awards' exact element={<ProtectedRoute><AddAwards /></ProtectedRoute>} />
          <Route path='/edit-about-awards/:id' exact element={<ProtectedRoute><EditAwards /></ProtectedRoute>} />
          <Route path='/about-career' exact element={<ProtectedRoute><Career /></ProtectedRoute>} />
          <Route path='/edit-career/:id' exact element={<ProtectedRoute><EditCareer /></ProtectedRoute>} />
          <Route path='/main-service' exact element={<ProtectedRoute><MainService /></ProtectedRoute>} />
          <Route path='/add-main-service' exact element={<ProtectedRoute><AddMainService /></ProtectedRoute>} />
          <Route path='/edit-main-service/:id' exact element={<ProtectedRoute><EditMainService /></ProtectedRoute>} />
          <Route path='/whyus-title' exact element={<ProtectedRoute><WhyusTitle /></ProtectedRoute>} />
          <Route path='/add-whyus-title' exact element={<ProtectedRoute><AddWhyusTitle /></ProtectedRoute>} />
          <Route path='/edit-whyus-title/:id' exact element={<ProtectedRoute><EditWhyusTitle /></ProtectedRoute>} />
          <Route path='/whyus' exact element={<ProtectedRoute><WhyusContent /></ProtectedRoute>} />
          <Route path='/add-whyus' exact element={<ProtectedRoute><AddWhyusContent /></ProtectedRoute>} />
          <Route path='/edit-whyus/:id' exact element={<ProtectedRoute><EditWhyusContent /></ProtectedRoute>} />
          <Route path='/add-innovation' exact element={<ProtectedRoute><AddInnovation /></ProtectedRoute>} />
          <Route path='/innovation' exact element={<ProtectedRoute><Innovation /></ProtectedRoute>} />
          <Route path='/edit-innovation/:id' exact element={<ProtectedRoute><EditInnovation /></ProtectedRoute>} />
          <Route path='/portfolio' exact element={<ProtectedRoute><PortFolio /></ProtectedRoute>} />
          <Route path='/add-portfolio' exact element={<ProtectedRoute><AddPortfolio /></ProtectedRoute>} />
          <Route path='/edit-portfolio/:id' exact element={<ProtectedRoute><EditPortfolio /></ProtectedRoute>} />
          <Route path='/all-title' exact element={<ProtectedRoute><AllTitle /></ProtectedRoute>} />
          <Route path='/edit-all-title/:id' exact element={<ProtectedRoute><EditAllTitle /></ProtectedRoute>} />
          <Route path='/contact' exact element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path='/edit-contact/:id' exact element={<ProtectedRoute><EditContact /></ProtectedRoute>} />
          <Route path='/contact-form' exact element={<ProtectedRoute><ContactForm /></ProtectedRoute>} />
          <Route path='/job-application' exact element={<ProtectedRoute><JobApplication /></ProtectedRoute>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
