import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().min(3).required(),
    price: joi.number().min(1).required(),
    image: joi.string().uri().required(),
    description: joi.any(),
});

export default cakesSchema;
