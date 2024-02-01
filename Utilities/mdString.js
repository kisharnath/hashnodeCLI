
function ConvertMdToString(filename){
    const fs = require('fs');
    const path = require('path');
   
    let  markdownString  = ''
        function readMarkdownFile(filePath) {
            try {
                // Resolve the absolute path to the Markdown file
                const absolutePath = path.resolve(__dirname, '../..', filePath);
                
                // Read the file synchronously
                const markdownString = fs.readFileSync(absolutePath, 'utf8');
                return markdownString;
            } catch (error) {
                console.error('Error reading file:', error.message);
                return null;
            }
        }
        
        markdownString = readMarkdownFile(filename);
        return markdownString;
    

}
module.exports = {ConvertMdToString}