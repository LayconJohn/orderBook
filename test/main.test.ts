import axios from "axios";

test("Deve criar ordens de venda de ativo", async () => {
    await axios.delete("http://localhost:3000/assets/USDC/orders");

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

test("Deve criar várias ordens de venda de ativo", async () => {
    await axios.delete("http://localhost:3000/assets/USDC/orders");

    const inputOrder1 = {
        asset_code: "USDC",
        type: "sell",
        quantity: 1000,
        price: 5.50,
        owner: "a"
    }
    await axios.post("http://localhost:3000/orders", inputOrder1);

    const inputOrder2 = {
        asset_code: "USDC",
        type: "sell",
        quantity: 500,
        price: 5.60,
        owner: "b"
    }
    await axios.post("http://localhost:3000/orders", inputOrder2);

    const inputOrder3 = {
        asset_code: "USDC",
        type: "sell",
        quantity: 100,
        price: 5.80,
        owner: "c"
    }
    await axios.post("http://localhost:3000/orders", inputOrder3);

    const responseGetOrders = await axios.get("http://localhost:3000/assets/USDC/orders");
    const outputGetOrders = responseGetOrders.data;
    expect(outputGetOrders[0].asset_code).toBe("USDC");
    expect(outputGetOrders[0].type).toBe("sell");
    expect(outputGetOrders[0].quantity).toBe(1000);
    expect(outputGetOrders[0].price).toBe(5.50);
    expect(outputGetOrders[0].owner).toBe("a");    

    expect(outputGetOrders[1].asset_code).toBe("USDC");
    expect(outputGetOrders[1].type).toBe("sell");
    expect(outputGetOrders[1].quantity).toBe(500);
    expect(outputGetOrders[1].price).toBe(5.60);
    expect(outputGetOrders[1].owner).toBe("b");   

    expect(outputGetOrders[2].asset_code).toBe("USDC");
    expect(outputGetOrders[2].type).toBe("sell");
    expect(outputGetOrders[2].quantity).toBe(100);
    expect(outputGetOrders[2].price).toBe(5.80);
    expect(outputGetOrders[2].owner).toBe("c");   
});

test("Deve criar várias ordens de compra de ativo", async () => {
    await axios.delete("http://localhost:3000/assets/USDC/orders");

    const inputOrder1 = {
        asset_code: "USDC",
        type: "buy",
        quantity: 1000,
        price: 5.50,
        owner: "a"
    }
    await axios.post("http://localhost:3000/orders", inputOrder1);

    const inputOrder2 = {
        asset_code: "USDC",
        type: "buy",
        quantity: 500,
        price: 5.60,
        owner: "b"
    }
    await axios.post("http://localhost:3000/orders", inputOrder2);

    const inputOrder3 = {
        asset_code: "USDC",
        type: "buy",
        quantity: 100,
        price: 5.80,
        owner: "c"
    }
    await axios.post("http://localhost:3000/orders", inputOrder3);

    const responseGetOrders = await axios.get("http://localhost:3000/assets/USDC/orders");
    const outputGetOrders = responseGetOrders.data;
    expect(outputGetOrders[0].asset_code).toBe("USDC");
    expect(outputGetOrders[0].type).toBe("buy");
    expect(outputGetOrders[0].quantity).toBe(1000);
    expect(outputGetOrders[0].price).toBe(5.50);
    expect(outputGetOrders[0].owner).toBe("a");    

    expect(outputGetOrders[1].asset_code).toBe("USDC");
    expect(outputGetOrders[1].type).toBe("buy");
    expect(outputGetOrders[1].quantity).toBe(500);
    expect(outputGetOrders[1].price).toBe(5.60);
    expect(outputGetOrders[1].owner).toBe("b");   

    expect(outputGetOrders[2].asset_code).toBe("USDC");
    expect(outputGetOrders[2].type).toBe("buy");
    expect(outputGetOrders[2].quantity).toBe(100);
    expect(outputGetOrders[2].price).toBe(5.80);
    expect(outputGetOrders[2].owner).toBe("c");   
});