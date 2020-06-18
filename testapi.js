


// var myHeaders = new Headers();
// myHeaders.append();

var raw = JSON.stringify({"Code":"1000","Amount":100,"PhoneNumber":"07068260000","SecretKey":"hfucj5jatq8h"});

var requestOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type':'application/json',
    'Authorization':'Bearer uvjqzm5xl6bw'
  },
  body: raw,
  redirect: 'follow',
  mode: 'no-cors'
};

fetch("https://sandbox.wallets.africa/bills/airtime/providers", requestOptions)
  .then(response => console.log(response))
  // .then(result => console.log(result))
  .catch(error => console.log('error', error));
