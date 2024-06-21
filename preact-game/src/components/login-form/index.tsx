import { useState } from "react";
import { GAME_STATE } from "../../core/gameState";
import api from "../../core/axios";
import Modal from "../common/modal";
import BorderContainer from "../border-container";
import "./style.css";
import Button from "../common/button";
import { handleError } from "@/utils/helpers";

export default function LoginForm() {
  const [form, setForm] = useState(
    import.meta.env.MODE === "development"
      ? { username: "test", password: "tamdeptrai" }
      : {
          username: "",
          password: "",
        }
  );
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (loading || registerLoading) return;

    try {
      setLoading(true);
      const { data } = await api.login(form);
      if (data.user) {
        GAME_STATE.user.value = data.user;
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();
    if (loading || registerLoading) return;

    try {
      setRegisterLoading(true);
      const { data } = await api.register(form);
      if (data) {
        const { data: data2 } = await api.login(form);
        if (data2.user) {
          GAME_STATE.user.value = data2.user;
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      {!GAME_STATE.user.value?._id && (
        <Modal handleClose={() => {}}>
          <BorderContainer className="w-full h-full bg-green-200 p-8 text-center">
            <h1 className="mb-8">Pretty Bug</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 login-box"
            >
              <label>
                <span>Username</span>
                <input
                  value={form.username}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  value={form.password}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  type="password"
                />
              </label>
              <div className="flex gap-4 justify-center">
                <Button
                  type="submit"
                  loading={loading}
                  className="mt-8 btn-big"
                >
                  Login
                </Button>
                <Button
                  onClick={handleRegister}
                  loading={registerLoading}
                  className="mt-8 btn-big"
                >
                  Register
                </Button>
              </div>
            </form>
          </BorderContainer>
        </Modal>
      )}
    </>
  );
}
