import { useState } from "react"
import { GAME_STATE } from "../../core/gameState"
import api from "../../core/axios"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import './style.css'
import Button from "../common/button"

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "test",
    password: "12345678",
  })
const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (loading) return

    try {
      setLoading(true)
      const { data } = await api.login(form)
      if (data.user) {
        GAME_STATE.user.value = data.user
      }
    } catch (error) {} finally {
      setLoading(false)
    }
  }
  

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
              <Button loading={loading} className="mt-8 btn-big">Login</Button>
            </form>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
