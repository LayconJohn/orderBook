import express, { Request, Response } from "express";
import pgp from "pg-promise";
import crypto from "crypto"
const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@localhost:5432/app")

app.post("/orders",  async (req: Request, res: Response) => {
    const order_id = crypto.randomUUID()
    const order = req.body
    await connection.query('INSERT INTO order_book.order (order_id, asset_code, type, quantity, price, owner) VALUES ($1, $2, $3, $4, $5, $6)', [order_id, order.asset_code, order.type, order.quantity, order.price, order.owner])
    res.end();
})

app.get("/assets/:assetCode/orders", async (req: Request, res: Response) => {
    const asset_code = req.params.assetCode;
    const orders = await connection.query("SELECT * from order_book.order WHERE asset_code = $1", [asset_code]);
    res.json(orders)

})

app.listen(3000)
