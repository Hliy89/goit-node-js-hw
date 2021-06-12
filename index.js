// const argv = require('yargs').argv;
const { Command } = require('commander');

const contactsOperations = require("./contacts");

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const allContacts = await contactsOperations.listContacts();
        console.table(allContacts);
      break;

    case 'get':
        const oneContact = await contactsOperations.getContactById(id);
        console.log(oneContact);
      break;

    case 'add':
        const addNewContact = await contactsOperations.addContact(name, email, phone);
        console.log(addNewContact);
      break;

    case 'remove':
        const removeContact = await contactsOperations.removeContact(id);
        console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// ВАРИАНТ 2-й

// async function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case 'list':
//           const allContacts = await contactsOperations.listContacts();
//           console.table(allContacts);
//       break;

//     case 'get':
//       console.log(await contactsOperations.getContactById(id));
//       break;

//     case 'add':
//       console.log(await contactsOperations.addContact(name, email, phone));
//       break;

//     case 'remove':
//       console.log(await contactsOperations.removeContact(id));
//       break;

//     default:
//       console.warn('\x1B[31m Unknown action type!');
//   }
// }

// invokeAction(argv);


// ВАРИАНТ 1-й

// (async () => {
    // const allContacts = await contactsOperations.listContacts();
    // console.log(allContacts);

    // const oneContact = await contactsOperations.getContactById(5);
    // console.log(oneContact);

    // const removeContact = await contactsOperations.removeContact(5);
    // console.log(removeContact);

    // const addNewContact = await contactsOperations.addContact("Jimmy Tudesky", "tulpan@jimmytudesky.com", "(777) 777-7777");
    // console.log(addNewContact);
// })();




// Запусти команды в терминале и сделай отдельный скриншот результата выполнения каждой команды.

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3