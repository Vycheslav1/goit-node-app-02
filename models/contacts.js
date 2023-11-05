const fs = require("fs/promises");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  fs.readFile(contactsPath)
    .then((data) => {
      const person = JSON.parse(data).find(
        (contact) => contact.id === contactId
      );
      return person;
    })
    .catch((err) => console.log(err.message));
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);

  fs.writeFile(
    contactsPath,
    JSON.stringify(
      JSON.parse(data).filter((contact) => contact.id !== contactId)
    )
  );
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath);

  fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(data), body]));
  return body;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const index = JSON.parse(data).findIndex(
    (contact) => contact.id === contactId
  );

  const update = (arr, index, ...newItems) => [
    ...arr.slice(0, index),
    ...newItems,
    ...arr.slice(index + 1),
  ];

  const result = update(JSON.parse(data), index, body);

  fs.writeFile(contactsPath, JSON.stringify(result));

  return body;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
