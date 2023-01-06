import connection from "../database/db.js";

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
    getCakeByName,
    createNewCake,
};

export default cakesRepository;
