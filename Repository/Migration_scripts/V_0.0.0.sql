-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS Products (
    Id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Name            VARCHAR(200) NOT NULL,
    Price           DECIMAL(18,2) NOT NULL,
    ImageUrl        VARCHAR(500) NULL,
    CreatedAt       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS IX_Products_Name ON Products(Name);

CREATE TABLE IF NOT EXISTS Orders (
    Id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    OrderCode       VARCHAR(50) NOT NULL UNIQUE,
    TotalAmount     DECIMAL(18,2) NOT NULL,
    CreatedAt       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS IX_Orders_OrderCode ON Orders(OrderCode);
CREATE INDEX IF NOT EXISTS IX_Orders_CreatedAt ON Orders(CreatedAt DESC);

CREATE TABLE IF NOT EXISTS OrderItems (
    Id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    OrderId         UUID NOT NULL,
    ProductId       UUID NOT NULL,
    ProductName     VARCHAR(200) NOT NULL,
    Quantity        INT NOT NULL,
    Price           DECIMAL(18,2) NOT NULL,

    CONSTRAINT FK_OrderItems_Orders
        FOREIGN KEY (OrderId)
        REFERENCES Orders(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_OrderItems_Products
        FOREIGN KEY (ProductId)
        REFERENCES Products(Id)
);

CREATE INDEX IF NOT EXISTS IX_OrderItems_OrderId ON OrderItems(OrderId);
CREATE INDEX IF NOT EXISTS IX_OrderItems_ProductId ON OrderItems(ProductId);