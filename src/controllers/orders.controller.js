import chalk from "chalk";
import dayjs from "dayjs";

import ordersRepository from "../repositories/orders.repository.js";

async function createOrder(req, res) {
    const { client_id, cake_id, quantity, total_price } = req.body;

    try {
        await ordersRepository.createNewOrder(
            client_id,
            cake_id,
            quantity,
            total_price
        );
        res.sendStatus(201);
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

export { createOrder };
