const { Octokit } = require("@octokit/core");
const { Encrypt } = require('../Utilities/decrypted')

async function updateReadmeFile(username,token,repo,content){
    const Encryptedcontent = Encrypt(content)
    const octokit = new Octokit({
        auth: token
      });
      //
      const sha = await octokit.request(`GET /repos/${username}/${repo}/contents/README.md`, {
            owner: username,
            repo: repo,
            path: 'README.md',
            }).then(data=>data.data.sha);


      await octokit.request(`PUT /repos/${username}/${repo}/contents/README.md`, {
        owner: username,
        repo: repo,
        path: 'README.md',
        message: 'Readme file updated',
        sha:sha,
        content: Encryptedcontent,
        
      }).then((data)=>console.log("Readme file has been successfully updated")).catch((error)=>{
        console.log(error.message)
      })
 
}
module.exports = { updateReadmeFile };