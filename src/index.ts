// src/index.ts
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import GameController from "./controllers/game/GameController";
import WalletController from "./controllers/wallet/WalletController";

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.post("/play", GameController.play);

app.post("/sim", GameController.sim);
//
app.get("/rtp", GameController.getRTP);

app.post("/wallet/deposit", WalletController.depositFunds);

app.post("/wallet/withdraw", WalletController.withdrawFunds);

app.get("/wallet/balance", WalletController.getBalance);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});