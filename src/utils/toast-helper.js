// utils/toast-helper.js
import toast from "react-hot-toast";

export const showSuccess = (message) => {
  toast.success(message, { duration: 3000 });
};

export const showError = (message) => {
  toast.error(message, { duration: 4000 });
};

export const showLoading = (message = "Loading...") => {
  return toast.loading(message);
};

export const dismissToast = (id) => {
  toast.dismiss(id);
};