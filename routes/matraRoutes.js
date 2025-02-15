import express from 'express';
import { addHomeSliderController, deleteHomeSliderController, getSingleSliderController, homeSliderController, updateHomeSliderController } from '../controller/sliderController.js';
import { homeInfoController, singleHomeInfoController, updateHomeInfoController } from '../controller/homeInfoController.js';
import { addHomeClientsController, deleteHomeClientsController, getSingleClientsController, homeClientsController, updateHomeClientsController } from '../controller/clientsController.js';
import { addHomeServiceController, addServiceController, deleteHomeServiceController, deleteServiceController, getSingleServiceController, getSingleServicePageController, homeServiceController, serviceController, updateHomeServiceController, updateServiceController } from '../controller/serviceController.js';
import { addHomeProjectController, deleteHomeProjectController, getSingleProjectController, homeProjectsController, updateHomeProjectController } from '../controller/projectsController.js';
import { aboutAwardsController, aboutSingleAwardsController, addAboutAwardsController, addHomeAwardsController, deleteAboutAwardsController, deleteHomeAwardsController, getSingleAwardsController, homeAwardsController, updateAboutAwardsController, updateHomeAwardsController } from '../controller/awardsController.js';
import { aboutOverviewController, singleAboutOverviewController, updateAboutOverviewController } from '../controller/aboutOverview.js';
import { aboutCareerController, aboutSingleCareerController, updateAboutCareerController } from '../controller/aboutCareerController.js';
import { addwhyusController, addwhyusTitleController, deletewhyusController, deletewhyusTitleController, getSingewhyusController, getwhyusController, getwhyusTitleController, singlegetwhyusTitleController, updatewhyusController, updatewhyusTitleController } from '../controller/whyUsController.js';
import { addPortfolioController, deletePortfolioController, getPortfolioCategoryController, getPortfolioController, getSinglePortfolioController, updatePortfolioController } from '../controller/portfolioController.js';
import { addInnovationController, deleteInnovationController, getinnovationController, getSingleInnovationController, updateInnovationController } from '../controller/innovationController.js';
import { getTitleController, singleTitleController, updateTitleController } from '../controller/allTitleController.js';
import { loginController, registerController } from '../controller/loginController.js';
import {mulUpload} from '../middleware/uploadMiddleware.js'
import { getContactController, singleContactController, updateContactController } from '../controller/contactController.js';
import { addContactFormController, getContactFormController } from '../controller/contactFormController.js';
import { addJobApplicationController, jobApplicationController } from '../controller/jobApplicationController.js';



const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/home-slider',  homeSliderController);
router.get('/get-single-slider/:id', getSingleSliderController);
router.post('/add-home-slider', mulUpload, addHomeSliderController);
router.put('/update-home-slider/:id', mulUpload, updateHomeSliderController);
router.delete('/delete-home-slider/:id',deleteHomeSliderController);

router.get('/home-info', homeInfoController);
router.put('/update-home-info/:id', mulUpload, updateHomeInfoController);
router.get('/homeinfo-single/:id', singleHomeInfoController);

router.get('/home-clients', homeClientsController);
router.get('/home-single-clients/:id', getSingleClientsController);
router.post('/add-home-clients', mulUpload, addHomeClientsController);
router.put('/update-home-clients/:id', mulUpload, updateHomeClientsController);
router.delete('/delete-home-clients/:id', deleteHomeClientsController);

router.get('/home-service', homeServiceController);
router.get('/home-single-service/:id', getSingleServiceController);
router.post('/add-home-service', mulUpload, addHomeServiceController);
router.put('/update-home-service/:id', mulUpload, updateHomeServiceController);
router.delete('/delete-home-service/:id', deleteHomeServiceController);

router.get('/home-project', homeProjectsController);
router.get('/home-single-project/:id', getSingleProjectController);
router.post('/add-home-project', mulUpload, addHomeProjectController);
router.put('/update-home-project/:id', mulUpload, updateHomeProjectController);
router.delete('/delete-home-project/:id', deleteHomeProjectController);

router.get('/home-awards', homeAwardsController);
router.get('/home-single-awards/:id', getSingleAwardsController);
router.post('/add-home-awards', mulUpload, addHomeAwardsController);
router.put('/update-home-awards/:id', mulUpload, updateHomeAwardsController);
router.delete('/delete-home-awards/:id', deleteHomeAwardsController);

router.get('/about-overview', aboutOverviewController);
router.get('/single-about-overview/:id', singleAboutOverviewController);
router.put('/update-about-overview/:id', updateAboutOverviewController);

router.get('/about-awards', aboutAwardsController);
router.get('/about-single-awards/:id', aboutSingleAwardsController);
router.post('/add-about-awards', mulUpload, addAboutAwardsController);
router.put('/update-about-awards/:id', mulUpload, updateAboutAwardsController);
router.delete('/delete-about-awards/:id', deleteAboutAwardsController);

router.get('/about-single-career/:id', aboutSingleCareerController);
router.get('/about-career', aboutCareerController);
router.put('/update-about-career/:id', mulUpload, updateAboutCareerController);

router.get('/get-service', serviceController);
router.get('/get-single-service/:id', getSingleServicePageController);
router.post('/add-service', addServiceController);
router.put('/update-service/:id', updateServiceController);
router.delete('/delete-service/:id', deleteServiceController);

router.get('/get-whyus-title', getwhyusTitleController);
router.get('/get-single-whyus-title/:id', singlegetwhyusTitleController);
router.post('/add-whyus-title', addwhyusTitleController);
router.put('/update-whyus-title/:id', updatewhyusTitleController);
router.delete('/delete-whyus-title/:id', deletewhyusTitleController)

;

router.get('/get-whyus', getwhyusController);
router.get('/get-single-whyus/:id', getSingewhyusController);
router.post('/add-whyus', mulUpload,  addwhyusController);
router.put('/update-whyus/:id', mulUpload, updatewhyusController);
router.delete('/delete-whyus/:id', deletewhyusController);

router.get('/get-portfolio-category', getPortfolioCategoryController);

router.get('/get-portfolio', getPortfolioController);
router.get('/get-single-portfolio/:id', getSinglePortfolioController);
router.post('/add-portfolio', mulUpload, addPortfolioController);
router.put('/update-portfolio/:id', mulUpload, updatePortfolioController);
router.delete('/delete-portfolio/:id', deletePortfolioController);

router.get('/get-innovation', getinnovationController);
router.get('/get-single-innovation/:id', getSingleInnovationController);
router.post('/add-innovation', addInnovationController);
router.put('/update-innovation/:id', updateInnovationController);
router.delete('/delete-innovation/:id', deleteInnovationController);

router.get('/get-all-title', getTitleController);
router.get('/get-all-single-title/:id', singleTitleController);
router.put('/update-all-title/:id', updateTitleController);

router.get('/get-contact', getContactController);
router.get('/get-single-contact/:id', singleContactController);
router.put('/update-contact/:id', updateContactController);

router.post('/add-contact-form',addContactFormController);
router.get('/get-contact-form', getContactFormController);

router.get('/job-application', jobApplicationController);
router.post('/add-job-application', mulUpload, addJobApplicationController);

export default router;