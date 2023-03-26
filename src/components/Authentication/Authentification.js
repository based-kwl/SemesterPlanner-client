import axios from "axios";

/**
 * @author: Jasmin Guay
 * Function to get auth info for user.
 * @returns {{email: String, username: String}|null} : if authenticated return a minimal user object
 * else return null.
 */
export function GetAuthentication() {
    if ((localStorage.getItem("email") != null)
        && (localStorage.getItem("username") != null)) {
        return {
            email: JSON.parse(localStorage.getItem("email")),
            username: JSON.parse(localStorage.getItem("username"))
        }
    }
    window.location='/login';
}

export function HandleLogout() {
    localStorage.removeItem("email");
    localStorage.removeItem("username");

    axios.get(`${process.env.REACT_APP_BASE_URL}login/logout`)
        .then(() => {
            window.location.href = '/login'
        })
        .catch(err => {console.log(err)});
}