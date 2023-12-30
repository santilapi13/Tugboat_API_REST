async function validateExistence(id, model) {
    if (!mongoose.Types.ObjectId.isValid(id))
        return {
            error: true,
            msg: "Invalid id format"
        };
    
    const payload = await model.findById(id);
    if (!payload)
        return {
            error: true,
            msg: "id not found"
        };
    
    return {
        error: false,
        msg: "",
        payload
    }
}

export default { validateExistence };