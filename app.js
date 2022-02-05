const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-templates');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
    ]);
  };

  const promptProject = portfolioData => {
      console.log(`
      =========================
      ADD A NEW PROJECT
      =========================
      `);
       if (!portfolioData.projects) {
       portfolioData.projects =[];
       }

      return inquirer.prompt([
          {
              type: 'input',
              name: 'name',
              message: 'What is the name of your project?'
          },
          {
              type: 'input',
              name: 'description',
              message: 'Provide a description of the project (REQUIRED!)'
          },
          {
              type: 'checkbox',
              name: 'languages',
              message: 'What did you build with this project? (Check all that apply)',
              choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
              type: 'input',
              name: 'link',
              message: 'Enter the github link to your project. (REQUIRED!)'
          },
          {
              type: 'confirm',
              name: 'feature',
              message: 'Would you like to feature this project?',
              default: false 
          },
          {
              type: 'confirm',
              name: 'confirmAddProject',
              message: 'Would you like to add another project?',
              default: false 
          },

      ])
      .then(projectData => {
          portfolioData.projects.push(projectData);
          if(projectData.confirmAddProject) {
              return promptProject(portfolioData);
          }else{
              return portfolioData;
          }
      });
  };
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
      console.log(portfolioData)
  });



  


  
/*const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);*/

/*const [name, github] = profileDataArgs;
console.log(name, github);*/
 /* const pageHTML = generatePage(name, github);
fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw err;
        console.log('Portfolio complete! check out index.html to see the output')
    });*/

