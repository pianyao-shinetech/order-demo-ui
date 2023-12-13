import { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, ButtonGroup, CardActionArea, CardActions, Fab, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { searchProduct } from './services/DataService';
import { ProductDTO } from './types/product.dto';

export default function ProductGridWithInfiniteLoading({search}) {
    const [products, setProducts] = useState<Array<ProductDTO>>([]);
    const [pageNum, setPageNum] = useState<number>(1);
    const numLoaded = useRef<number>(0);
    const productsTotal = useRef<number>(0);
    const loading = useRef<boolean>(false);
    const pageSize = 10;
    const offlineProducts = [
        {
            "name": "Apple AirTag 4 Pack",
            "url": "https://www.amazon.com/dp/B0932QJ2JZ",
            "id": "B0932QJ2JZ",
            "position": 1,
            "price": 79.99,
            "numberOfOffers": null,
            "stars": 4.8,
            "reviewsCount": 96978,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/71gY9E+cTaS._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Apple AirTag",
            "url": "https://www.amazon.com/dp/B0933BVK6T",
            "id": "B0933BVK6T",
            "position": 2,
            "price": 27,
            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 156762,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/713xuNx00oS._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Echo Dot (5th Gen, 2022 release) | With bigger vibrant sound, helpful routines and Alexa | Charcoal",
            "url": "https://www.amazon.com/dp/B09B8V1LZ3",
            "id": "B09B8V1LZ3",
            "position": 3,
            "price": 22.99,
            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 71515,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/518cRYanpbL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Apple AirPods (2nd Generation) Wireless Ear Buds, Bluetooth Headphones with Lightning Charging Case Included, Over 24 Hours of Battery Life, Effortless Setup for iPhone",
            "url": "https://www.amazon.com/dp/B07PXGQC1Q",
            "id": "B07PXGQC1Q",
            "position": 4,
            "price": 99,
            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 599814,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/417OJaY3DAL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "All-new Amazon Fire TV Stick 4K streaming device, includes support for Wi-Fi 6, Dolby Vision/Atmos, free & live TV",
            "url": "https://www.amazon.com/dp/B0BP9MDCQZ",
            "id": "B0BP9MDCQZ",
            "position": 5,
            "price": 29.99,
            "numberOfOffers": null,
            "stars": 4.6,
            "reviewsCount": 3686,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/41vhe0X8wbL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Apple AirPods Pro (2nd Generation) Wireless Ear Buds with USB-C Charging, Up to 2X More Active Noise Cancelling Bluetooth Headphones, Transparency Mode, Adaptive Audio, Personalized Spatial Audio",
            "url": "https://www.amazon.com/dp/B0CHWRXH8B",
            "id": "B0CHWRXH8B",
            "position": 6,
            "price": 199.99,
            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 4380,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61SUj2aKoEL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "JBL Tune 510BT: Wireless On-Ear Headphones with Purebass Sound - Black",
            "url": "https://www.amazon.com/dp/B08WM3LMJF",
            "id": "B08WM3LMJF",
            "position": 7,
            "price": 24.95,

            "numberOfOffers": null,
            "stars": 4.6,
            "reviewsCount": 45186,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61ZDwijKtxL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "All-new Echo Show 5 (3rd Gen, 2023 release) | Smart display with 2x the bass and clearer sound | Charcoal",
            "url": "https://www.amazon.com/dp/B09B2SBHQK",
            "id": "B09B2SBHQK",
            "position": 8,
            "price": 39.99,

            "numberOfOffers": null,
            "stars": 4.4,
            "reviewsCount": 13490,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61dIsuhh4AL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Apple AirPods (3rd Generation) Wireless Ear Buds, Bluetooth Headphones, Personalized Spatial Audio, Sweat and Water Resistant, Lightning Charging Case Included, Up to 30 Hours of Battery Life",
            "url": "https://www.amazon.com/dp/B0BDHB9Y8H",
            "id": "B0BDHB9Y8H",
            "position": 9,
            "price": 139.99,

            "numberOfOffers": null,
            "stars": 4.5,
            "reviewsCount": 14260,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61jcsHsFN8L._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Introducing Echo Pop | Full sound compact smart speaker with Alexa | Charcoal",
            "url": "https://www.amazon.com/dp/B09WNK39JN",
            "id": "B09WNK39JN",
            "position": 10,
            "price": 17.99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 19817,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/41isZ6WaV9L._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Wall Charger, Surge Protector, QINLIANF 5 Outlet Extender with 4 USB Charging Ports (4.8A Total) 3-Sided 1680J Power Strip Multi Plug Adapter Spaced for Home Travel Office (3U1C)",
            "url": "https://www.amazon.com/dp/B08R6S1M1K",
            "id": "B08R6S1M1K",
            "position": 11,
            "price": 9.98,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 53444,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61Hh-YlfJOL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Amazon Echo Dot (5th Gen) with clock | Compact smart speaker with Alexa and enhanced LED display for at-a-glance clock, timers, weather, and more | Cloud Blue",
            "url": "https://www.amazon.com/dp/B09B8W5FW7",
            "id": "B09B8W5FW7",
            "position": 12,
            "price": 39.99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 54095,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/41dCprAmf0L._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Amazon Fire TV Stick, HD, sharp picture quality, fast streaming, free & live TV, Alexa Voice Remote with TV controls",
            "url": "https://www.amazon.com/dp/B08C1W5N87",
            "id": "B08C1W5N87",
            "position": 13,
            "price": 24.99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 437767,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/51TjJOTfslL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Fujifilm Instax Mini Instant Film Twin Pack (White), 20 photos",
            "url": "https://www.amazon.com/dp/B00EB4ADQW",
            "id": "B00EB4ADQW",
            "position": 14,
            "price": 13.98,

            "numberOfOffers": null,
            "stars": 4.8,
            "reviewsCount": 115451,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61dgEk4GNlL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Blink Video Doorbell | Two-way audio, HD video, motion and chime app alerts and Alexa enabled — wired or wire-free (Black)",
            "url": "https://www.amazon.com/dp/B08SG2MS3V",
            "id": "B08SG2MS3V",
            "position": 15,
            "price": 35.99,

            "numberOfOffers": null,
            "stars": 4.3,
            "reviewsCount": 122890,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/41te-uzWxDL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Apple EarPods Headphones with Lightning Connector, Wired Ear Buds for iPhone with Built-in Remote to Control Music, Phone Calls, and Volume",
            "url": "https://www.amazon.com/dp/B01M0GB8CC",
            "id": "B01M0GB8CC",
            "position": 16,
            "price": 15.99,

            "numberOfOffers": null,
            "stars": 4.6,
            "reviewsCount": 273672,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/41wYbyr3LLL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Amazon Fire TV Stick Lite, free and live TV, Alexa Voice Remote Lite, smart home controls, HD streaming",
            "url": "https://www.amazon.com/dp/B091G4YP57",
            "id": "B091G4YP57",
            "position": 17,
            "price": 17.99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 52756,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/41DTzx56EWL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Apple iPad (10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue",
            "url": "https://www.amazon.com/dp/B0BJLXMVMV",
            "id": "B0BJLXMVMV",
            "position": 18,
            "price": 349,

            "numberOfOffers": null,
            "stars": 4.8,
            "reviewsCount": 7834,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61uA2UVnYWL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Amazon Fire HD 8 Kids tablet, ages 3-7. Top-selling 8\" kids tablet on Amazon - 2022 | ad-free content with parental controls included, 13-hr battery, 32 GB, Blue",
            "url": "https://www.amazon.com/dp/B0BLGS645W",
            "id": "B0BLGS645W",
            "position": 19,
            "price": 84.99,

            "numberOfOffers": null,
            "stars": 4.6,
            "reviewsCount": 5016,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61kC1LVhhbL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Goopow Kids Camera Toys for 3-8 Year Old Boys,Children Digital Video Camcorder Camera with Cartoon Soft Silicone Cover, Best Chritmas Birthday Festival Gift for Kids - 32G SD Card Included",
            "url": "https://www.amazon.com/dp/B0B68W6ZMT",
            "id": "B0B68W6ZMT",
            "position": 20,
            "price": 36.99,

            "numberOfOffers": null,
            "stars": 4.5,
            "reviewsCount": 3931,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/7138FmFOoWL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "All-new Amazon Fire TV Stick 4K Max streaming device, supports Wi-Fi 6E, free & live TV without cable or satellite",
            "url": "https://www.amazon.com/dp/B0BP9SNVH9",
            "id": "B0BP9SNVH9",
            "position": 21,
            "price": 44.99,

            "numberOfOffers": null,
            "stars": 4.5,
            "reviewsCount": 4571,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/41P0qtzxWSL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "6 Ft Surge Protector Power Strip - 8 Widely Outlets with 4 USB Ports, 3 Side Outlet Extender with 6 Feet Extension Cord, Flat Plug, Wall Mount, Desk USB Charging Station, ETL,White",
            "url": "https://www.amazon.com/dp/B09PDLBFKY",
            "id": "B09PDLBFKY",
            "position": 22,
            "price": 9.98,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 14256,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/613PfZba9RL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Beats Solo3 Wireless On-Ear Headphones - Apple W1 Headphone Chip, Class 1 Bluetooth, 40 Hours of Listening Time, Built-in Microphone - Silver (Latest Model)",
            "url": "https://www.amazon.com/dp/B0CCBKGDJD",
            "id": "B0CCBKGDJD",
            "position": 23,
            "price": 99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 69990,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61HH4j3GZdL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "TAGRY Bluetooth Headphones True Wireless Earbuds 60H Playback LED Power Display Earphones with Wireless Charging Case IPX5 Waterproof in-Ear Earbuds with Mic for TV Smart Phone Computer Laptop Sports",
            "url": "https://www.amazon.com/dp/B09DT48V16",
            "id": "B09DT48V16",
            "position": 24,
            "price": 34.99,

            "numberOfOffers": null,
            "stars": 4.5,
            "reviewsCount": 59737,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61o1xjvnrpL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Echo Show 8 (2nd Gen, 2021 release) | HD smart display with Alexa and 13 MP camera | Charcoal",
            "url": "https://www.amazon.com/dp/B084DCJKSL",
            "id": "B084DCJKSL",
            "position": 25,
            "price": 54.99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 81162,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/51yQll2L7xL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "JBL Go 3: Portable Speaker with Bluetooth, Built-in Battery, Waterproof and Dustproof Feature - Black",
            "url": "https://www.amazon.com/dp/B08KW1KR5H",
            "id": "B08KW1KR5H",
            "position": 26,
            "price": 29.95,

            "numberOfOffers": null,
            "stars": 4.8,
            "reviewsCount": 34048,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/71EjsFSJ-lL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Amazon Fire HD 8 Kids Pro tablet- 2022, ages 6-12 | 8\" HD screen, slim case for older kids, ad-free content, parental controls, 13-hr battery, 32 GB, Rainbow Universe",
            "url": "https://www.amazon.com/dp/B09BG63ZMM",
            "id": "B09BG63ZMM",
            "position": 27,
            "price": 149.99,

            "numberOfOffers": null,
            "stars": 4.6,
            "reviewsCount": 4943,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61nYXJoFv0L._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Kindle Paperwhite (8 GB) – Now with a 6.8\" display and adjustable warm light – Black",
            "url": "https://www.amazon.com/dp/B08KTZ8249",
            "id": "B08KTZ8249",
            "position": 28,
            "price": 124.99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 46461,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/51QCk82iGcL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "TOZO T6 True Wireless Earbuds Bluetooth 5.3 Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear Built-in Mic Headset Premium Deep Bass Black",
            "url": "https://www.amazon.com/dp/B07RGZ5NKS",
            "id": "B07RGZ5NKS",
            "position": 29,
            "price": 20.99,

            "numberOfOffers": null,
            "stars": 4.4,
            "reviewsCount": 260273,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/71cVOgvystL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Beats Solo3 Wireless On-Ear Headphones - Apple W1 Headphone Chip, Class 1 Bluetooth, 40 Hours of Listening Time, Built-in Microphone - Rose Gold (Latest Model)",
            "url": "https://www.amazon.com/dp/B07YVYPNRD",
            "id": "B07YVYPNRD",
            "position": 30,
            "price": 99,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 69990,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/51PbyjVSxsL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Roku Streaming Stick | Portable Device 4K/HDR/Dolby Vision. Voice Remote, Free & Live TV",
            "url": "https://www.amazon.com/dp/B09BKCDXZC",
            "id": "B09BKCDXZC",
            "position": 31,
            "price": 39,

            "numberOfOffers": null,
            "stars": 4.7,
            "reviewsCount": 67912,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61guAYD-67L._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Apple iPad Mini (6th Generation): with A15 Bionic chip, 8.3-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Starlight",
            "url": "https://www.amazon.com/dp/B09G9BXKF5",
            "id": "B09G9BXKF5",
            "position": 32,
            "price": 423.08,

            "numberOfOffers": 4,
            "stars": 4.8,
            "reviewsCount": 8782,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/71o6PxcKkJL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Beats Studio Buds - True Wireless Noise Cancelling Earbuds - Compatible with Apple & Android, Built-in Microphone, IPX4 Rating, Sweat Resistant Earphones, Class 1 Bluetooth Headphones - Black",
            "url": "https://www.amazon.com/dp/B096SV8SJG",
            "id": "B096SV8SJG",
            "position": 33,
            "price": 70.47,

            "numberOfOffers": 22,
            "stars": 4.3,
            "reviewsCount": 79702,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/51bRSWrEc7S._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "TOZO T10 Bluetooth 5.3 Wireless Earbuds with Wireless Charging Case IPX8 Waterproof Stereo Headphones in Ear Built in Mic Headset Premium Sound with Deep Bass for Sport Black",
            "url": "https://www.amazon.com/dp/B07J2Z5DBM",
            "id": "B07J2Z5DBM",
            "position": 34,
            "price": 24.99,

            "numberOfOffers": null,
            "stars": 4.3,
            "reviewsCount": 357416,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/715CLGC8OML._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Cell Phone Stand with Wireless Bluetooth Speaker and Anti-Slip Base HD Surround Sound Perfect for Home and Outdoors with Bluetooth Speaker for Desk Compatible with iPhone/ipad/Samsung Galaxy",
            "url": "https://www.amazon.com/dp/B08GC1G4Y9",
            "id": "B08GC1G4Y9",
            "position": 35,
            "price": 27.99,

            "numberOfOffers": null,
            "stars": 4.5,
            "reviewsCount": 7879,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/71cjRhnTVtL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Upgraded, Anker Soundcore Bluetooth Speaker with IPX5 Waterproof, Stereo Sound, 24H Playtime, Portable Wireless Speaker for iPhone, Samsung and More",
            "url": "https://www.amazon.com/dp/B016XTADG2",
            "id": "B016XTADG2",
            "position": 36,
            "price": 26.36,

            "numberOfOffers": 2,
            "stars": 4.6,
            "reviewsCount": 98890,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/61y+b4M0RZL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },
          {
            "name": "Echo Dot (5th Gen) | Charcoal with Sengled Smart Color Bulb",
            "url": "https://www.amazon.com/dp/B0CGJRFPSL",
            "id": "B0CGJRFPSL",
            "position": 37,
            "price": 22.99,

            "numberOfOffers": null,
            "stars": 4.4,
            "reviewsCount": 42,
            "thumbnail_image": "https://images-na.ssl-images-amazon.com/images/I/815Bto0t5OL._AC_UL300_SR300,200_.jpg",
            "catalog": "Electronics",
            "categoryFullName": "Best Sellers in Electronics",
            "categoryUrl": "https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics/?language=en"
          },          
    ];
    const myRef = useRef<HTMLDivElement | null>(null)
    const handleScroll = () => {
      // console.log("myRef.current?.offsetTop: " + myRef.current?.offsetTop);
      // console.log("window.innerHeight + document.documentElement.scrollTop: " + (window.innerHeight + document.documentElement.scrollTop) );
      // console.log("numLoaded: " + numLoaded.current);
      // console.log("productsTotal: " + productsTotal.current);
      if (
        (myRef.current?.offsetTop || Number.POSITIVE_INFINITY) <= window.innerHeight + document.documentElement.scrollTop
        && numLoaded.current < productsTotal.current
        && !loading.current
      ) {
        setPageNum(pageNum + 1);
      }
    }
    
    // infinite scrolling
    useEffect(() => {
      loading.current = true;
      searchProduct(search, pageNum, pageSize).then(async response => {
        console.log('calling setProducts()...');
        setProducts(products.concat(response.page_data));
        // setProducts(offlineProducts);
        productsTotal.current = (response.total)
        numLoaded.current = (pageSize * (pageNum - 1) + response.page_data.length);
        loading.current = false;
      })

      window.removeEventListener('scroll', handleScroll)
      window.addEventListener('scroll', handleScroll)
    }, [pageNum]);

    return (
      <>
        <Grid sx={{ flexGrow: 1 }} container justifyContent="center" spacing={2}>
            {products.map(product => (
                <Grid key={product.id} item>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            height="250"
                            image={product.thumbnail_image}
                            alt="thumbnail image"
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              p: 0,
                              m: 0,
                              bgcolor: 'background.paper',
                              borderRadius: 1,
                            }}
                          >
                            <Typography gutterBottom variant="h5" component="div">
                            $ {product.price}
                            </Typography>
                            <Typography variant="button" display="block">
                            {product.catalog}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                          {product.name}
                          </Typography>
                        </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <ButtonGroup sx={{ margin: 'auto', width: '75%' }}
                            disableElevation
                            variant="contained"
                          >
                            <Button sx={{borderRadius: 28}}>-</Button>
                            <Button startIcon={<AddShoppingCartIcon />}>
                              Add 1 to Cart
                            </Button>
                            <Button sx={{borderRadius: 28}}>+</Button>
                          </ButtonGroup>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
        </Grid>
        <div ref={myRef} />
      </>
    );
}