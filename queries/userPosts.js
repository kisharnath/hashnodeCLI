const { request, gql } = require('graphql-request');

async function GetPostSpecificUser(username){
    let list = []
    const query = gql`
    query User($username: String!) {
        user(username: $username) {
          posts(pageSize:20,page:1) {
            nodes {
              id
              slug
              content {
                markdown
              }
            }
          }
             
          }
        }
    `
    const v = {
        "username": username
      }
    let userDoestExist = true ;
    await request({url:'https://gql.hashnode.com' , document:query , variables:v}).then(data=>{list = data.user.posts.nodes}).catch(error=>{userDoestExist = false})
    if(userDoestExist){

      return list;
    }else{
      return 'User doesnot exist'
    }
}
module.exports = { GetPostSpecificUser }