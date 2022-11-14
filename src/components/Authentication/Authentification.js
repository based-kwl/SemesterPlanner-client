import {useNavigate} from "react-router-dom";

/**
 * @author: Jasmin Guay
 * Function to authenticate user in a page.
 * @returns {{email: String, username: String, token: String}|null} : if authenticated return a minimal user object
 * else redirect to log in.
 */
export default function GetAuthentication() {
    if ((localStorage.getItem("email") != null || localStorage.getItem("email") !== undefined)
        || (localStorage.getItem("username") != null || localStorage.getItem("username") !== undefined)
        || (localStorage.getItem("token") != null || localStorage.getItem("username") !== undefined)
        ) {
        return ({
            email: JSON.parse(localStorage.getItem("email")),
            username: JSON.parse(localStorage.getItem("email")),
            token: JSON.parse(localStorage.getItem("token"))
        });
    } else {
        return null;
    }
}


