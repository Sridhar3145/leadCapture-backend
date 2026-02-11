const Lead = require('../models/leadModel');

const createLead = async (req, res) => {
 const { name, email, phone, company, message, source } = req.body;
 try {
  if (!name || !email) {
   return res.status(400).json({ msg: "Required Fields Are Empty" })
  }
  const lead = await Lead.create({ name, email, phone, company, message, source });
  let webhookStatus = "success";
  try {
   await fetch(process.env.WEBHOOK_URL, {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
     name: lead.name,
     email: lead.email,
     phone: lead.phone,
     company: lead.company,
     message: lead.message,
     source: lead.source,
     created_at: lead.createdAt
    })
   });

  } catch (err) {
   webhookStatus = "failed";
  }

  res.status(201).json({ lead, webhookStatus });



 } catch (error) {
  res.status(500).json({ msg: "error message", error: error.message })
 }
}

const getLead = async (req, res) => {
 try {

  const leads = await Lead.find();

  res.status(200).json(leads);

 } catch (error) {
  res.status(500).json({ msg: "error message", error: error.message });
 }
}

const getLeadById = async (req, res) => {
 try {

  const lead = await Lead.findById(req.params.id);

  if (!lead) {
   return res.status(404).json({ msg: "Lead not found" });
  }

  res.status(200).json(lead);

 } catch (error) {
  res.status(500).json({ msg: error.message });
 }
};

module.exports = { createLead, getLead, getLeadById };