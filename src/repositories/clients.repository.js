import connection from "../database/db.js";

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

async function hasClientById(res, client_id) {
    const existingClient = await getClientById(client_id);

    if (!existingClient.rowCount > 0) {
        res.status(409).send("Cliente não encontrado! ");
        return;
    }
}

async function getClientByPhone(phone) {
    return connection.query(
        `
        SELECT
            *
        FROM
            clients
        WHERE
            phone = $1`,
        [phone]
    );
}

async function hasClientByPhone(res, phone) {
    const existingClient = await getClientByPhone(phone);

    if (existingClient.rowCount > 0) {
        res.sendStatus(409);
        return;
    }
}

async function createNewClient(name, address, phone) {
    return connection.query(
        `
        INSERT INTO
            clients
            (name, address, phone)
        VALUES
            ($1, $2, $3)`,
        [name, address, phone]
    );
}

const clientsRepository = {
    getClientById,
    hasClientById,
    hasClientByPhone,
    createNewClient,
};

export default clientsRepository;
