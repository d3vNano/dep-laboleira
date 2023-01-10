import chalk from "chalk";
import dayjs from "dayjs";

import cakesRepository from "../repositories/cakes.repository.js";

async function createCake(req, res) {
    const { name, price, image, description } = req.body;

    if ((!name, !price, !image) || typeof description !== "string") {
        res.sendStatus(400);
        return;
    }

    try {
        await cakesRepository.hasCakeByName(res, name);
        await cakesRepository.createNewCake(name, price, image, description);

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

export { createCake };
