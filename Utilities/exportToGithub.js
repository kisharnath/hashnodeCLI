require('dotenv').config();
const fs = require('fs');
const inquirer = require('inquirer');

const { GetPostSpecificUser } = require('../queries/userPosts')
const { fetchAllRepo } = require('./githubAction')
const { updateReadmeFile }= require('./sendToGithub')



function githubMdWritequestion(){
    inquirer.prompt(
        [
            {
                type:"input",
                name:'username',
                message:"Your Hashnode username",

            }
        ]
    ).then(async(answers) => {
        let errorOccured = 0
        let slugs = []
        let contents = []
        const allArticles = await GetPostSpecificUser(answers.username).catch((e)=>{errorOccured = 1 });
        if(allArticles == 'User doesnot exist'){
            throw new Error('User doesnot exist');
           
        }
        allArticles.forEach((data)=>{
            slugs.push(data.slug)
            contents.push(data.content.markdown)
        })

        if(process.env.GITHUB_TOKEN && process.env.USER){
            const repos = await fetchAllRepo(process.env.USER, process.env.GITHUB_TOKEN);
                inquirer.prompt([{
                    type:'list',
                    name:'slug',
                    message:'Please select your article to be uploaded',
                    choices:slugs
            
                },
                {
                    type:'list',
                    name:'repo',
                    message:'Select your repository which you want to update the readme file ',
                    choices:repos
                }
            
            ]).then(async(a)=>{
                await updateReadmeFile(process.env.USER,process.env.GITHUB_TOKEN,a.repo,contents[slugs.indexOf(a.slug)])
                    
                })
        }else{
            inquirer.prompt([
                {
                    type:'list',
                    name:'title',
                    message:'Please select your article to be uploaded',
                    choices:slugs
                },
                {
                    type:'input',
                    name:'githubToken',
                    message:'Your github token'
                },
                {
                    type:'input',
                    name:'username',
                    message:'Your github username'
                }
            ]).then(async (answer2)=>{
                


                const repos = await fetchAllRepo(answer2.username,answer2.githubToken);
                inquirer.prompt([
                    {
                        type:'list',
                        name:'repo',
                        message:'Select your repository which you want to update the readme file',
                        choices:repos
                    }
                ]).then(async(answer3)=>{
                    await updateReadmeFile(answer2.username,answer2.githubToken,answer3.repo,contents[slugs.indexOf(answer2.title)])
                
                })

                
            })
        }
    }).catch((error)=>{console.log(error.message)})
  }

module.exports = { githubMdWritequestion };