const SupplementalReport =
    require('../models/supplementalReport');


const getSupplementalReportForm =
    async (req, res) => {

        try {

            res.render(
                'supplemental-report',
                {
                    error: null
                }
            );

        } catch (error) {

            console.error(
                'Error loading supplemental report form:',
                error
            );

            res.status(500).send(
                'Internal Server Error'
            );

        }

    };


const createSupplementalReport =
    async (req, res) => {

        try {

            const {
                error
            } = SupplementalReport.validate(
                req.body
            );


            if (error) {

                return res.status(400).render(
                    'supplemental-report',
                    {
                        error:
                            error.details[0].message
                    }
                );

            }


            const supplementalReport =
                new SupplementalReport({

                    caseNumber:
                        req.body.caseNumber,

                    reportTitle:
                        req.body.reportTitle,

                    reportDate:
                        req.body.reportDate,

                    narrative:
                        req.body.narrative

                });


            await supplementalReport.save();


            res.redirect(
                '/supplemental-reports'
            );


        } catch (error) {

            console.error(
                'Error saving supplemental report:',
                error
            );

            res.status(500).send(
                'Internal Server Error'
            );

        }

    };


const getSupplementalReports =
    async (req, res) => {

        try {

            const reports =
                await SupplementalReport
                    .find()
                    .sort({
                        createdAt: -1
                    });


            res.render(
                'supplemental-reports',
                {
                    reports
                }
            );


        } catch (error) {

            console.error(
                'Error fetching supplemental reports:',
                error
            );

            res.status(500).send(
                'Internal Server Error'
            );

        }

    };


module.exports = {
    getSupplementalReportForm,
    createSupplementalReport,
    getSupplementalReports
};