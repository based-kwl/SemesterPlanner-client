export const getTime = (e) => {
    let date = new Date(e);
    return date.getHours().toString().padStart(2,'0') + ':' + date.getMinutes().toString().padStart(2,'0');
}