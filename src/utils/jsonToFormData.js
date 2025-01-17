const JsonToFormData = (data) => {
    let formData = new FormData();

    // Iterate over the keys of the object and append each key-value pair to FormData
    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object' && data[key] !== null) {
            // If the value is an object (not null), iterate over its keys and append each nested key-value pair
            Object.keys(data[key]).forEach(subKey => {
                formData.append(`${key}[${subKey}]`, data[key][subKey]);
            });
        } else {
            // If the value is not an object, directly append it
            formData.append(key, data[key]);
        }
    });
    return formData
}

export default JsonToFormData