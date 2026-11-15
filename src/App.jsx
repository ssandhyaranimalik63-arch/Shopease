import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { useCart } from './context/CartContext'
import ProductDetails from './pages/ProductDetails'
import './App.css'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 1499, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { id: 2, name: 'Smart Watch', price: 1999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { id: 3, name: 'Casual Shoes', price: 2499, category: 'Fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { id: 4, name: 'Backpack', price: 999, category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
  { id: 5, name: 'Camera', price: 4999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500' },
  { id: 6, name: 'Sunglasses', price: 799, category: 'Fashion', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' }
]

function Home() {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice
  } = useCart()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const [showCart, setShowCart] = useState(false)

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price
      if (sort === 'high') return b.price - a.price
      return 0
    })

  return (
    <div className="app">

      <nav className="navbar">
        <h2>ShopEase</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#products">Products</a>
          <a href="#footer">Contact</a>
        </div>

        <button
          className="cart-count"
          onClick={() => setShowCart(true)}
        >
          🛒 Cart ({totalItems})
        </button>
      </nav>

      <section className="hero-section" id="home">
        <div>
          <h1>Discover Your Style</h1>
          <p>Find amazing products at amazing prices.</p>
          <a href="#products" className="shop-btn">Shop Now</a>
        </div>
      </section>

      <section className="products-section" id="products">
        <h2>Our Products</h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        <div className="filters">
          {['All', 'Electronics', 'Fashion'].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={category === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="sort-section">
          <label htmlFor="sort">Sort by Price: </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                </Link>

                <p>{product.category}</p>
                <h3>₹{product.price}</h3>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {showCart && (
        <section className="products-section">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="product-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>

                <button onClick={() => increaseQuantity(item.id)}>
                  +
                </button>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>

                <h3>Subtotal: ₹{item.price * item.quantity}</h3>
              </div>
            ))
          )}

          <h2>Total Items: {totalItems}</h2>
          <h2>Total Price: ₹{totalPrice}</h2>

          <button onClick={() => setShowCart(false)}>
            Continue Shopping
          </button>
        </section>
      )}

      <footer id="footer">
        <h2>ShopEase</h2>
        <p>Your favourite online shopping destination.</p>
        <p>© 2026 ShopEase. All rights reserved.</p>
      </footer>

    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  )
}

export default App