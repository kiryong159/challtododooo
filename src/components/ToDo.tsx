import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryArry, IToDo, toDoState } from "../atom";

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  li {
    box-shadow: 0px 0px 3px 1px #55efc4;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;

    span {
      width: 53%;
    }
    button {
      border: none;
      padding: 5px;
      margin: 5px 2.5px;
      background-color: transparent;
      box-shadow: 0px 0px 3px 1px #a29bfe;
      border-radius: 5px;
      cursor: pointer;
    }

    button:last-child {
      box-shadow: 0px 0px 3px 1px #ff7675;
      cursor: pointer;
    }
  }
`;
const BtnBox = styled.div`
  width: 45%;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const cateArry = useRecoilValue(categoryArry);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((prev) => {
      const findIndex = prev.findIndex((toDo) => toDo.id === id);
      const frontToDos = prev.slice(0, findIndex);
      const backToDos = prev.slice(findIndex + 1);
      const newTodo = { text, id, category: newCategory };
      return [...frontToDos, newTodo, ...backToDos];
    });
  };

  const deleteBtn = () => {
    setToDos((prev) => {
      const findIndex = prev.findIndex((todo) => todo.id === id);
      const front = prev.slice(0, findIndex);
      const back = prev.slice(findIndex + 1);
      return [...front, ...back];
    });
  };

  return (
    <Wrapper>
      <li>
        <span>{text}</span>
        <BtnBox>
          {cateArry.map((cate, index) => {
            return (
              category !== cate && (
                <button key={index} onClick={() => onClick(cate)}>
                  {cate}
                </button>
              )
            );
          })}

          <button onClick={deleteBtn}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </BtnBox>
      </li>
    </Wrapper>
  );
}

export default ToDo;
