
var allItems=loadAllItems();
function bestCharge(selectedItems) {
return /*TODO*/;
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
    allItemDetailMap.set(key,itemDetail);
  });
  return allItemDetailMap;
}

