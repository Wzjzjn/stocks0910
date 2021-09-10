var express = require('express');
var router = express.Router();
var moment = require('moment');
// var Api = require('api');
const addDataBuffer =async ()=>{
    if(false){
        console.log('is dealing ,to skip and wait ');
    }else{
        // isDealing=true;
        console.log(moment().format('YYYYMMDDHHmmSS')+'---');
        const { data: result } = await Api.get("list=sh601003,sh601001");
        console.log('data ---- ');
        console.log(result);

    }

}

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express123' });
});

module.exports = router;
