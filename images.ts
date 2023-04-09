import loginImage from "./public/login.jpg";
import loginBackground from "./public/loginBackground.jpg";
import slideShow1 from "./public/slider1.jpg";
import slideShow2 from "./public/slider2.jpg";
import slideShow3 from "./public/slider3.jpg";
import slideShow4 from "./public/slider4.jpg";
import slideShow5 from "./public/slider5.jpg";
import slideShow6 from "./public/slider6.jpg";
import laptopCategory from "./public/laptop_Category.jpg";
import desktopCategory from "./public/desktop_Category.jpg";
import monitorCategory from "./public/monitor_Category.jpg";
import projectorCategory from "./public/projector_Category.jpg";
import graphicCardCategory from "./public/graphicCard_Category.png";
import accessoryCategory from "./public/accessory_Category.jpg";
import appStorePaymnet from "./public/appStorePaymnet.jpg";
import googlePlayPaymnet from "./public/googlePlayPaymnet.jpg";
import cardPayment from "./public/cardPayment.jpg";
import logo from "./public/logo.png";
import laptopBanner from "./public/laptopBanner.png";
import monitorBanner from "./public/monitorBanner.png";
import accessoryBanner from "./public/accessoryBanner.png";
import conceptdBrand from "./public/conceptdBrand.png";
import predatorBrand from "./public/predatorBrand.png";
import spatialLabsBrand from "./public/spatialLabsBrand.png";
import planet9Brand from "./public/planet9Brand.png";
import productBanner from "./public/productBanner.jpg";
import cartBanner from "./public/cartBanner.jpg";
const images = {
  loginImage,
  loginBackground,
  slideShow1,
  slideShow2,
  slideShow3,
  slideShow4,
  slideShow5,
  slideShow6,
  logo,
  laptopCategory,
  desktopCategory,
  monitorCategory,
  projectorCategory,
  accessoryCategory,
  laptopBanner,
  monitorBanner,
  accessoryBanner,
  conceptdBrand,
  predatorBrand,
  spatialLabsBrand,
  planet9Brand,
  productBanner,
  cartBanner,
  appStorePaymnet,
  googlePlayPaymnet,
  cardPayment,
};
export const slideShow = [
  slideShow1,
  slideShow2,
  slideShow3,
  slideShow4,
  slideShow5,
  slideShow6,
];
interface Icategories {
  name: string;
  image: string;
}
export const categories: Icategories[] = [
  { name: "Laptops", image: laptopCategory.src },
  { name: "Desktops", image: desktopCategory.src },
  { name: "Monitors", image: monitorCategory.src },
  { name: "Projectors", image: projectorCategory.src },
  { name: "Graphic Cards", image: graphicCardCategory.src },
  { name: "Accessories", image: accessoryCategory.src },
];
export default images;
