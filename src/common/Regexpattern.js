const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export {usernameRegex, passwordRegex};
