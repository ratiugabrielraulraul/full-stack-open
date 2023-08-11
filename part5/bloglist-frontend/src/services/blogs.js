import axios from "axios"
const baseUrl = "/api/blogs"

// token will be used to store the authentication token.
let token = null;


const setToken = newToken => {
  token = `Bearer ${newToken}`
};


//responsible for making a POST request to the backend API to create a new object
const create = async newObject => {
  //a config object is created with the headers property containing the Authorization header with the token.
  //used to send the token as part of the request headers when calling the axios.post method.
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};
export default { getAll, create, setToken, update, remove }