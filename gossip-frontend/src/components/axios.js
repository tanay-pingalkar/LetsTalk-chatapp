import axios from "axios"

const instance= axios.create({
    baseURL:"https://git.heroku.com/workingchatapp.git",
});

export default instance
