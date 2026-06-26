const InvoiceRoutes = express.Router();

// Define your invoice-related routes here
InvoiceRoutes.get('/', (req, res) => {
  res.send('Get all invoices');
});

InvoiceRoutes.get('/:id', (req, res) => {
  res.send(`Get invoice with ID: ${req.params.id}`);
});

InvoiceRoutes.post('/', (req, res) => {
  res.send('Create a new invoice');
});

InvoiceRoutes.put('/:id', (req, res) => {
  res.send(`Update invoice with ID: ${req.params.id}`);
});

InvoiceRoutes.delete('/:id', (req, res) => {
  res.send(`Delete invoice with ID: ${req.params.id}`);
});

module.exports = InvoiceRoutes;