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
    res.end()
})



app.listen(3000)
