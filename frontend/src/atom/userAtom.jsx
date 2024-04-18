import { atom } from "recoil";

export const UserState = atom({
  key: "UserState",
  default: JSON.parse(localStorage.getItem("tokenizeMe")),
});

export const UserIdState = atom({
  key: "UserIdState",
  default: JSON.parse(localStorage.getItem("tokenizeMe"))?._id || null,
});
