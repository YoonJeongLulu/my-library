import { atom } from "recoil";

export const pageAtom = atom<number>({
  key: "pageAtom",
  default: 1,
});

// Usage
// const [page, setPage] = useRecoilState(pageAtom);
