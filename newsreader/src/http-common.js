import axios from "axios";

export default axios.create({
    baseURL: "https://ide-aceecfaeadfaeddaaebdbddabfdbddbccd.premiumproject.examly.io/proxy/8080/",
    headers: {
        "Content-type": "application/json"
    }
});
