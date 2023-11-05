const express = require("express");

const router = express.Router();

const controller = require("./controllers.js");

router.get("/", controller.contactsList);

router.get("/:contactId", controller.getContact);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContacts);

module.exports = router;
