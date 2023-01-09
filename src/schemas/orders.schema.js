import joi from "joi";

const ordersSchema = joi.object({
    client_id: joi.number(),
    cake_id: joi.number(),
    quantity: joi.number().min(1).max(5),
    total_price: joi.number(),
});

export default ordersSchema;
