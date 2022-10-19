const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //----------------------women 
  const women_clothes = [
    "Azaria by angel",
    "Gangria by Biba ",
    "Bluezz by W",
    "Sangria by BIBA"
    ];
  const women_clothes_imgs = [
"https://dm1ll01jrnse4.cloudfront.net/optimize/opti_1188878073_img2.jpg",
"https://5.imimg.com/data5/DK/RX/MY-41608863/blue-color-kurti-500x500.jpg",
"https://i.pinimg.com/originals/29/1a/53/291a538c29236c2c66fd65808ea2b732.jpg",
"https://www.whatsappimages.in/wp-content/uploads/2022/04/New-HD-Latest-Kurti-design-images-Wallpaper.jpg" ];

 //--------------------men 
  const men_titles = [
    "Azaria by devil",
    "Solid shirt from LV ",
    "Louis by W",
    "Vinayak by G"
  ];
// --------------------men's clothing images  
  const men_titles_imgs = [
    "https://images-eu.ssl-images-amazon.com/images/I/618Wek95laS._AC._SR360,460.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/71QZ41xermL._AC._SR360,460.jpg",
    "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/10341699/2022/8/25/c23fd879-a9b3-4515-a181-558523a71b9b1661423122029-LOCOMOTIVE-Men-Black--Grey-Slim-Fit-Checked-Casual-Shirt-342-1.jpg",
    "https://www.beyoung.in/api/cache/catalog/products/printed_t-shirts_for_men_15_8_2022/fearless_bullet_rider_printed_t-shirt_for_men_base_400x533.jpg"
  ];
//ctrl + k + c for comment 
// ctrl + k + u  for uncomment 
  //--------------------Kids
  const kid_titles = [
    "CuteKids by CK",
    "Flower World by A"
  ];

  const kid_titles_imgs = [
    "https://s3.ap-south-1.amazonaws.com/tcsonline-live/catalog/category/land-boys_2.jpg",
    "https://i.insider.com/5c6eb18f342cca7f135ba1f3?width=1000&format=jpeg&auto=webp"
  ];


  async function seedProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("####-##########"),
          title: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 10, max: 50 }),
          manufacturer: faker.company.companyName(0),
          available: true,
          category: categ._id,
        });
        await prod.save();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedProducts(women_clothes, women_clothes_imgs, "Women");
  await seedProducts(men_titles, men_titles_imgs, "Men");
  await seedProducts(kid_titles, kid_titles_imgs, "Kids");
 
  await closeDB();
}

seedDB();
