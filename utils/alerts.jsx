import Swal from "sweetalert2";

export const errorAlert = (txt) => {
  return Swal.fire({
    icon: "error",
    title: txt,
  });
};
export const successAlert = (txt) => {
  return Swal.fire({
    title: txt,
    icon: "success",
  });
};
