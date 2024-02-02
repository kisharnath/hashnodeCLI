require('dotenv').config();
const fs = require('fs');
const { request, gql } = require('graphql-request');
const {DateUtc} = require('../Utilities/date')
const {ConvertMdToString} = require('../Utilities/mdString')
const {GetPublicationId} = require('../queries/publicationId')
const inquirer = require('inquirer');
 async function publishBlog(){

    let questionToBeAsked = []

    if( !process.env.HN_TOKEN ){
      questionToBeAsked = [
        {
          type:"input",
          name:'hashnodeToken',
          message:"Your Hashnode Personal Access Token",
        },
        {
          type:"input",
          name:'title',
          message:"Your blog title",
        },
        {
          type:"input",
          name:'publication',
          message:"Your publication name (name.hashnode.dev)",
        },
        {
          type:"input",
          name:'file',
          message:"Your filename",
        }
      ]

    }else{
      questionToBeAsked = [
        {
          type:"input",
          name:'title',
          message:"Your blog title",
        },
        {
          type:"input",
          name:'publication',
          message:"Your publication name (name.hashnode.dev)",
        },
        {
          type:"input",
          name:'file',
          message:"Your filename",
        }
      ]
    }
    inquirer.prompt(questionToBeAsked).then(async(an)=>{

    let token =  process.env.HN_TOKEN?process.env.HN_TOKEN:an.hashnodeToken;
    let envContent = ''
    // write hashnode token
    if(!process.env.HASHNODE_TOKEN){
      if(process.env.GITHUB_TOKEN && process.env.USER){
         envContent = `HN_TOKEN=${token}
GITHUB_TOKEN=${process.env.GITHUB_TOKEN}
USER=${process.env.USER}
  `;
      }else{
         envContent = `HN_TOKEN=${token}`
      }
              fs.writeFileSync('.env', envContent);
    }
    

    //by default tag id is software-engineering
    const tagId = "569d22c892921b8f79d35f68"

    //get the date 
    const date =  DateUtc();

    //publication id 
    let pubId = ''
    await GetPublicationId(an.publication).then(data=>{pubId=data})

    //get the file content
    let content = ConvertMdToString(an.file)


    const PublishPostInput = {
        "title" : an.title,
        "subtitle": an.title,
        "publicationId": pubId,
        "contentMarkdown": content,
        "publishedAt": date,
        "slug" : an.title.toLowerCase().split(" ").join(""),
        "tags": [{"id":tagId}],
    }

    const variable = {"input":PublishPostInput}

    const query = gql`
    mutation PublishPost($input: PublishPostInput!) {
        publishPost(input: $input) {
          post {
            id
            slug
            title
          }
        }
      }
        `

    await request({url:'https://gql.hashnode.com' ,document:query,variables:variable,requestHeaders:{"Authorization":token}})
    .then(data=>{
      const link = an.publication+"/"+an.title.toLowerCase().split(" ").join("")
      console.log("You have successfully uploaded your blog (Note : software-engineering is by defualt tag)","Visit the link",link)})
     }).catch(error=>{console.log("Something went worng check your publication name , filename name and title")})

}

module.exports  = { publishBlog }
