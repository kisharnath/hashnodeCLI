require('dotenv').config();
const inquirer = require('inquirer');
const { fetchAllRepo ,getReadmeFileContent } = require('../Utilities/githubAction')
const { gitpublishBlog } = require('./gitPublish')
const { githubMdWritequestion } = require('../Utilities/exportToGithub');
const { env } = require('yargs');

const questions = [
  {
    type: 'input',
    name: 'token',
    message: "Your github token",
  },
  {
    type: 'input',
    name: 'username',
    message: "Your github username",
  }

];

function GitQuestion3(content){
    let newQuestion = [];
    if (!process.env.HN_TOKEN){

        newQuestion = [
           {
               type:'input',
               name:'token',
               message:'Your Hashnode token',
   
           },
           {
               type:'input',
               name:'title',
               message:'Type title',
   
           },
           {
               type:'input',
               name:'pubName',
               message:'Type your Publication Name',
   
           }
       ]
    }else{
        newQuestion = [
            {
                type:'input',
                name:'title',
                message:'Type title',
    
            },
            {
                type:'input',
                name:'pubName',
                message:'Type your Publication Name',
    
            }
        ]
    }
    inquirer.prompt(newQuestion).then(async(answers) => {
        const myhashnodeToken = process.env.HN_TOKEN?process.env.HN_TOKEN:answers.token;
        gitpublishBlog(myhashnodeToken,answers.title,content,answers.pubName)
    });
  
}

function GitQuestions2(q) {
    inquirer.prompt(q).then(async(answers) => {

        const content = await getReadmeFileContent(answers.repo);
        
            GitQuestion3(content)
        

    });
  
  }


 async function GitQuestions1() {
    if(process.env.GITHUB_TOKEN && process.env.USER){
        const repos = await fetchAllRepo(process.env.USER,process.env.GITHUB_TOKEN);
        let newQuestion = [
            {
                type:'list',
                name:'repo',
                message:'Select the repository',
                choices:[]
            },
            
        ]
        newQuestion[0].choices = repos
        GitQuestions2(newQuestion)

    }else {
    inquirer.prompt(questions).then(async(answers) => {

        const repos = await fetchAllRepo(answers.username,answers.token);
        let newQuestion = [
            {
                type:'list',
                name:'repo',
                message:'Select the repository',
                choices:[]
            },
            
        ]
        newQuestion[0].choices = repos
        GitQuestions2(newQuestion)

    });
    }
  
  }

  function firstQuestion(){
    inquirer.prompt(
        [
            {
                type:"list",
                name:'question',
                message:"What do you want to do?",
                choices:['Import','Export(It will upload to github)']

            }
        ]
    ).then(async(answers) => {
        if (answers.question == 'Import') {
            GitQuestions1();
        }
        else{
            githubMdWritequestion();
        }
    })
  }

module.exports = { firstQuestion }