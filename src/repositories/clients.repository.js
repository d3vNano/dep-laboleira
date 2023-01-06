import connection from "../database/db.js";

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

async function hasClient(res, phone) {
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
    hasClient,
    createNewClient,
};

export default clientsRepository;
