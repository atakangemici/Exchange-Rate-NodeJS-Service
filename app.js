const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({attributeMode:false});
const express = require('express')
const app = express()
const port = 3000

app.get('/exchange_rate', (req, res) => {
 var request = require('request');
request('http://www.tcmb.gov.tr/kurlar/today.xml', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    
    parser.xmlToJson(body, (err,json)=>{
        var exchange = {};
        exchange["name"] = json["Tarih_Date"]["Currency"][0]["Isim"];
        exchange["rate"] = json["Tarih_Date"]["Currency"][0]["BanknoteSelling"];

        res.send(exchange);     
    });

  }
})
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});