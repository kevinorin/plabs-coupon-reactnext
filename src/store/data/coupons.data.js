import merchantLogoBeer from "@public/dummy/merchant_beer.png";
import merchantLogoSkin from "@public/dummy/merchant_skin.png";
import couponImageBeer1 from "@public/dummy/coupon_beer_1.png";
import couponImageNFTee1 from "@public/dummy/coupon_nftees_1.png";
import couponImageSkin1 from "@public/dummy/coupon_skin_1.png";
import merchantLogoNFTee from "@public/dummy/merchant_nftee.png";

export const debugCoupons = [
  {
    code: "BUY1 GET1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    expiry: "2022-07-02",
    imageUrl: couponImageBeer1.src,
    id: "fake-id-1",
    merchant: {
      id: "novajuice",
      logoUrl: merchantLogoBeer.src,
      name: "Novajuice",
    },
    name: "Buy 1, Get 1 Free",
    status: "active",
  },
  {
    code: "10OFF",
    expiry: "2021-11-19",
    imageUrl: couponImageSkin1.src,
    id: "fake-id-2",
    merchant: {
      id: "skin",
      logoUrl: merchantLogoSkin.src,
      name: "SKIN",
    },
    name: "10 Off Facials",
    status: "expired",
  },
  {
    code: "10NFTee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    expiry: "2021-11-19",
    imageUrl: couponImageNFTee1.src,
    id: "fake-id-3",
    merchant: {
      id: "nftees",
      logoUrl: merchantLogoNFTee.src,
      name: "NFTee",
    },
    name: "Get 10% Off Custom NFTee",
    status: "unclaimed",
    terms:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
