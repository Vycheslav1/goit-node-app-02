const express = require("express");
const controller = require("./controllers.js");
const router = express.Router();

console.log(controller);
router.get("/", controller.contactsList);

router.get("/:contactId", controller.getContact);

router.post("/", controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put("/:contactId", controller.updateContacts);

module.exports = router;
