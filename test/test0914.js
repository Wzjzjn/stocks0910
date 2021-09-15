const dip = require("dipiper");

// dip.stock.symbols.getStockList().then((data)=>{
//     //数据存储、处理逻辑，请自行实现
//     console.log(data);
// })

dip.stock.symbols.getStockIssue("000725").then((data)=>{

    //数据存储、处理逻辑，请自行实现
    console.log(data);
})

dip.stock.trading.getDailyHis("17","sh600005").then((data)=>{

    //数据存储、处理逻辑，请自行实现
    console.log(data);
});