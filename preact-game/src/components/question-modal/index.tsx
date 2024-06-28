import { FC, useEffect, useState } from "react";
import Modal from "../common/modal";
import api from "@/core/axios";
import BorderContainer from "../border-container";
import Button from "../common/button";
import { GAME_STATE, needVerifyQuestion } from "@/core/gameState";

interface IProp {}

const QuestionModal: FC<IProp> = () => {
  const [question, setQuestion] = useState<IQuestion>();

  const fetchQuestions = async () => {
    try {
      const { data } = await api.getQuestions();
      setQuestion(data);
    } catch (err: any) {
      alert(err?.response?.data.message);
    }
  };

  const answerQuestion = async (answer: string) => {
    try {
      const { data } = await api.answerQuestion(question?._id!, { answer });
      const meData = await api.me();
      if (meData) {
        GAME_STATE.user.value!.money = meData.money;
      }
      alert(data.message);
    } catch (err: any) {
      console.log(err.response.data);
      alert(err?.response?.data.message);
    } finally {
      needVerifyQuestion.value = false;
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Modal>
      <BorderContainer className="bg-black/60 p-8 text-white">
        <img src={question?.description} alt="question" />
        <div className="flex justify-center gap-5 mt-6">
          {question?.answers.map((answer) => (
            <Button onClick={() => answerQuestion(answer)} key={answer}>
              {answer}
            </Button>
          ))}
        </div>
      </BorderContainer>
    </Modal>
  );
};

export default QuestionModal;
