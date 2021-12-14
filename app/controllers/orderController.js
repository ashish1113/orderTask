const mongoose = require('mongoose');
// const shortid = require('shortid');

const OrderModel = mongoose.model('Order')


let CreateNewOrder = (req, res) => {
    let createOrder = () => {
        return new Promise((resolve, reject) => {
            OrderModel.find({ order_Id: req.body.orderId})
                .exec((err, retreivedOrderDetail) => {

                   
                    if (err) {
                        
                        let apiResponse = {"error":true,"message":"error while creating order","code":500,"data":null}
                        reject(apiResponse)
                    } else if (retreivedOrderDetail.length ==0) {
                      
                        let newOrder = new OrderModel({
                           order_Id:req.body.orderId,
                           item_name:req.body.itemName,
                           cost:req.body.cost,
                           order_date:new Date(req.body.orderDate).toLocaleDateString('en-ZA'),
                           delivery_date:new Date(req.body.deliveryDate).toLocaleDateString('en-ZA'),
    
                        })
                        newOrder.save((err, newOrder) => {
                            if (err) {
                                console.log(err)
                                let apiResponse = {"error":true,"message":"Failed in creating order","code":500,"data":null}
                                reject(apiResponse)
                            } else {
                                let newOrderObj = newOrder.toObject();
                                resolve(newOrderObj)
                            }
                        })
                    } else {
                        let apiResponse = {"error":true,"message":"order already exists","code":500,"data":null}
                        reject(apiResponse)
                    }
                })
        })
    }// end create order function
    
    
    createOrder(req, res)
       
        .then((resolve) => {
           
            let apiResponse = {"error":false,"message":"order created successfully","code":200,"data":resolve}
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    
    
}


let updateOrder = (req, res) => {

    let options = {};
    if(req.body.deliveryDate){
        options={
            "delivery_date":new Date(req.body.deliveryDate).toLocaleDateString('en-ZA')
        }
    }
    OrderModel.updateOne({ 'order_Id': req.body.orderId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = {"error":true,"message":"Failed To edit order details","code":500,"data":null}
           
            res.send(apiResponse)
        } else if (!result || result.length ==0) {

            let apiResponse = {"error":true,"message":"No Order Found","code":500,"data":null}
           
            res.send(apiResponse)
          
        } else {
            let apiResponse = {"error":false,"message":"order uodated successfully","code":200,"data":result}
            res.send(apiResponse)
        }
    });// 


}//

let getAllOrders=(req,res)=>{
    OrderModel.find().exec((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = {"error":true,"message":"Failed To find order list","code":500,"data":null}
           
            res.send(apiResponse)
        } else if (!result || result.length ==0) {

            let apiResponse = {"error":true,"message":"No Order Found","code":500,"data":null}
           
            res.send(apiResponse)
          
        } else {
            let apiResponse = {"error":false,"message":"order list found successfully","code":200,"data":result}
            res.send(apiResponse)
        }
    });
}

let getAOrder=(req,res)=>{
    if(req.params.orderId){
        OrderModel.find({order_Id:req.params.orderId}).exec((err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = {"error":true,"message":"Failed To find order list","code":500,"data":null}
               
                res.send(apiResponse)
            } else if (!result || result.length ==0) {
    
                let apiResponse = {"error":true,"message":"No Order Found","code":500,"data":null}
               
                res.send(apiResponse)
              
            } else {
                let apiResponse = {"error":false,"message":"order  found successfully","code":200,"data":result}
                res.send(apiResponse)
            }
        });
    }else{
        let apiResponse = {"error":true,"message":"Sufficent Info Not available","code":500,"data":null}
               
                res.send(apiResponse)
    }
  
}

let deleteOrder = (req, res) => {

    if(req.params.orderId){
        OrderModel.findOneAndRemove({order_Id:req.params.orderId}).exec((err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = {"error":true,"message":"Failed To delete order ","code":500,"data":null}
               
                res.send(apiResponse)
            } else if (!result || result.length ==0) {
    
                let apiResponse = {"error":true,"message":"No Order Found","code":500,"data":null}
               
                res.send(apiResponse)
              
            } else {
                let apiResponse = {"error":false,"message":"order  deleted successfully","code":200,"data":result}
                res.send(apiResponse)
            }
        });
    }else{
        let apiResponse = {"error":true,"message":"Sufficent Info Not available","code":500,"data":null}
               
                res.send(apiResponse)
    } 


}//

module.exports={
    CreateNewOrder:CreateNewOrder,
    updateOrder:updateOrder,
    getAllOrders:getAllOrders,
    getAOrder:getAOrder,
    deleteOrder:deleteOrder
}

