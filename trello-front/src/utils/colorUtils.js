const boardColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFC300",
    "#8E44AD",
    "#2ECC71",
];

export const getColorById = (id) => {
    if (!id) return boardColors[0];

    let sum = 0
    for (let i = 0; i < id.length; i++) {
        sum += id.charCodeAt(i)
    }

    return boardColors[sum % boardColors.length];
};