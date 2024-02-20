const validator = require('validator');


const validateEmail = (email) => {
    return validator.isEmail(email);
};

const validateLength = (str, min, max) => {
    return validator.isLength(str, { min, max });
};

const validateNotEmpty = (str) => {
    return !validator.isEmpty(str.trim());
};

const validatePhoneNumber = (phone) => {
    return validator.isMobilePhone(phone);
};

const validateNumeric = (str) => {
    return validator.isNumeric(str);
};

const validateEscape = (str) => {
    return validator.escape(str);
};

module.exports = {
    validateEmail,
    validateLength,
    validateNotEmpty,
    validatePhoneNumber,
    validateNumeric,
    validateEscape
};