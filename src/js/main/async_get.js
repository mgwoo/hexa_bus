import axios from 'axios';
//axios.defaults.headers.common['Content-Type'] = 'application/json';

function preRequest(url, callback) {
  axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Headers': 'X-Requested-With, accept, content-type',
    },
  }).then(function(response) {
    callback();
  });
}

export function getFetch(url, callback) {

  const func = () => { 
    axios.get(url,{
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Request-Headers': 'X-Requested-With, accept, content-type',
    },
  }).then(function(response){
    if(response.status == 200) {
      callback(response);
    } else {
      console.log('status code: ' + response.status);
    }
  });
  }
  preRequest(url, func);
}
