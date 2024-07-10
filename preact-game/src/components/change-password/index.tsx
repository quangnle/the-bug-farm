import { FC, FormEvent, useState } from "react";
import Modal from "../common/modal";
import BorderContainer from "../border-container";
import { handleError } from "@/utils/helpers";
import api from "@/core/axios";
import Button from "../common/button";

interface IProp {
  handleClose?: () => void;
}

const ChangePasswordModal: FC<IProp> = ({ handleClose }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.changePassword(form);
      alert(data.message);
      handleClose && handleClose();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal handleClose={handleClose}>
      <BorderContainer className="w-full h-full bg-green-200 p-8 text-center">
        <h1 className="mb-8">Change Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 login-box">
          <label>
            <span>Old Password</span>
            <input
              type="password"
              value={form.oldPassword}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  oldPassword: event.target.value,
                }))
              }
            />
          </label>
          <label>
            <span>New Password</span>
            <input
              value={form.newPassword}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  newPassword: event.target.value,
                }))
              }
              type="password"
            />
          </label>
          <div className="flex gap-4 justify-center">
            <Button loading={loading} type="submit" className="mt-8 btn-big">
              Submit
            </Button>
          </div>
        </form>
      </BorderContainer>
    </Modal>
  );
};

export default ChangePasswordModal;
