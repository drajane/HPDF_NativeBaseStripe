var fetch = require('node-fetch');

console.log("full"+(fetch('http://localhost:5000/getListOfCustomers')
  .then((response) => {console.log('response: '+response); return response.json();})
  .then((responseJson) => {console.log('responseData: '+JSON.stringify(responseJson)); return responseJson;})
  .catch(err => {console.log(err)})))