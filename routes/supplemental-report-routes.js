const express = require('express');

const {
    getSupplementalReportForm,
    createSupplementalReport,
    getSupplementalReports
} =
require(
    '../controllers/supplementalReportController'
);

const router = express.Router();


router.get(
    '/supplemental-report',
    getSupplementalReportForm
);


router.post(
    '/supplemental-report',
    createSupplementalReport
);


router.get(
    '/supplemental-reports',
    getSupplementalReports
);


module.exports = router;