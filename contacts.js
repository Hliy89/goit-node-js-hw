const { v4 } = require("uuid");

const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
    try {
        const file = await fs.readFile(contactsPath);
        const data = JSON.parse(file);
        return data;
    } catch (error) {
        throw error;
    }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(item => item.id === contactId)
        return contact;
    } catch (error) {
        throw error;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const newContacts = contacts.filter(({id}) => id !== contactId);
        const contactsStr = JSON.stringify(newContacts);
        fs.writeFile(contactsPath, contactsStr)
        return newContacts;
    } catch (error) {
        throw error;
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = { id: v4(), name, email, phone };
        const newContacts = [...contacts, newContact];
        const contactsStr = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, contactsStr);
        return listContacts();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};