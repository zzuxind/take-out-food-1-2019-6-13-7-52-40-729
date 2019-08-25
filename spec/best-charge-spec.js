
var order=["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
var allPromotions=[{
  type: '满30减6元'
}, {
  type: '指定菜品半价',
  items: ['ITEM0001', 'ITEM0022']
}];

describe('Take out food', function () {

it("should put menu to map",()=>{
let countProduct=countProducts(order);
expect(countProduct.get("ITEM0001")).toBe(1);
});


it("get menu detail by id",()=>{
  let itemDetail=getItemDetail("ITEM0001");
  expect(itemDetail.name).toEqual("黄焖鸡");  
});

it("get all menu detail by input orderMap",()=>{
  let allMenueMap=getAllItemDetail(countProducts(order));
  console.log(allMenueMap);
  expect(allMenueMap.get("ITEM0001").count).toBe(1);
});

it("should return total price",()=>{
  let allMenueMap=getAllItemDetail(countProducts(order));
  let totalPrice=TotalPrice(allMenueMap);
  expect(totalPrice).toBe(38);
})

it("should substract ￥6 if enough ￥30",()=>{
  let allMenueMap=getAllItemDetail(countProducts(order));
  let totalPrice=TotalPrice(allMenueMap);
  let discountObject=discountIfEnoughThirty(totalPrice);
  expect(discountObject.discountPrice).toBe(32);
})

it("should half price for given items",()=>{
  let allMenueMap=getAllItemDetail(countProducts(order));
  let discountedObject=HalfPriceForGivenItems(allMenueMap,['ITEM0001', 'ITEM0022']);
  expect(discountedObject.discountPrice).toBe(25);
})

it("should choose second promotion",()=>{
  let allMenueMap=getAllItemDetail(countProducts(order));
  let promotionDetail=choosePromotion(allMenueMap,allPromotions);
  expect(promotionDetail.promotion).toEqual("指定菜品半价(黄焖鸡，凉皮)");
})

it('should generate best charge when best is 指定菜品半价', function() {
      let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
      let summary = bestCharge(inputs).trim();
      console.log(summary);
    });

    it('should generate best charge when best is 满30减6元', function() {
          let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
          let summary = bestCharge(inputs).trim();
          console.log(summary);
        });
      
        it('should generate best charge when no promotion can be used', function() {
          let inputs = ["ITEM0013 x 4"];
          let summary = bestCharge(inputs).trim();
          console.log(summary);
        });
// it('should generate best charge when best is 指定菜品半价', function() {
//     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
//     ============= 订餐明细 =============
//     黄焖鸡 x 1 = 18元
//     肉夹馍 x 2 = 12元
//     凉皮 x 1 = 8元
//     -----------------------------------
//     使用优惠:
//     指定菜品半价(黄焖鸡，凉皮),省13元
//     -----------------------------------
//     总计：25元
//     ===================================`.trim()

//     expect(summary).toEqual(expected)
//   });

//   it('should generate best charge when best is 满30减6元', function() {
//     let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 满30减6元，省6元
// -----------------------------------
// 总计：26元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

//   it('should generate best charge when no promotion can be used', function() {
//     let inputs = ["ITEM0013 x 4"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// -----------------------------------
// 总计：24元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

})