const express = require('express')
const router = express.Router();
const { createLead, getLead, getLeadById } = require('../controllers/leadcontrollers')

router.post('/', createLead)
router.get('/', getLead)
router.get('/getLead/:id', getLeadById)


module.exports = router;