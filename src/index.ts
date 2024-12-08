// src/index.ts
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {getRTPHandler, playHandler, simHandler} from "./functions/game";
import {handleErrorMiddleware} from "./utils";
import * as Wallet from './state/wallet'
import {depositFundsHandler, getBalanceHandler, withdrawFundsHandler} from "./functions/wallet";

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.post("/play", handleErrorMiddleware, playHandler);

app.post("/sim", handleErrorMiddleware, simHandler);

app.get("/rtp", getRTPHandler);


app.post("/wallet/deposit", depositFundsHandler);

app.post("/wallet/withdraw", withdrawFundsHandler);

app.get("/wallet/balance", getBalanceHandler);
// app.use(handleErrorMiddleware);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});