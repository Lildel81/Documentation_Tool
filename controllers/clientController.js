const Client = require('../models/client');


// ----------------------------------------
// GET all records
// ----------------------------------------

const getAllClients = async (req, res) => {

    try {

        const list = await Client.find().sort({ _id: -1 });

        res.render('clientlist', {
            client: list
        });

    } catch (error) {

        console.error('Error fetching clients:', error);

        res.status(500).send('Internal Server Error');

    }

};


// ----------------------------------------
// GET records page
// ----------------------------------------

const getRecords = async (req, res) => {

    try {

        const records = await Client.find()
            .sort({ requestReceived: -1 });

        res.render('records', {
            records: records
        });

    } catch (error) {

        console.error(
            'Error fetching forensic records:',
            error
        );

        res.status(500).send(
            'Internal Server Error'
        );

    }

};


// ----------------------------------------
// GET single record
// ----------------------------------------

const getRecordById = async (req, res) => {

    try {

        const record = await Client.findById(req.params.id);

        if (!record) {
            return res.status(404).send('Record not found');
        }

        res.render('record', {
            record: record
        });

    } catch (error) {

        console.error(
            'Error fetching forensic record:',
            error
        );

        res.status(500).send(
            'Internal Server Error'
        );

    }

};

// ----------------------------------------
// GET edit record form
// ----------------------------------------

const getEditRecord = async (req, res) => {

    try {

        const record = await Client.findById(req.params.id);

        if (!record) {
            return res.status(404).send('Record not found');
        }

        res.render('edit-record', {
            record: record
        });

    } catch (error) {

        console.error(
            'Error loading edit form:',
            error
        );

        res.status(500).send(
            'Internal Server Error'
        );

    }

};


// ----------------------------------------
// UPDATE record
// ----------------------------------------

const updateRecord = async (req, res) => {

    try {

        // Normalize actionTaken into an array
        const actions = Array.isArray(req.body.actionTaken)
            ? req.body.actionTaken
            : [req.body.actionTaken];


        const updatedRecord = await Client.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                requestReceived: req.body.requestReceived,
                started: req.body.started,
                requestingAgency: req.body.requestingAgency || undefined,
                typeOfInvestigation: req.body.typeOfInvestigation,
                hoursSpent: req.body.hoursSpent,
                actionTaken: actions,
                softwareUsed: req.body.softwareUsed || undefined,
                paidOrFree: req.body.paidOrFree,
                softwareVersion: req.body.softwareVersion,
                notes: req.body.notes || undefined,
                reportComplete: req.body.reportComplete,
                providedToInvestigator: req.body.providedToInvestigator,
                providedHow: req.body.providedHow || undefined,
                evidenceStored: req.body.evidenceStored,
                results: req.body.results || undefined
            },
            {
                
                returnDocument: 'after',
                runValidators: true

            }
        );


        if (!updatedRecord) {
            return res.status(404).send('Record not found');
        }


        res.redirect(
            `/records/${updatedRecord._id}`
        );


    } catch (error) {

        console.error(
            'Error updating forensic record:',
            error
        );

        res.status(500).send(
            'Internal Server Error'
        );

    }

};


// ----------------------------------------
// MARK record as migrated to Kaseware
// ----------------------------------------

const markMigrated = async (req, res) => {

    try {

        const migrationData = {
            migratedToKaseware: true,
            kasewareRecordId: req.body.kasewareRecordId
        };


        const { error } =
            Client.validateMigration(migrationData);


        if (error) {

            console.log(
                'Migration Validation Error:',
                error.details
            );

            return res.status(400).send(
                error.details[0].message
            );

        }


        const updatedRecord =
            await Client.findByIdAndUpdate(
                req.params.id,
                migrationData,
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            );


        if (!updatedRecord) {
            return res.status(404).send(
                'Record not found'
            );
        }


        res.redirect(
            `/records/${updatedRecord._id}`
        );


    } catch (error) {

        console.error(
            'Error marking record as migrated:',
            error
        );

        res.status(500).send(
            'Internal Server Error'
        );

    }

};


// ----------------------------------------
// CREATE new record
// ----------------------------------------

const createClient = async (req, res) => {

    try {

        // Validate incoming form data with Joi
        const { error } = Client.validate(req.body);

        if (error) {

            console.log('Validation Error:', error.details);

            return res.status(400).send(
                error.details[0].message
            );

        }


        // Create new MongoDB document
        const client = new Client({

            title: req.body.title,

            requestReceived:
                req.body.requestReceived,

            started:
                req.body.started,

            requestingAgency:
                req.body.requestingAgency,

            typeOfInvestigation:
                req.body.typeOfInvestigation,

            hoursSpent:
                req.body.hoursSpent,

            actionTaken:
                 Array.isArray(req.body.actionTaken)
                     ? req.body.actionTaken
                     : [req.body.actionTaken],

            softwareUsed:
                req.body.softwareUsed,

            paidOrFree:
                req.body.paidOrFree,

            softwareVersion:
                req.body.softwareVersion,

            notes:
                req.body.notes,

            reportComplete:
                req.body.reportComplete,

            providedToInvestigator:
                req.body.providedToInvestigator,

            providedHow:
                req.body.providedHow,

            evidenceStored:
                req.body.evidenceStored,

            results:
                req.body.results

        });


        // Save to MongoDB
        await client.save();


        console.log(
            'Forensic documentation saved:',
            client._id
        );


        // Redirect back to main page
        res.redirect('/');


    } catch (error) {

        console.error(
            'Error saving documentation:',
            error
        );

        res.status(500).send(
            'Internal Server Error'
        );

    }

};


module.exports = {
    getAllClients,
    getRecords,
    getRecordById,
    getEditRecord,
    updateRecord,
    markMigrated,
    createClient
};