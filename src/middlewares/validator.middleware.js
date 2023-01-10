import chalk from "chalk";
import dayjs from "dayjs";

import clientsRepository from "../repositories/clients.repository.js";
import cakesRepository from "../repositories/cakes.repository.js";

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

async function orderRouteValidator(req, res, next) {
    const { client_id, cake_id, quantity } = req.body;

    if ((!client_id, !cake_id, !quantity)) {
        res.sendStatus(400);
        return;
    }

    if (quantity < 0 && quantity > 5) {
        res.sendStatus(400);
        return;
    }

    try {
        const client = await clientsRepository.getClientById(client_id);
        const cake = await cakesRepository.getCakeById(cake_id);

        if (!client.rowCount > 0 || !cake.rowCount > 0) {
            res.sendStatus(404);
            return;
        }

        res.locals.cake = cake.rows[0];

        next();
    } catch (error) {
        console.log(
            chalk.redBright(
                dayjs().format("YYYY-MM-DD HH:mm:ss"),
                error.message
            )
        );
        res.sendStatus(500);
    }
}

export { validateSchema, orderRouteValidator };
