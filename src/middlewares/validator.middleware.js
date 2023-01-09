function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(422).send(error.details.map((detail) => detail.message));
            return;
        }

        next();
    };
}

function orderRouteValidator(req, res, next) {
    const { client_id, cake_id, quantity, total_price } = req.body;

    if ((!client_id, !cake_id, !quantity, !total_price)) {
        res.sendStatus(400);
        return;
    }

    if (quantity < 0 && quantity > 5) {
        res.sendStatus(400);
        return;
    }

    next();
}

export { validateSchema, orderRouteValidator };
