require('dotenv').config();
const fs = require('fs')
//writing env file
function writeHasnodeToken(token) {
    let envContent = ''
    if(process.env.GITHUB_TOKEN && process.env.USER){
        envContent = `
GITHUB_TOKEN=${process.env.GITHUB_TOKEN}
USER=${process.env.USER}
HN_TOKEN=${token}
        
        `
    }else{
        envContent =`
HN_TOKEN=${token}`
    }
    fs.writeFileSync('.env', envContent);
    
    
}    
module.exports = { writeHasnodeToken };