import joi from "joi";

const clientsSchema = joi.object({
    name: joi.string().min(3).required(),
    address: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
});

export default clientsSchema;
