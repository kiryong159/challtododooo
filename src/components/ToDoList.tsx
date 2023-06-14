import {
  faFolderPlus,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryArry, categoryState, toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 40px;
  }
`;

const Wrapper = styled.div`
  width: 450px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f7f1e3;
`;

const SelectBox = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: #636e72;
  border-radius: 10px;
  padding: 10px 20px;
  height: 60px;
  position: relative;
  button {
    margin-left: 10px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    margin-right: 10px;
  }
`;

interface SelectMiniBoxProps {
  istoggle: boolean;
}

const SelectMiniBox = styled.div<SelectMiniBoxProps>`
  display: flex;
  align-items: center;
  position: relative;
  right: ${(prop) => (prop.istoggle ? "0px" : "-130px")};
  transition: right 0.3s ease-in-out;
  select {
    width: 78px;
    padding: 10px 3px;
    border-radius: 10px;
  }
  button {
    cursor: pointer;
  }
`;

const SelectAddBox = styled.div<SelectMiniBoxProps>`
  display: flex;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #dfe6e9;
  position: relative;
  right: ${(prop) => (prop.istoggle ? "0px" : "-330px")};
  top: ${(prop) => (prop.istoggle ? "0px" : "-330px")};
  transition: all 0.3s ease-in-out;
  visibility: ${(prop) => (prop.istoggle ? "visible" : "hidden")};

  input {
    width: 120px;
  }
  button {
    font-size: 15px;
    cursor: pointer;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  background-color: #636e72;
  font-size: 15px;
  font-weight: bold;
  min-height: 106px;
  span {
    font-size: 25px;
  }
`;

const UlTitle = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  button {
    font-size: 15px;
    border: none;
    padding: 5px;
    margin: 5px 2.5px;
    background-color: transparent;
    margin-left: 25px;
    box-shadow: 0px 0px 3px 1px #ff7675;
    border-radius: 5px;
    cursor: pointer;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [toggle, setToggle] = useState(false);
  const toggleList = () => {
    setToggle((prev) => !prev);
  };

  const { handleSubmit, setValue, register } = useForm();
  const [cateArry, setCateArry] = useRecoilState(categoryArry);
  const onValid = (data: any) => {
    setCateArry((prev) => {
      const newArry = [...prev, data.customOption];
      return newArry;
    });
    setValue("customOption", "");
    toggleList();
  };

  const deleteBtn = (delcategory: string) => {
    setCateArry((prev) => {
      const findIndex = prev.findIndex((cate) => cate === delcategory);
      const newCateArry = [
        ...prev.slice(0, findIndex),
        ...prev.slice(findIndex + 1),
      ];
      return newCateArry;
    });
    return setCategory("TO_DO");
  };
  return (
    <Container>
      <h1>{category}</h1>
      <Wrapper>
        <SelectBox>
          <SelectMiniBox istoggle={toggle}>
            <select value={category} onInput={onInput}>
              {cateArry.map((categ, index) => (
                <option key={index} value={categ}>
                  {categ}
                </option>
              ))}
            </select>
            <button onClick={toggleList}>
              <FontAwesomeIcon icon={faFolderPlus} />
            </button>
          </SelectMiniBox>

          <SelectAddBox istoggle={toggle}>
            <form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("customOption", {
                  required: "항목을 적어주세요",
                })}
                placeholder="추가할 항목 이름"
              />
              <button>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </form>
            <button onClick={toggleList}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </SelectAddBox>
        </SelectBox>
        <CreateToDo />
        <Ul>
          <UlTitle>
            <span>{category}</span>
            {category !== "TO_DO" ? (
              <button onClick={() => deleteBtn(category)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            ) : null}
          </UlTitle>
          {toDos.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </Ul>
      </Wrapper>
    </Container>
  );
}

export default ToDoList;
