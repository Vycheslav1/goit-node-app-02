const express = require("express");

const { v4: uuidv4 } = require("uuid");

const loader = require("./models/contacts");

const validator = require("./validator.js");

const contactsList = async (req, res, next) => {
  const result = await loader.listContacts();
  res.status(200).json(result);
};

const getContact = async (req, res, next) => {
  const data = await loader.listContacts();
  if (JSON.parse(data).find((contact) => contact.id === req.params.contactId)) {
    let result = await loader.getContactById(req.params.contactId);
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (
    !Object.values(req.body).includes(name) ||
    !Object.values(req.body).includes(email) ||
    !Object.values(req.body).includes(phone)
  ) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    req.body.id = uuidv4();
    try {
      const value = await validator.schema.validateAsync({
        id: id,
        rname: name,
        email: email,
        phone: phone,
      });
    } catch (err) {
      console.log(err.message);
    }
    const result = await loader.addContact(req.body);

    res.status(201).json(result);
  }
};

const removeContact = async (req, res, next) => {
  const data = await loader.listContacts();

  if (JSON.parse(data).find((contact) => contact.id === req.params.contactId)) {
    await loader.removeContact(req.params.contactId);

    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateContacts = async (req, res, next) => {
  const data = await loader.listContacts();
  const { id, name, email, phone } = req.body;
  if (
    !Object.values(req.body).includes(name) ||
    !Object.values(req.body).includes(email) ||
    !Object.values(req.body).includes(phone) ||
    !Object.values(req.body).includes(id)
  ) {
    res.status(400).json({ message: "missing fields" });
  }
  try {
    const value = await validator.schema.validateAsync({
      id: id,
      rname: name,
      email: email,
      phone: phone,
    });
  } catch (err) {
    console.log(err.message);
  }
  if (JSON.parse(data).find((contact) => contact.id === req.params.contactId)) {
    const result = await loader.updateContact(req.params.contactId, req.body);
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  contactsList,
  getContact,
  removeContact,
  addContact,
  updateContacts,
};
