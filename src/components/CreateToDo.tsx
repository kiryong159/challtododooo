import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, categoryState } from "../atom";

export interface IFrom {
  toDo: string;
}

const Wrapper = styled.div`
  padding: 10px;
  background-color: #636e72;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  form {
    display: flex;
    align-items: center;
    input {
      border-radius: 5px;
      padding: 5px 10px;
      border: none;
    }
    button {
      font-size: 20px;
      background-color: transparent;
      border: none;
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IFrom>();
  const setToDos = useSetRecoilState(toDoState);
  const categoryState2 = useRecoilValue(categoryState);
  const onValid = ({ toDo }: IFrom) => {
    setToDos((oldTodo) => [
      ...oldTodo,
      { text: toDo, category: categoryState2, id: Date.now() },
    ]);
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "Write a  ToDo" })}
          placeholder={`Write a ${categoryState2}`}
        />
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </Wrapper>
  );
}
export default CreateToDo;
