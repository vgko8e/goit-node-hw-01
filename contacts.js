const fs = require("fs").promises;
const path = require("path");
const id = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find(({ id }) => id === contactId);
    console.table(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const filteredContacts = allContacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: id.v4,
      name: name,
      email: email,
      phone: phone,
    };
    const allContacts = await listContacts();
    const newContacts = [...allContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
