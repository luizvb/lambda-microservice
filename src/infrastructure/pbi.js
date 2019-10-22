var unirest = require("unirest");
var req = unirest("POST", "https://api.powerbi.com/beta/c5780859-d6be-40ad-9779-7a7726e7fdfc/datasets/91882dd3-9cf5-4235-b57f-79d4c2fe1721/rows");
const dNow = new Date();
const localdate =  (dNow.getMonth() + 1) + '-' + dNow.getDate() + '-' +  dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
console.log(localdate)
module.exports.postMessageToPbi = async (servico, status, mensagem) => {
  req.query({"key": "41o2OHH/GVFL8TMT/4DUA/H5PMnZ8aXAEBJCXc98ogFU/xGeUzdUZ3ySqBBzU20XHX0XY0QbUgiTI7ahF6hBPQ=="});  
  req.headers({"content-type": "application/json"});  
  req.type("json");
  
  req.send([
    {
      "Serviço": servico,
      "Status": status,
      "Mensagem": mensagem,
      "Data": localdate
    }
  ]);
  
  req.end(function (res) {
    if (res.error) throw new Error(res.error);  
    console.log(res.body);
  });
  

          
}