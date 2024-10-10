import { atom } from "recoil";

export const $Counter = atom({
  key: "$Counter",
  default: 100,
});

export const $sideMenuIndex = atom({
  key: "$sideMenuIndex",
  default: true,
});

export const $Users = atom({
  key: "$Users",
  default: [
    { name: "ali", email: "ali@icloud.com", password: 1234 },
    { name: "ahmed", email: "ahmed@icloud.com", password: 1234 },
    { name: "hossam", email: "hossam@icloud.com", password: 1234 },
  ],
});
