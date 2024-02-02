const { request, gql } = require('graphql-request');
const {DateUtc} = require('../Utilities/date')
const {GetPublicationId} = require('../queries/publicationId')
const {writeHasnodeToken} = require('../Utilities/writeHnToken')
 async function gitpublishBlog(Hntoken,title,content,pubName,gitUser,gitToken){
    writeHasnodeToken(Hntoken,gitUser,gitToken)
    //by default tag id is software-engineering
    const tagId = "569d22c892921b8f79d35f68"

    //get the date 
    const date =  DateUtc();

    //publication id 
    let pubId = ''
    await GetPublicationId(pubName).then(data=>{pubId=data})

    
    const PublishPostInput = {
        "title" : title,
        "subtitle": title,
        "publicationId": pubId,
        "contentMarkdown": content,
        "publishedAt": date,
        "slug" : title.toLowerCase().split(" ").join(""),
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

    await request({url:'https://gql.hashnode.com' ,document:query,variables:variable,requestHeaders:{"Authorization":Hntoken}})
    .then(data=>{
      const link = pubName+"/"+title.toLowerCase().split(" ").join("");
      console.log("You have successfully uploaded your blog","Visit the link",link)})
}

module.exports  = { gitpublishBlog }
