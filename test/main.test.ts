import axios from "axios";

test("Deve criar ordens de venda de ativo", async () => {
    const inputOrder = {
        asset_code: "USDC",
        type: "sell",
        quantity: 1000,
        price: 5.50,
        owner: "a"
    }
    await axios.post("http://localhost:3000/orders", inputOrder);
    const responseGetOrders = await axios.get("http://localhost:3000/assets/USDC/orders");
    const outputGetOrders = responseGetOrders.data;
    expect(outputGetOrders[0].asset_code).toBe("USDC");
    expect(outputGetOrders[0].type).toBe("sell");
    expect(outputGetOrders[0].quantity).toBe(1000);
    expect(outputGetOrders[0].price).toBe(5.50);
    expect(outputGetOrders[0].owner).toBe("a");    
});