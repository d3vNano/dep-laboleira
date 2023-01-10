import connection from "../database/db.js";

async function getOrderById(id) {
    return connection.query(
        `
        SELECT 
            *
        FROM
            orders
        WHERE
            id = $1`,
        [id]
    );
}

async function hasOrderById(res, id) {
    const existingOrder = await getOrderById(id);

    if (!existingOrder.rowCount > 0) {
        res.status(404).send("Pedido não existente!");
        return;
    }
}

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
            orders.created_at,
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

async function listAllOrdersById(id) {
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
            orders.created_at,
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
        WHERE
            orders.id = $1`,
        [id]
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
            orders.created_at,
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
        WHERE
            date_trunc('day', created_at) = $1`,
        [date]
    );
}

const ordersRepository = {
    hasOrderById,
    createNewOrder,
    listAllOrders,
    listAllOrdersById,
    listAllOrdersByDate,
};

export default ordersRepository;
