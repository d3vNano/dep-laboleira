import joi from "joi";

const ordersSchema = joi.object({
    client_id: joi.number().required(),
    cake_id: joi.number().required(),
    quantity: joi.number().min(1).max(5).required(),
});

export default ordersSchema;
