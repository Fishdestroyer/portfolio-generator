const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-templates');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (REQUIRED!)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else{
                console.log('Please enter your name!');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (REQUIRED!)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else{
                console.log('Please enter your GitHub Username!');
                return false;
            }
        }
      },
      {
          type: 'confirm',
          name: 'confirmAbout',
          message: 'Would you like to enter some information about yourself for an "about" section?',
          default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else{
                return false;
            }
        }
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
              message: 'What is the name of your project? (REQUIRED!)',
              validate: nameInput => {
                if (nameInput) {
                    return true;
                } else{
                    console.log('Enter the project name!');
                    return false;
                }
            }
            
          },
          {
              type: 'input',
              name: 'description',
              message: 'Provide a description of the project (REQUIRED!)',
              validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else{
                    console.log('Please Provide a description of the project!');
                    return false;
                }
            }
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
              message: 'Enter the github link to your project. (REQUIRED!)',
              validate: linkInput => {
                  if(linkInput) {
                      return true;
                  }else {
                      console.log('Enter the gitHub link for this project');
                      return false;
                  }
              }
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

