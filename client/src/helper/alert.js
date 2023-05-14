import Swal from "sweetalert2"

export const DeleteAlert =async (text) => {
  return await Swal.fire({
    title: 'Are you sure?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  });
}