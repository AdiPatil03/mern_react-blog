const Regexpattern = () => ({
    usernameRegex: /^[a-zA-Z0-9]+$/,
    passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
});

export default Regexpattern;
