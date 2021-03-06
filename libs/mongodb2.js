/**
 * Created by Joey on 14-4-1.
 */
var mongo = require('mongoose');
var config = require('config');
var moment = require('moment');
var _ = require('underscore');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

mongo.Promise = Promise;

var mongodb;
var isConnected = false;
exports = module.exports = function(callback) {
    mongodb = mongo.connection;
    var Reconnect = function(){
        //, {server:{auto_reconnect:true}}
        setTimeout(function(){
            setTimeout(function(){
                isConnected = false;
                mongo.connect(config.db.url);
            }, 1000);
        }, 0);
    }

    mongodb.on('error', function(error){
        log.error('Error in connect to Mongo: ', error);
        mongo.disconnect();
        Reconnect();
    });
    mongodb.on('connected', function(){
        console.log('MongoDB connected');
        isConnected = true;
        callback && callback();
    });
    mongodb.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    mongodb.on('disconnected', function() {
        console.log('MongoDB disconnected');
        isConnected = false;
        Reconnect();
    });
    Reconnect();
}

exports.IsConnected = function(){
    return isConnected;
};

exports.MiddleWare = function(schema)
{
    var mongoMiddleware = schema;
    this.where = function(queryFactor){
        mongoMiddleware = mongoMiddleware.where(queryFactor);
        return mongoMiddleware;
    };
    this.or = function (queryFactor) {
        mongoMiddleware = mongoMiddleware.or(queryFactor);
        return mongoMiddleware;
    };
    this.in = function(queryFactor){
        mongoMiddleware = mongoMiddleware.in(queryFactor);
        return mongoMiddleware;
    };
    this.find = function(queryFactor){
        mongoMiddleware = mongoMiddleware.find(queryFactor);
        return mongoMiddleware;
    };
    this.findOne = function(queryFactor){
        mongoMiddleware = mongoMiddleware.findOne(queryFactor);
        return mongoMiddleware;
    };
    this.populate = function(queryFactor){
        mongoMiddleware = mongoMiddleware.populate(queryFactor);
        return mongoMiddleware;
    };
    this.exec = function(callback){
        mongoMiddleware = mongoMiddleware.exec(callback);
        return mongoMiddleware;
    };
    this.gt = function(callback){
        mongoMiddleware = mongoMiddleware.gt(callback);
        return mongoMiddleware;
    };
    this.gte = function(callback){
        mongoMiddleware = mongoMiddleware.gte(callback);
        return mongoMiddleware;
    };
    this.lt = function(callback){
        mongoMiddleware = mongoMiddleware.lt(callback);
        return mongoMiddleware;
    };
    this.lte = function(callback){
        mongoMiddleware = mongoMiddleware.lte(callback);
        return mongoMiddleware;
    };
    this.equals = function(callback){
        mongoMiddleware = mongoMiddleware.equals(callback);
        return mongoMiddleware;
    };
    this.sort = function(callback){
        mongoMiddleware = mongoMiddleware.sort(callback);
        return mongoMiddleware;
    };
    this.exists = function(callback){
        mongoMiddleware = mongoMiddleware.exists(callback);
        return mongoMiddleware;
    };
};
//????????????
var energyCategorySchema = new Schema({
    _id: String,
    title: String,
    unit: String,
    standcol: Number,
    description: String
});
//??????
exports.projectSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    billingAccount:{
        type: ObjectId,
        ref: 'billingAccount'
    },
    enterprise: String, //?????????
    description: String,
    level: Number,
    energy: Schema.Types.Mixed,
    onduty: String,
    offduty: String,
    billingtime: Number,
    billingservice: {
        type: Boolean,
        default: true
    },
    timecreate: Number,
    status: {
        type: String,
        default: 'ONLINE'
    }, // debug,online,pending
    timestatus: {
        type: Number,
        default: 0
    }
});
//??????
exports.buildingSchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    title: String,
    description: String,
    acreage: {
        type: Number,
        require: true
    },
    avgConsumption: Number,
    totalConsumption: Number,
    geolocation: Schema.Types.Mixed,
    project:{
        type: ObjectId,
        require: true,
        ref: "project"
    }
});
//????????????
var urlPathSchema = new Schema({
    _id: String,
    enable: {
        type: Boolean,
        default: true
    },
    needlogin:{
        type: Boolean,
        default: true
    },
    authtype: {
        type: String,
        require: true,
        default: 'NONE' //NONE/BYACCOUNT/BYAPPID
    },
    desc:{
        type: String
    }
});
var resourceSchema = new Schema({
    key: {
        type: String,
        require: true
    },
    value: String,
    begin: {
        type: Date,
        require: true,
        default: Date.now
    },
    end: {
        type: Date,
        require: true,
        default: Date.now
    },
    belongto: {
        type: String,
        require: true,
        ref: 'account'
    },
    type: String,
    desc: String
});

//?????????
exports.sensorSchema = new Schema({
    //?????????ID
    sid:{
        type: String,
        require: true,
        index: true
    },
    key:{
        type: String,
        require: true,
        index: true
    },
    //???????????????
    tag:{
        type: String,
        require: true
    },
    //????????????
    title: {
        type:String,
        require: true
    },
    //???????????????
    description: {
        type:String,
        default: ''
    },
    //????????????
    devicetype: {
        type: String
    },
    //??????ID
    project:{
        type: ObjectId,
        require: true,
        ref: "project"
    },
    //??????ID
    building: {
        type:String,
        require: true
    },
    //??????????????????
    socity:{
        type:Schema.Types.Mixed,
        ref: 'customer'
    },
    /*
     ????????????
     NONE: ?????????,
     BYSELF: ??????????????????
     BYCOUNT: ??????????????????
     BYAREA: ???????????????
     BYCONSUMPTION: ???????????????
     * */
    paystatus: {
        type: String,
        require: true,
        default: 'NONE'
    },
    //?????????????????????
    mask:{
        type: Boolean,
        require: true,
        default: false
    },
    //?????????????????????
    freq: {
        type: Number,
        default: 1800
    },
    //??????????????????
    realfreq:{
        type: Number,
        default: 0
    },
    //??????????????????
    lasttotal: {
        type: Number,
        require: true,
        default: 0
    },
    //??????????????????
    lastvalue: {
        type: Number,
        require: true,
        default: 0
    },
    //??????????????????
    lastupdate: {
        type: Date
    },
    //???????????????????????????
    realdata:{
        type: Number,
        require: true,
        default: 0
    },
    //?????????????????????
    energy: {
        type: String,
        require: true
    },
    //????????????????????????
    energyPath: {
        type: String,
        require: true
    },
    //???????????????
    comi: {
        type: String,
        require: true,
        default: 'd*1'
    },
    comport:{
        type: String
    },
    timedelete:{
        type: Number
    },
    timecreate:{
        type: Number
    },
    code:{
        type: String,
        default: ''
    },
    coding:{
        type: String,
        default: ''
    },
    subentry: {
        type: String,
        default: ''
    }
});

var dataPoint = new Schema({
    sensor: {
        type: String,
        require: true,
        ref: 'sensor'
    },
    comport:{
        type: String
    },
    timestamp: {
        type: Date,
        require: true,
        default: Date.now
    },
    value: {
        type: Schema.Types.Mixed,
        require: true
    },
    total: {
        type: Schema.Types.Mixed,
        require: true
    },
    coding: {
        type: String
    }
});

//?????????????????????
var sensorCommandQueue = new Schema({
    /*
     ?????????????????????
     REQ: ??????????????????
     REP: ???????????????
     * */
    status: {
        type:String,
        require: true
    },
    meterid: String,
    buildingid: String,
    gatewayid: String,
    addrid: String,
    command: Schema.Types.Mixed,
    collectorAUID: String,   //???????????????
    apiAUID: String,    //????????????
    code: Number,  //?????????????????????
    retry: {    //??????????????????
        type: Number,
        default: 10
    },
    delay:{
        type: Number,
        default: 200
    },
    reqdata:{
        type: String
    },
    respdata: {
        type: String,
        default: ''
    }, //???????????????
    timecreate: {
        type: Number,
        require: true
    },
    //????????????????????????
    timeprocess: {
        type: Number,
        require: true,
        default: 0
    },
    //?????????????????????
    timedone: {
        type: Number,
        require: true,
        default: 0
    }
});

/*
 ?????????????????????
 _id: buildingID+gatewayID+meterID(?????????????????????????????????)
 driver: ??????????????????????????????
 project: ????????????
 * */
exports.sensorAttributeSchema = new Schema({
    _id: String,
    deviceId:String,
    project: ObjectId,
    auid: String,   //???????????????(Application Unique ID)
    addrid: String,     //?????????????????????
    devicetype: String,   //????????????
    tag: String,
    title: String,
    comport: Number,
    freq: Number,
    comi: String,
    status: {
        type: Schema.Types.Mixed,
        require: true,
        default: {}
    },
    driver: String,
    dataprotocol: String,
    subentry: String,
    ext: Schema.Types.Mixed,    //?????????????????????
    billingservice: Number,
    lastupdate: Number
});
exports.dataClientSchema = new Schema({
    //?????????????????????line??????????????????
    dayLine: {
        type: String,
        require: true,
        index: true,
        default:''
    },
    buildingId: {
        type: String,
        require: true,
        default:''
    },

    newBuildingId: {
        type: String,
        require: true,
        default:''
    },

    gatewayId: {
        type: String,
        require: true,
        default:''
    },
    branchId: {
        type: String,
        require: true,
        default:''
    },
    //???????????????
    branchName: {
        type: String,
        require: true,
        default:''
    },
    update: {
        type: Date
    },
    lastupdate: {
        type: Date
    },

    itemCode: {
        type: String,
        default:''
    },
    itemName: {
        type: String,
        default:''
    },
    value:{
        type: String,
        default:''
    } ,
    serverTime:{
        type: Date,
        require: true,
        default: Date.now
    }
    // timestamps:{
    //     createdAt: true,
    //     updatedAt: true,
    // },
});
//?????????????????????????????????????????????99??????gateway????????????meterid????????????
exports.meterSchema = new Schema({
    //?????????????????????line??????????????????
    buildingId: {
        type: String,
        require: true,
        default:''
    },
    gatewayId: {
        type: String,
        require: true,
        default:''
    },
    //gateway ???????????????id??????1~99 ?????????????????????gateway
    gatewayIndex: {
        type: String,
        require: true,
        default:''
    },
    //??????????????????id???????????????
    meterArchiveId: {
        type: String,
        require: true,
        default:''
    },
    //????????????meter???id 001 ?????????
    meterManagerId: {
        type: String,
        require: true,
        default:''
    },
    meterReportId: {
        type: String,
        require: true,
        default:''
    },
    branchId: {
        type: String,
        require: true,
        default:''
    },
    //???????????????
    branchName: {
        type: String,
        require: true,
        default:''
    },
    update: {
        type: Date,
        default: Date.now
    },

    itemCode: {
        type: String,
        default:''
    },
    itemName: {
        type: String,
        default:''
    },
    // timestamps:{
    //     createdAt: true,
    //     updatedAt: true,
    // },
});



exports.ObjectId = ObjectId;

exports.Resource = mongo.model('resource', resourceSchema);
exports.UrlPath = mongo.model('urlpath', urlPathSchema);
exports.DataBuffer = mongo.model('dataBuffer', dataPoint);
exports.Sensor = mongo.model('sensor', exports.sensorSchema);
// exports.SensorCommandQueue = mongo.model('commandQueue', sensorCommandQueue);
exports.SensorAttribute = mongo.model('sensorattribute', exports.sensorAttributeSchema);
exports.Project = mongo.model('project', exports.projectSchema);
exports.Building = mongo.model('building', exports.buildingSchema);
exports.DataClient = mongo.model('dataClient', exports.dataClientSchema);
exports.Meter = mongo.model('meter', exports.meterSchema);
exports.NewObjectId = function()
{
  return new mongo.Types.ObjectId;
};

exports.DailyData = function()
{
    var collectionName = 'dailyData' + moment().format('YYYYMMDD');
    return mongo.model(collectionName, dataPoint);
}