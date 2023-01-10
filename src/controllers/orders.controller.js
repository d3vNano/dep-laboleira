import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

import clientsRepository from "../repositories/clients.repository.js";
import cakesRepository from "../repositories/cakes.repository.js";
import ordersRepository from "../repositories/orders.repository.js";

async function createOrder(req, res) {
    const { client_id, cake_id, quantity } = req.body;

    try {
        await clientsRepository.hasClientById(res, client_id);
        await cakesRepository.hasCakeById(res, cake_id);
        await ordersRepository.createNewOrder(
            res,
            client_id,
            cake_id,
            quantity
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

async function listOrders(req, res) {
    const date = req.query.date;

    try {
        let orders;

        if (date) {
            orders = await ordersRepository.listAllOrdersByDate(date);
        } else {
            orders = await ordersRepository.listAllOrders();
        }

        if (!orders.rowCount > 0) {
            res.status(404).send([]);
        }

        res.send(orders.rows.reverse());
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

async function listAnOrder(req, res) {
    const { id } = req.params;

    try {
        await ordersRepository.hasOrderById(res, id);
        const order = await ordersRepository.listAllOrdersById(id);

        res.send(order.rows[0]);
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

export { createOrder, listOrders, listAnOrder };
