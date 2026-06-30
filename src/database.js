const mysql = require('mysql2');

// 1. Configure the connection string 
const connection = mysql.createConnection({
    host: 'sql5.freesqldatabse.com',
    user: 'sql5831832',
    password: 'gvrhduLFk',
    database: 'sql5831832',
    port: 3306
});

// 2. Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Successfully connected to the database as id ' + connection.threadId);
    
    // Run the initialization function to ensure tables exist
    initializeDatabase();
});

// 3. Function to create tables dynamically via JavaScript
function initializeDatabase() {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createOrdersTable = `
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            product_name VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `;

    // Execute Users table creation
    connection.query(createUsersTable, (err, results) => {
        if (err) {
            console.error('Error creating users table:', err.message);
            return;
        }
        console.log('Users table ready.');

        // Execute Orders table creation inside the callback to ensure sequential execution
        connection.query(createOrdersTable, (err, results) => {
            if (err) {
                console.error('Error creating orders table:', err.message);
                return;
            }
            console.log('Orders table ready.');
            
            // Close the connection when done
            connection.end();
        });
    });
}