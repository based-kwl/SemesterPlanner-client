/**
 * @author: Jasmin Guay
 * Function to get auth info for user.
 * @returns {{email: String, username: String}|null} : if authenticated return a minimal user object
 * else return null.
 */
export default function GetAuthentication() {
    if ((localStorage.getItem("email") != null)
        && (localStorage.getItem("username") != null)) {
        return {
            email: JSON.parse(localStorage.getItem("email")),
            username: JSON.parse(localStorage.getItem("username"))
        }
    }
    window.location='/login';
}

