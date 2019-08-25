var allPromotions=loadPromotions();
var allItems=loadAllItems();
function bestCharge(selectedItems) {
  return printReceipt(selectedItems);
}
/**
 * 整理订单
 * ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]=>{{id: ,count:},{}}
 * @param {*} order 
 */
function countProducts (order) {
let map=new Map();
order.forEach(element => {
let menuId=element.substr(0,8);
let count=parseInt(element.substr(-1));
map.set(menuId,count);
});
return map;
}

/**
 * 根据id返回订单详情
 * id => {}
 * @param {*} id 
 */
function getItemDetail(id){
  for (let index = 0; index < allItems.length; index++) {
    const element = allItems[index];
    if(element.id == id){
      let itemDetail={"name":element.name,"price":element.price};
      console.log(itemDetail);
      return itemDetail;
    } 
  }
}

/**
 * 获得订单中所有商品的去详情，存入map
 * map{id:,count:}=>map{id,{name:,price:,count}}
 */
function getAllItemDetail(orderMap){
  let allItemDetailMap=new Map();
  orderMap.forEach((value,key) => {
    let itemDetail=getItemDetail(key);
    itemDetail.count=value;
    allItemDetailMap.set(key,itemDetail);
  });
  return allItemDetailMap;
}


/**
 * 计算订单总价
 * map{id,{name:,price:,count}} => number
 */
function TotalPrice(allItemDetailMap){
  let totalPrice=0;
  allItemDetailMap.forEach((value,key) => {
    let itemPrice=(value.price)*(value.count);
    totalPrice+=itemPrice;
  });
  return totalPrice;
}

/**
 * 选择满30减6元的优惠后的价格
 * totalPrice => {discountPrice:number,saveMoney:}
 */
function discountIfEnoughThirty(totalPrice){
  let discountPrice=totalPrice >= 30?totalPrice-6:totalPrice;
  let discountObject={discountPrice:discountPrice,saveMoney:totalPrice-discountPrice};
  return discountObject;
}

/**
 * 指定菜品半价后优惠价格
 * map{id,{name:,price:,count}} => {discountPrice:number,saveMoney:}
 */
function HalfPriceForGivenItems(allItemDetailMap,givenItems){
  let totalPrice=TotalPrice(allItemDetailMap);
  allItemDetailMap.forEach((value,key) => {
     for (let index = 0; index < givenItems.length; index++) {
       const element = givenItems[index];
       if(key == element){
         value.price=value.price/2;
         break;
       }
     }
  });
  let discountedPrice=TotalPrice(allItemDetailMap);
  let discountedObject={discountPrice:discountedPrice,saveMoney:totalPrice-discountedPrice};
  return discountedObject;
}

/**
 * 选择优惠方式
 * map{id,{name:,price:,count}},givenItems => {promotion:,discountPrice:,saveMoney:}
 */
function choosePromotion(allItemDetailMap,allPromotions){
  let promotionDetail={};
  let tempObject;
  let totalPrice=TotalPrice(allItemDetailMap);
  let min=totalPrice;
  allPromotions.forEach(element => {
      if(element.type=="满30减6元"){
        tempObject=discountIfEnoughThirty(totalPrice);
        if(tempObject.discountPrice<min){
          min=tempObject.discountPrice;
          promotionDetail={promotion:element.type,discountPrice:tempObject.discountPrice,saveMoney:tempObject.saveMoney};
        }
      }if(element.type=="指定菜品半价"){
        tempObject=HalfPriceForGivenItems(allItemDetailMap,element.items);
        if(tempObject.discountPrice<min){
          min=tempObject.discountPrice;
          promotionDetail={promotion:element.type+"(黄焖鸡，凉皮)",discountPrice:tempObject.discountPrice,saveMoney:tempObject.saveMoney};
        }
        
      }
    });
  return promotionDetail;
}

/**
 * 打印小票
 *order[] => string
 */
function printReceipt(order){
  let head="============= 订餐明细 =============\n";
  let middle="-----------------------------------\n";
  let middleOrder="";
  allItemsDetailMap=getAllItemDetail(countProducts(order));
  let totalPrice=TotalPrice(allItemsDetailMap);
  allItemsDetailMap.forEach((value) => {
    let itemDetail=value.name+" x "+value.count+" = "+value.count*value.price+"元\n";
    middleOrder+=itemDetail;
  });
  choosedPromotion=choosePromotion(allItemsDetailMap,allPromotions);
  let footerDetail="使用优惠:\n"+choosedPromotion.promotion+",省"+choosedPromotion.saveMoney+"元\n";
  let discountedTotalPrice="总计："+choosedPromotion.discountPrice+"元\n";
  let end="===================================";
  if(choosedPromotion == null){
    return head+middleOrder+middle+footerDetail+middle+discountedTotalPrice+end;
  }else{
    return head+middleOrder+middle+"总计:"+totalPrice+"\n"+end;
  }
  
  
  
}