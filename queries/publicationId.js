const { request, gql } = require('graphql-request');

async function GetPublicationId(name){
    let id = ''
    const query = gql`
        query Publication(
            $id: ObjectId,
            $host: String
        ) {
            publication(
            id: $id,
            host: $host
            ) {
                id
            }
        }
    `
    const v = {
        "host": name
      }
    await request({url:'https://gql.hashnode.com' , document:query , variables:v}).then(data=>{id = data.publication.id})
    return id
}
module.exports = { GetPublicationId }