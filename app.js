var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var r = require("ramda");
var moment = require('moment');
var config = require('config');
var iconv = require('iconv-lite');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var axios = require('axios');

require('./libs/log')(config.name);
const lg = (x)=>{console.log(x)}
const REACT_APP_API_HOST='http://hq.sinajs.cn/'
const instance = axios.create({
    baseURL:REACT_APP_API_HOST,
    headers: {
        // 'X-CustomHeader': 'energy',
        'Content-Type': 'text/plain;charset=UTF-8'
    },
    // withCredentials: true
});
const DecodeGB2312 = function (val) {
    return iconv.decode(new Buffer(val, 'binary'), 'GB2312');
};

var app = express();

{
    global.MongoDB = require('./libs/mongodb2');
    global.MySQL = require('./libs/mysql');
    global.Api = require('./libs/api');

}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 找到电表
console.log('==== test');
MySQL.Load().then(
    ()=> {
        // DeviceType.Run();
        // MySQL.CollectorMonitor.sync();
        MongoDB(function(err) {
            if (err) {
                //
                log.debug(err);
            }
            else {

                //-s

                    let isDealing  = false;

                    const addDataBuffer =async ()=>{
                        if(isDealing){
                            console.log('is dealing ,to skip and wait ');
                        }else{
                            // isDealing=true;
                            console.log(moment().format('YYYYMMDDHHmmss')+'---');
                            // const { data: result } = await Api.get("list=sh601003,sh601001");
                            // console.log('data ---- ');
                            // console.log(DecodeGB2312(result));
                            axios.get("http://hq.sinajs.cn/list=sh601006",
                                // {headers:{Accept:'/'}}
                                {responseType:"arraybuffer"}
                            ).then((res)=>{
                                let data = res.data;

                                // lg(data);
                                lg(iconv.decode(new Buffer(data, 'binary'), 'GB2312'));
                                // lg(iconv.decode(new Buffer(data, 'binary'), 'GBK'));
                                // lg(iconv.decode(new Buffer(data, 'binary'), 'ISO-8859-1'));
                                // lg(iconv.decode(new Buffer(data, 'binary'), 'UTF-8'));


                            })

                        }

                    }

                    var myInt = setInterval(addDataBuffer, 20*1000);


            }
        })
    })






module.exports = app;
