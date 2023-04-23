import { atom } from "recoil";

interface IUser {
  email: string;
  name: string;
  image: string;
}

export const isLoggedInAtom = atom<boolean>({
  key: "isLoggedInAtom",
  default: false,
});

export const userAtom = atom<IUser>({
  key: "userAtom",
  default: {
    email: "",
    name: "",
    image: "",
  },
});
