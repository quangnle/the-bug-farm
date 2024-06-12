import { motion } from "framer-motion"
import { Fragment, useState } from "react"
import { Dialog, Field, Input, Label, Transition } from "@headlessui/react"
import { GAME_STATE } from "../../core/gameState"
import api from "../../core/axios"
import Backdrop from "../common/backdrop"
import Modal from "../common/modal"

export default function LoginForm({ show }: { show: boolean }) {
  const [form, setForm] = useState({
    username: "test",
    password: "12345678",
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await api.login(form)
      if (data.user) {
        GAME_STATE.value = { ...GAME_STATE.value, user: data.user }
      }
    } catch (error) {}
  }

  return (
    <>
      {true && <Modal modalOpen={true} handleClose={() => {}} />}
    </>
  )
}
