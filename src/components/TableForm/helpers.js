export const extract = (formData) => {
    const data = {};
    formData.forEach(({ field, value }) => {
        data[field] = value;
    });
    return data;
};


export const combine = (columns, rawData) => columns.map(item => {
    return { ...item, value: rawData[item.field] }
})
