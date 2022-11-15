/**
 * @author: Jasmin Guay
 * Function to authenticate user in a page.
 * @returns {{email: String, username: String, token: String}|null} : if authenticated return a minimal user object
 * else return null.
 */
export default function GetAuthentication() {
    if ((localStorage.getItem("email") != null)
        || (localStorage.getItem("username") != null)
        || (localStorage.getItem("token") != null)
        ) {
        return ({
            email: JSON.parse(localStorage.getItem("email")),
            username: JSON.parse(localStorage.getItem("username")),
            token: JSON.parse(localStorage.getItem("token"))
        });
    } else {
        return null
    }
}

