require('dotenv').config();
const { Octokit } = require("@octokit/core");
const { Decrypt } = require('../Utilities/decrypted')
const fs = require('fs');

async function fetchAllRepo(username,token){

    
        const octokit = new Octokit({ auth: token });

        //writing env file
        let envContent = '';
         
        
        if(!process.env.HN_TOKEN){
            envContent = `GITHUB_TOKEN=${token}
USER=${username}
        `;
        }else{
            envContent = `GITHUB_TOKEN=${token}
USER=${username}
HN_TOKEN=${process.env.HN_TOKEN}
        `;
        }

        fs.writeFileSync('.env', envContent);
        gitRepos = [];

        await octokit.request(`GET /users/${username}/repos`, {
            username: username,
          }).then(data=>{
            data.data.forEach(element => {
                gitRepos.push(element.name)
            });
        });

        return gitRepos ;
}

async function getReadmeFileContent(repoName){

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    gitRepos = [];
    let content = ''

    await octokit.request(`GET /repos/${process.env.USER}/${repoName}/readme`, {
        owner: process.env.USER,
        repo: repoName,
      }).then((data)=>{
        content = Decrypt(data.data.content)
    }).catch((error)=>{console.log(error.message)})

    return content
}


module.exports = { fetchAllRepo ,getReadmeFileContent }