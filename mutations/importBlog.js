const inquirer = require('inquirer');
const { fetchAll } = require('../Utilities/githubAction')

const questions = [
  {
    type: 'input',
    name: 'token',
    message: "Your token",
  }

];


function Ask() {
  inquirer.prompt(questions).then((answers) => {
    fetchAll(answers.token);
    
  });

}


module.exports  = { Ask }