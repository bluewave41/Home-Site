const dateToString = function(date: Date) {
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}

export { dateToString };