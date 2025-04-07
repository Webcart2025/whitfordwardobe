import React from 'react'
import HomeCategoryCard from './HomeCategoryCard'
import { useAppSelector } from '../../../../Redux Toolkit/Store';

const homeCategory=[
  // {
  //   "parentCategoryId":"women",
  //   "level":2,
  //   "name":"Over Sized T-Shirt",
  //   "categoryId": "Over Sized T-Shirt",
  //   "section":"SHOP_BY_CATEGORIES",
  // }
//   {
//     "parentCategoryId":"women",
//     "level":2,
//     "name":"Sports & Active Wear",
//     "categoryId": "women_sports_active_wear",
//     "section":"SHOP_BY_CATEGORIES",
//   },
//   {
//     "parentCategoryId":"women",
//     "level":2,
//     "name":"Sports & Active Wear",
//     "categoryId": "women_sports_active_wear",
//     "section":"SHOP_BY_CATEGORIES",
//     image:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/22109480/2023/9/5/06a17ac3-46b0-4f9d-bcb1-2d3582feda041693895310152PumaWomenBrandLogoPrintedPureCottonOutdoorT-shirt1.jpg"
//   },

//   {
//     "parentCategoryId":"women",
//     "level":2,
//     "name":"Sports & Active Wear",
//     "categoryId": "women_sports_active_wear",
//     "section":"SHOP_BY_CATEGORIES",
//     image:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/22109480/2023/9/5/06a17ac3-46b0-4f9d-bcb1-2d3582feda041693895310152PumaWomenBrandLogoPrintedPureCottonOutdoorT-shirt1.jpg"
//   },
//   {
//     "parentCategoryId":"women",
//     "level":2,
//     "name":"Lingerie Sleepwear",
//     "categoryId": "women_lingerie_sleepwear",
//     "section":"SHOP_BY_CATEGORIES",
//     image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/362895/2023/10/18/bfb55058-fe1a-45d6-a39d-1b8d421e02001697603774147TriumphShapeSensation33withHighWaistTummyandThighControlMaxi1.jpg"
//   },

//     {
//       "parentCategoryId":"women",
//       "level":2,
//       "name":"Indian & fusion Wear",
//       "categoryId": "women_indian_and_fusion_wear",
//       "section":"SHOP_BY_CATEGORIES",
//       image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22866694/2023/4/24/98951db4-e0a5-47f8-a1be-353863d24dc01682349679664KaliniOrangeSilkBlendEthnicWovenDesignFestiveSareewithMatchi2.jpg"
//     },
//     {
//       "parentCategoryId":"women",
//       "level":2,
//       "name":"western wear",
//       "categoryId": "women_western_wear",
//       "section":"SHOP_BY_CATEGORIES",
//       image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22391504/2023/3/17/3259c109-060a-4c39-aba2-e9d32e2068e41679049035856StyleQuotientPeach-ColouredTie-UpNeckPuffSleeveCottonTop1.jpg"
//     },
//     {
//       "parentCategoryId":"women",
//       "level":2,
//       "name":"western wear",
//       "categoryId": "women_western_wear",
//       "section":"SHOP_BY_CATEGORIES",
//       image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22391504/2023/3/17/3259c109-060a-4c39-aba2-e9d32e2068e41679049035856StyleQuotientPeach-ColouredTie-UpNeckPuffSleeveCottonTop1.jpg"
//     },
//     {
//         "name": "Topweres men",
//         "categoryId": "men_topwear",
//         "parentCategoryId":"men",
//         "level":2,
//         "section":"SHOP_BY_CATEGORIES",
//         image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23029834/2023/9/18/96c015ae-1090-4036-954b-d9c80085b1d71695022844653-HRX-by-Hrithik-Roshan-Men-Jackets-6981695022843934-1.jpg"
//     },
//     {
//         "name": "Bottomwere",
//         "categoryId": "men_bottomwear",
//         "parentCategoryId":"men",
//         "level":2,
//         "section":"SHOP_BY_CATEGORIES",
//         image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/20122324/2022/9/22/91c61c45-fe17-4d1d-8e20-0aaaf90186b61663827920015RaymondSlimFitBlueJeansForMen1.jpg"
//     },
//     {
//       "name": "Bottomwere",
//       "categoryId": "men_bottomwear",
//       "parentCategoryId":"men",
//       "level":2,
//       "section":"SHOP_BY_CATEGORIES",
//       image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/20122324/2022/9/22/91c61c45-fe17-4d1d-8e20-0aaaf90186b61663827920015RaymondSlimFitBlueJeansForMen1.jpg"
//   },
//   {
//     "name": "Bottomwere",
//     "categoryId": "men_bottomwear",
//     "parentCategoryId":"men",
//     "level":2,
//     "section":"SHOP_BY_CATEGORIES",
//     image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/20122324/2022/9/22/91c61c45-fe17-4d1d-8e20-0aaaf90186b61663827920015RaymondSlimFitBlueJeansForMen1.jpg"
// },
// {
//   "name": "Bottomwere",
//   "categoryId": "men_bottomwear",
//   "parentCategoryId":"men",
//   "level":2,
//   "section":"SHOP_BY_CATEGORIES",
//   image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/20122324/2022/9/22/91c61c45-fe17-4d1d-8e20-0aaaf90186b61663827920015RaymondSlimFitBlueJeansForMen1.jpg"
// },
// {
//   "name": "Bottomwere",
//   "categoryId": "men_bottomwear",
//   "parentCategoryId":"men",
//   "level":2,
//   "section":"SHOP_BY_CATEGORIES",
//   image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/20122324/2022/9/22/91c61c45-fe17-4d1d-8e20-0aaaf90186b61663827920015RaymondSlimFitBlueJeansForMen1.jpg"
// },
// {
//   "name": "Bottomwere",
//   "categoryId": "men_bottomwear",
//   "parentCategoryId":"men",
//   "level":2,
//   "section":"SHOP_BY_CATEGORIES",
//   image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/20122324/2022/9/22/91c61c45-fe17-4d1d-8e20-0aaaf90186b61663827920015RaymondSlimFitBlueJeansForMen1.jpg"
// },
// {
//   "name": "Bottomwere",
//   "categoryId": "men_bottomwear",
//   "parentCategoryId":"men",
//   "level":2,
//   "section":"SHOP_BY_CATEGORIES",
//   image:"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/20122324/2022/9/22/91c61c45-fe17-4d1d-8e20-0aaaf90186b61663827920015RaymondSlimFitBlueJeansForMen1.jpg"
// },
  
]
const HomeCategory = () => {
  const { homePage} = useAppSelector((store) => store);
  return (
    <div className='flex justify-center gap-7 flex-wrap '>
        {homePage.homePageData?.shopByCategories.map((item)=><HomeCategoryCard item={item}/>)}
        
    </div>
  )
}

export default HomeCategory