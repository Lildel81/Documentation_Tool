const express = require('express');

const {
    getAllClients,
    getRecords,
    getRecordById,
    getEditRecord,
    updateRecord,
    markMigrated,
    createClient
} = require('../controllers/clientController');

const router = express.Router();

router.get('/', getAllClients);

router.get('/records', getRecords);

router.get('/records/:id', getRecordById);

router.post('/clients', createClient);

router.get('/records/:id/edit', getEditRecord);

router.patch('/records/:id', updateRecord);

router.patch('/records/:id/migration', markMigrated);

module.exports = router;