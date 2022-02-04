const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-templates');

/*const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);*/

/*const [name, github] = profileDataArgs;
console.log(name, github);*/

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));
  const pageHTML = generatePage(name, github);
fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw err;
        console.log('Portfolio complete! check out index.html to see the output')
    });

