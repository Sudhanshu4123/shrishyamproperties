-- MySQL Table Schema DDL for Shri Shyam Properties

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS properties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    purpose VARCHAR(50) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    price_display VARCHAR(100) NOT NULL,
    price_value DECIMAL(15,2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    bhk INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    area_sq_ft INT DEFAULT 0,
    carpet_area_sq_ft INT DEFAULT 0,
    floor VARCHAR(100),
    total_floors INT DEFAULT 0,
    parking VARCHAR(100),
    furnishing VARCHAR(50),
    facing VARCHAR(50),
    property_age VARCHAR(100),
    availability VARCHAR(100),
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    hero_image VARCHAR(500),
    description TEXT,
    contact_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_properties_sector (sector),
    INDEX idx_properties_type (property_type),
    INDEX idx_properties_purpose (purpose),
    INDEX idx_properties_price (price_value)
);

CREATE TABLE IF NOT EXISTS leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    looking_for VARCHAR(50),
    property_type VARCHAR(50),
    budget VARCHAR(100),
    preferred_location VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New',
    property_title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leads_status (status)
);
