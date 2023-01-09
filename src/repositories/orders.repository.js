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

const ordersRepository = {
    createNewOrder,
};

export default ordersRepository;
