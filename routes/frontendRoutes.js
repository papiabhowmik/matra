import express from 'express';
import { homeServiceController, aboutAwardsController, aboutCareerController, aboutOverviewController, awardsController, basicInfoController, clientsController, overviewController, projectsController, serviceController, sliderController, whyusController, portfolioController, innovationController } from '../controller/frontendController.js';

const router = express.Router();

router.get('/home-slider', sliderController);
router.get('/home-basic-info',basicInfoController);
router.get('/home-overview',overviewController);
router.get('/home-clients', clientsController);
router.get('/home-service', homeServiceController);
router.get('/home-projects', projectsController);
router.get('/home-awards', awardsController);
router.get('/about-overview', aboutOverviewController);
router.get('/about-awards', aboutAwardsController);
router.get('/about-career', aboutCareerController);
router.get('/service', serviceController);
router.get('/whyus', whyusController);
router.get('/portfolio', portfolioController);
router.get('/innovation', innovationController);

export default router;