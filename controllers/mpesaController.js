require('dotenv').config();
const datetime=require('node-datetime');
const axios = require('axios');
const passkey=process.env.PASSKEY;
const shortcode=process.env.SHORTCODE;
const consumerKey=process.env.CONSUMERKEY;
const consumerSecret=process.env.CONSUMERSECRET;




const newPassword=()=>{
    const dt =datetime.create();
    const formartted = dt.format('YmdHMS');

    const passString = shortcode + passkey + formartted;
    const base64EncodedPassword = Buffer.from(passString).toString('base64');
   


    return base64EncodedPassword;
};

exports.token = (req,res,next)=>{
   
  const   url= "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
 
   
  const auth = 
 'Basic' +
 Buffer.from(consumerKey +':' + consumerSecret).toString('base64');
 
  const headers = {
      Authorization: auth ,
  };

  axios.get(url,{
      headers:headers,
  })

  .then((response) =>{

      let data =response.data;
      let access_token = data.access_token;
      req.token = access_token;
    next();
    })
  .catch(error=>console.log(error));

};

exports.mpesaPassword = (req, res) => {
    res.send(newPassword());
};
exports.stkPush = (req, res) =>{
    const token = req.token;
    const stkURL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    let data ={
      BusinessShortCode:'174379',
      password:newPassword(),
      TimeStamp:formartted,
      TransactionType:'CustomerPayBillOnline',
      Amount:'2',
      PartyA:'254790851168',
      PartB:'174379',
      PhoneNumber:'254791234650',
      CallBackURL: 'https://mydomain.com/path',
      AccountRefrence:"GhalaMart Enterprises Payment",
      TransactionDesc:'Lipa na Mpesa',

    };

    axios.post(stkURL, data , headers).then((response)=>res.send(response.data));
    res.send(token);
    
};
