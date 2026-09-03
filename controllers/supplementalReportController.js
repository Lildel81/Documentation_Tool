const SupplementalReport =
    require('../models/supplementalReport');
const Client = require('../models/client');

const getSupplementalReportForm =
    async (req, res) => {

        try {

            const records = await Client
               .find()
               .sort({ requestReceived: -1 });

               res.render(
               'supplemental-report',
            {
                error: null,
                records
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

                const records = await Client
                    .find()
                    .sort({ requestReceived: -1 });

                return res.status(400).render(
                    'supplemental-report',
                    {
                        error: error.details[0].message,
                        records
                    }
                );
            }

            const forensicRecord =
            await Client.findById(
                req.body.forensicRecord
                );

            if (!forensicRecord) {
                return res
                .status(404)
                .send('Forensic record not found');
            }

            const supplementalReport =
                new SupplementalReport({

                    forensicRecord:
                        forensicRecord._id,

                    caseNumber:
                        forensicRecord.caseNumber,

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