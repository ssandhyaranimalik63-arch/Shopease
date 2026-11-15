import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 1499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    description: 'Enjoy clear sound and comfortable listening with these wireless headphones.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 1999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    description: 'A stylish smartwatch for your everyday activities.'
  },
  {
    id: 3,
    name: 'Casual Shoes',
    price: 2499,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    description: 'Comfortable casual shoes for everyday use.'
  },
  {
    id: 4,
    name: 'Backpack',
    price: 999,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    description: 'A practical backpack for college and travel.'
  },
  {
    id: 5,
    name: 'Camera',
    price: 4999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
    description: 'Capture your favourite moments with this camera.'
  },
  {
    id: 6,
    name: 'Sunglasses',
    price: 799,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    description: 'Modern sunglasses for everyday style.'
  }
]

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    return <h2>Product not found</h2>
  }

  return (
    <div className="product-details">

      <img src={product.image} alt={product.name} />

      <div>
        <h1>{product.name}</h1>

        <p>Category: {product.category}</p>

        <h2>₹{product.price}</h2>

        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <button onClick={() => navigate('/')}>
          Back to Products
        </button>

      </div>
    </div>
  )
}

export default ProductDetails