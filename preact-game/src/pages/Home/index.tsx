import FlowerPlant from "@/components/flower-plant";
import GameBody from "@/components/game-body";
import GameHeader from "@/components/game-header";
import LoginForm from "@/components/login-form";
import SelectedObject from "@/components/selected-object";
import api from "@/core/axios";
import { GAME_STATE, needVerifyQuestion } from "@/core/gameState";
// import { needVerifyQuestion } from "@/core/entity/farm";
import { handleError } from "@/utils/helpers";
import { useEffect, useState } from "react";
import BorderContainer from "../../components/border-container";
import "./style.css";
import QuestionModal from "@/components/question-modal";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const data = await api.me(false)
        console.log({ data })
        if (data) {
          GAME_STATE.user.value = data;
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  return (
    <div className="homepage h-screen overflow-hidden">
      {needVerifyQuestion.value === true && <QuestionModal />}
      <div className="mx-auto">
        <div className="flex flex-col gap-8">
          {!loading && <LoginForm />}
          <GameHeader />
          <div className="flex gap-8">
            <GameBody loading={loading} />
            <div className="flex flex-col gap-8 flex-1 min-w-[300px]">
              <BorderContainer className="flex-1 p-4 bg-green-200">
                <SelectedObject />
              </BorderContainer>
              <BorderContainer className="flex-1 p-4 bg-green-200">
                <FlowerPlant />
              </BorderContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
