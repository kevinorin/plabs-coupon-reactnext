// Types
// import { ICampaign } from "@typings/coupon.types";

// import merchantLogoBeer from "/dummy/merchant_beer.png";
// import couponImageBeer1 from "/dummy/coupon_beer_1.png";
// import couponImageBeer2 from "/dummy/coupon_nftees_1.png";

export const debugCampaigns = [
  {
    code: "BUY2 GET2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    endDate: "2022-08-02",
    imageUrl: 'couponImageBeer1.src',
    id: "fake-id-2",
    merchant: {
      id: "novajuice",
      logoUrl: 'merchantLogoBeer.src',
      name: "Novajuice",
    },
    name: "Buy 1, Get 1 Free",
    series: 200,
    startDate: "2022-06-02",
    status: "draft",
  },
  {
    code: "BUY1 GET1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    endDate: "2022-07-02",
    imageUrl: 'couponImageBeer1.src',
    id: "fake-id-1",
    merchant: {
      id: "novajuice",
      logoUrl: 'merchantLogoBeer.src',
      name: "Novajuice",
    },
    name: "Buy 1, Get 1 Free",
    series: 100,
    startDate: "2022-06-02",
    status: "active",
  },
  {
    code: "FREDRINK",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    endDate: "2021-11-19",
    imageUrl: 'couponImageBeer2.src',
    id: "fake-id-3",
    merchant: {
      id: "novajuice",
      logoUrl: 'merchantLogoBeer.src',
      name: "Novajuice",
    },
    name: "Free Beverage",
    series: 50,
    startDate: "2021-10-02",
    status: "ended",
    terms:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
