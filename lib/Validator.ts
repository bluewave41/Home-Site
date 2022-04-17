import isValid from 'date-fns/isValid';

const validateField = function(field: string) {
    if(!field) {
        return false;
    }
    return true;
}

const validateDate = function(date: string) {
    const parsed = new Date(date);
    if(!isValid(parsed)) {
        return false
    }
    return parsed;
}

export { validateField, validateDate };