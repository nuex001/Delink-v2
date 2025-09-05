import { toast } from "react-toastify";



export const errorMsgs = (e) =>
  toast(e, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: "error",
    theme: "dark",
  });
export const successMsg = (e) =>
  toast(e, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: "success",
    theme: "dark",
  });