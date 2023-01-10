import connection from "../database/db.js";

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

async function hasCakeById(res, cake_id) {
    const existingCake = await getCakeById(cake_id);

    if (!existingCake.rowCount > 0) {
        res.status(409).send("Cake não encontrado!");
        return;
    }
}

async function getCakeByName(name) {
    return connection.query(
        `
        SELECT
            *
        FROM
            cakes
        WHERE
            name = $1`,
        [name]
    );
}

async function hasCakeByName(res, name) {
    const existingCake = await getCakeByName(name);

    if (existingCake.rowCount > 0) {
        res.sendStatus(409);
        return;
    }
}

async function createNewCake(name, price, image, description) {
    return connection.query(
        `
        INSERT INTO
            cakes
            (name, price, image, description)
        VALUES
            ($1, $2, $3, $4)`,
        [name, price, image, description]
    );
}

const cakesRepository = {
    getCakeById,
    hasCakeById,
    hasCakeByName,
    createNewCake,
};

export default cakesRepository;
