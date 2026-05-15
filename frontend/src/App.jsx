import { useEffect, useState } from "react";
import axios from "axios";
app.use(cors());
function App() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    sales: "",
    stock: ""
  });

  // Fetch Products
  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Add Product
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      fetchProducts();

      setFormData({
        name: "",
        category: "",
        price: "",
        sales: "",
        stock: ""
      });

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div style={styles.container}>

      <h1>E-Commerce Analytics Dashboard</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="sales"
          placeholder="Sales"
          value={formData.sales}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>

      </form>

      {/* Products Table */}
      <table style={styles.table}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id}>

              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.sales}</td>
              <td>{product.stock}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

const styles = {

  container: {
    width: "80%",
    margin: "30px auto",
    fontFamily: "Arial"
  },

  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "30px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  }

};

export default App;