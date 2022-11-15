/**
 * @author: Jasmin Guay
 * Function to get auth info for user.
 * @returns {{email: String, username: String, token: String}|null} : if authenticated return a minimal user object
 * else return null.
 */
export default function GetAuthentication() {
    return ((localStorage.getItem("email") != null)
        || (localStorage.getItem("username") != null)
        || (localStorage.getItem("token") != null))
        ?
        {
            email: JSON.parse(localStorage.getItem("email")),
            username: JSON.parse(localStorage.getItem("username")),
            token: JSON.parse(localStorage.getItem("token"))
        }
        : null
}

