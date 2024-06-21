import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 3000;

// Set up the PostgreSQL client
const pool = new Pool({
  user: 'your-db-username',
  host: 'your-db-host',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 5432, // default port for PostgreSQL
});

// Endpoint to get categories
app.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT "categoryId", "categoryName" FROM "categories"'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
