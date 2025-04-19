import express, { Request, Response } from "express";
import pgp from "pg-promise";
import crypto from "crypto"
const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@localhost:5432/app")

app.post("/orders",  async (req: Request, res: Response) => {
    const order_id = crypto.randomUUID()
    const orderToExecute = req.body;
    if(orderToExecute.type === "sell") {
        const orders = await connection.query("SELECT * from order_book.order WHERE asset_code = $1 and type = $2", [orderToExecute.asset_code, "buy"]);
        let match = false;
        for (const order of orders) {
            if(orderToExecute.price === parseFloat(order.price)) {
                match = true;
                await connection.query("DELETE order_book.order WHERE order_id = $1", [order.order_id])
            } 
        }
        if(!match) {
            await connection.query('INSERT INTO order_book.order (order_id, asset_code, type, quantity, price, owner) VALUES ($1, $2, $3, $4, $5, $6)', [order_id, orderToExecute.asset_code, orderToExecute.type, orderToExecute.quantity, orderToExecute.price, orderToExecute.owner])
        }

    }
    if(orderToExecute.type === "buy") {
        const orders = await connection.query("SELECT * from order_book.order WHERE asset_code = $1 and type = $2", [orderToExecute.asset_code, "sell"]);
        let match = false;
        for (const order of orders) {
            if(orderToExecute.price === parseFloat(order.price)) {
                match = true;
                await connection.query("DELETE order_book.order WHERE order_id = $1", [order.order_id])
            } 
            
        }
        if(!match) {
            await connection.query('INSERT INTO order_book.order (order_id, asset_code, type, quantity, price, owner) VALUES ($1, $2, $3, $4, $5, $6)', [order_id, orderToExecute.asset_code, orderToExecute.type, orderToExecute.quantity, orderToExecute.price, orderToExecute.owner])
        }
    }
    res.end();
})

app.get("/assets/:assetCode/orders", async (req: Request, res: Response) => {
    const asset_code = req.params.assetCode;
    const orders = await connection.query("SELECT * from order_book.order WHERE asset_code = $1", [asset_code]);
    for (const order of orders) {
        order.quantity = parseFloat(order.quantity);
        order.price = parseFloat(order.price);
    }
    res.json(orders);
})

app.delete("/assets/:assetCode/orders",  async (req: Request, res: Response) => {
    const asset_code = req.params.assetCode;
    await connection.query("DELETE FROM orders_book.orders WHERE asset_code = $1", [asset_code]);
    res.end();
})

app.listen(3000)
