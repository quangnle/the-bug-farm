import FlowerPlant from "@/components/flower-plant";
import GameBody from "@/components/game-body";
import GameHeader from "@/components/game-header";
import LoginForm from "@/components/login-form";
import QuestionModal from "@/components/question-modal";
import SelectedObject from "@/components/selected-object";
import api, { getToken } from "@/core/axios";
import { GAME_STATE, needVerifyQuestion } from "@/core/gameState";
import { handleError } from "@/utils/helpers";
import { useEffect, useState } from "react";
import BorderContainer from "../../components/border-container";
import "./style.css";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    GAME_STATE.token.value = getToken()?.accessToken;
    const autoLogin = async () => {
      try {
        const data = await api.me(false);
        console.log({ data });
        if (data) {
          GAME_STATE.user.value = data;
        }
      } catch (error) {
        handleError(error);
      }
    };
    if (GAME_STATE.token.value) autoLogin();
    else setShowLogin(true);
  }, [GAME_STATE.token.value]);

  return (
    <div className="homepage h-screen overflow-hidden">
      {needVerifyQuestion.value === true && <QuestionModal />}
      <div className="mx-auto">
        <div className="flex flex-col gap-4 2xl:gap-8">
          {showLogin && <LoginForm />}
          <GameHeader />
          <div className="flex gap-4 xxl:gap-8">
            <GameBody />
            <div className="flex flex-col gap-4 xxl:gap-8 flex-1 min-w-[300px]">
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
