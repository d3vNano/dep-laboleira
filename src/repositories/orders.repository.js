import { func } from "joi";
import connection from "../database/db";

async function createNewOrder(client_id, cake_id, quantity, total_price) {
    return connection.query(
        `
        INSERT INTO
            orders
            (client_id, cake_id, quantity, total_price)
        VALUES
            ($1, $2, $3, $4)`,
        [client_id, cake_id, quantity, total_price]
    );
}

async function getClientById(client_id) {
    return connection.query(
        `
        SELECT
            *
        FROM
            clients
        WHERE
            id = $1`,
        [client_id]
    );
}

async function hasClientId(res, client_id) {
    const existingClient = await getClientById(client_id);

    if (existingClient.rowCount > 0) {
        res.sendStatus(404);
        return;
    }
}

async function getCakeById(cake_id) {
    return connection.query(
        `
        SELECT
            *
        FROM
            cakes
        WHERE
            id = $1`,
        [cake_id]
    );
}

async function hasCakeId(res, cake_id) {
    const existingCake = await getCakeById(cake_id);

    if (existingCake.rowCount > 0) {
        res.sendStatuss(404);
        return;
    }
}

const ordersRepository = {
    createNewOrder,
    hasClientId,
    hasCakeId,
};

export default ordersRepository;
