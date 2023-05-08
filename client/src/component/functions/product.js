import axios from "axios";

export const createProduct = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/product", value, {
    headers: {
      authtoken,
    },
  });
};

export const listProduct = async (count) =>
  await axios.get(process.env.REACT_APP_API + "/product/" + "count");

// export const deleteCategory = async (authtoken, id) =>
//   await axios.delete(process.env.REACT_APP_API + "/category/" + id, {
//     headers: {
//       authtoken,
//     },
//   });

// export const readCategory = async (authtoken, id) =>
//   await axios.get(process.env.REACT_APP_API + "/category/" + id, {
//     headers: {
//       authtoken,
//     },
//   });

// export const editCategory = async (authtoken, id, value) => {
//   // console.log(value);
//   return await axios.put(process.env.REACT_APP_API + "/category/" + id, value, {
//     headers: {
//       authtoken,
//     },
//   });
// };
