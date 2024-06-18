import { useState } from "react"
import { GAME_STATE } from "../../core/gameState"
import api from "../../core/axios"
import Modal from "../common/modal"
import BorderContainer from "../border-container"

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "test",
    password: "12345678",
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const { data } = await api.login(form)
      if (data.user) {
        GAME_STATE.user.value = data.user
      }
    } catch (error) {}
  }
  

  return (
    <>
      {!GAME_STATE.user.value?._id && (
        <Modal handleClose={() => {}}>
          <BorderContainer className="w-full h-full bg-white p-8 text-center">
            <h1 className="mb-4">Pretty Bug</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                value={form.username}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, username: event.target.value }))
                }
              />
              <input
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
              />
              <button className="hover:bg-orange-50">Login</button>
            </form>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
