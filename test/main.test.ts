import axios from "axios";

test("Deve criar ordens de venda de ativo", async () => {
    const inputOrder = {
        asset_code: "USDC",
        type: "sell",
        quantity: 1000,
        price: 5.50,
    }
    await axios.post("http://localhost:3000/orders", inputOrder);
    const responseGetOrders = await axios.get("http://localhost:3000/assets/USDC/orders");
    const outputGetOrders = responseGetOrders.data;
    expect(outputGetOrders).toBe(expect.arrayContaining(expect.anything()))
});