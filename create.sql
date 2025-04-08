CREATE SCHEMA IF NOT EXISTS order_book;

CREATE TABLE IF NOT EXISTS order_book.order (
    order_id UUID PRIMARY KEY,
    asset_code text,
    type text, --buy, sell
    quantity numeric,
    price numeric,
    owner text
);


