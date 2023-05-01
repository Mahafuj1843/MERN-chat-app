import Swal from "sweetalert2"
// import { taskUpdateRequest } from "../apiRequest/apiRequest"

export const DeleteAlert =async (id) => {
  return await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
}

// export const UpdateTask = (id, status) => {
//   return Swal.fire({
//     title: 'Update Status',
//     input: 'select',
//     inputOptions: { New: 'New', Progress: 'Progress', Completed: 'Completed', Canceled: 'Canceled' },
//     inputValue: status
//   }).then((result) => {
//     if (result.isConfirmed) {
//       return taskUpdateRequest(id, result.value).then((result) => {
//         return result;
//       })
//     }
//   })
// }