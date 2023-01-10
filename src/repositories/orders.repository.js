import connection from "../database/db.js";

async function createNewOrder(res, client_id, cake_id, quantity) {
    const { cake } = res.locals;
    return connection.query(
        `
        INSERT INTO
            orders
            (client_id, cake_id, quantity, total_price)
        VALUES
            ($1, $2, $3, $4)`,
        [client_id, cake_id, quantity, quantity * cake.price]
    );
}

async function listAllOrdersByDate(date) {
    return connection.query(
        `
        SELECT
            json_build_object(
                'id', clients.id,
                'name', clients.name,
                'address', clients.address,
                'phone', clients.phone
            ) AS client,
            json_build_object(
                'id', cakes.id,
                'name', cakes.name,
                'price', cakes.price,
                'image', cakes.image,
                'description', cakes.description
            ) AS cake,
            orders.id AS order_id,
            orders.quantity,
            orders.total_price
        FROM
            orders
        JOIN
            clients
        ON
            orders.client_id = clients.id
        JOIN
            cakes
        ON
            orders.cake_id = cakes.id
        WHERE date_trunc('day', created_at) = $1`,
        [date]
    );
}

async function listAllOrders() {
    return connection.query(
        `
        SELECT
            json_build_object(
                'id', clients.id,
                'name', clients.name,
                'address', clients.address,
                'phone', clients.phone
            ) AS client,
            json_build_object(
                'id', cakes.id,
                'name', cakes.name,
                'price', cakes.price,
                'image', cakes.image,
                'description', cakes.description
            ) AS cake,
            orders.id AS order_id,
            orders.quantity,
            orders.total_price
        FROM
            orders
        JOIN
            clients
        ON
            orders.client_id = clients.id
        JOIN
            cakes
        ON
            orders.cake_id = cakes.id
        `
    );
}

const ordersRepository = {
    createNewOrder,
    listAllOrdersByDate,
    listAllOrders,
};

export default ordersRepository;
