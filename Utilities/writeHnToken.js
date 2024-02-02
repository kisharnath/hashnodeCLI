require('dotenv').config();
const fs = require('fs')
//writing env file
function writeHasnodeToken(Hntoken,gitUser,gitToken) {
    let envContent = ''
        envContent = `
GITHUB_TOKEN=${gitToken}
USER=${gitUser}
HN_TOKEN=${Hntoken}
        
        `
    
    fs.writeFileSync('.env', envContent);
    
    
}    
module.exports = { writeHasnodeToken };