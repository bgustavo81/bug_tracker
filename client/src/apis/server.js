import axios from 'axios';

// axios.defaults.withCredentials = true;
let baseURL;

if (process.env.NODE_ENV === "production") {
    baseURL = 'https://bugtrackerly.herokuapp.com/';
} else {
    baseURL = 'http://localhost:5000';
}

console.log(baseURL);
export default axios.create({
    baseURL: baseURL,
});