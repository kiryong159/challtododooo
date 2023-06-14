import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE" | string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryArry = atom<IToDo["category"][]>({
  key: "categoryArry",
  default: ["TO_DO", "DOING", "DONE"],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const categ = get(categoryState);
    return toDos.filter((toDo) => toDo.category === categ);
  },
});
