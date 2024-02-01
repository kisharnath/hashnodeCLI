// Base64 encoded string
function Decrypt(value){
const base64EncodedString = value

// Decode the Base64 encoded string
const decodedString = Buffer.from(base64EncodedString, "base64").toString(
  "utf-8",
);

 return decodedString
}
function Encrypt(value){

  var string = value;
  var base64String = btoa(string);
 return base64String;
}
module.exports = { Decrypt, Encrypt }