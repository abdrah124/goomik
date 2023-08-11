export const sortArray = (array:string[]) => {
return array.sort(function (a, b) {
    return ('' + a).localeCompare(b);
})
}
