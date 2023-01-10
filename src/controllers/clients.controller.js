import chalk from "chalk";
import dayjs from "dayjs";

import clientsRepository from "../repositories/clients.repository.js";

async function createClient(req, res) {
    const { name, address, phone } = req.body;

    if ((!name, !address, !phone) || !Number(phone)) {
        res.sendStatus(400);
        return;
    }

    try {
        await clientsRepository.hasClientByPhone(res, phone);
        await clientsRepository.createNewClient(name, address, phone);

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

export { createClient };
