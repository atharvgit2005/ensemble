import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Stable mock data (module scope) to avoid useEffect dependency warnings
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Ensemble T-Shirt',
    description: 'Premium cotton t-shirt with Ensemble logo',
    price: 25.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    stock: 50
  },

  {
    id: '3',
    name: 'Dance Club Hoodie',
    description: 'Comfortable hoodie for dance practice',
    price: 45.99,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    stock: 25
  },
  {
    id: '4',
    name: 'Theatre Club Cap',
    description: 'Stylish cap with theatre club branding',
    price: 20.99,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    stock: 40
  },
  {
    id: '5',
    name: 'Ensemble Sticker Pack',
    description: 'Set of 10 vinyl stickers',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    stock: 100
  }
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from the API
        // const response = await axios.get('http://localhost:3001/api/shop/products');
        // setProducts(response.data.products);
        
        // For now, use mock data
        setProducts(MOCK_PRODUCTS);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(MOCK_PRODUCTS); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to place an order');
      return;
    }

    try {
      // In a real app, you would submit to the API
      // const response = await axios.post('http://localhost:3001/api/shop/orders', orderData);
      
      // For now, just show success message
      alert('Order placed successfully! (This is a demo)');
      setCart([]);
      setShowCheckout(false);
      setOrderForm({ name: '', address: '', phone: '' });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-pink mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow-blue">
            Ensemble Shop
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Show your Ensemble pride with our exclusive merchandise. From clothing to accessories, 
            we have everything you need to represent your favorite club.
          </p>
        </div>

        {/* Cart Button */}
        <div className="fixed top-24 right-4 z-40">
          <button
            onClick={() => setShowCart(!showCart)}
            className="btn-doodle p-4 rounded-full shadow-lg"
            data-cursor="action"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 badge-count text-xs font-bold w-6 h-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card-doodle group hover:scale-105 transition-all duration-300" data-cursor="discovery" data-cursor-label="Explore">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-neon-pink text-white px-2 py-1 rounded-full text-sm font-semibold">
                  ${product.price}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-glow-blue">
                {product.name}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">
                  Stock: {product.stock}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-doodle text-white font-semibold px-4 py-2 rounded-lg text-sm"
                  data-cursor="action"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 overlay-dark z-50 flex justify-end">
            <div className="cart-panel w-full max-w-md h-full overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-glow-blue">Shopping Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-muted hover:text-blue transition-colors duration-300"
                    data-cursor="action"
                  >
                    ✕
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 bg-tertiary p-4 rounded-lg">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary">{item.name}</h3>
                            <p className="text-muted text-sm">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-tertiary transition-colors duration-300"
                              data-cursor="action"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-tertiary transition-colors duration-300"
                              data-cursor="action"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted hover:text-primary transition-colors duration-300"
                            data-cursor="action"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-tertiary pt-4 mb-6">
                      <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Total:</span>
                        <span className="text-glow-blue">${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                      className="w-full btn-doodle text-white font-semibold py-3 rounded-lg"
                      data-cursor="action"
                    >
                      Proceed to Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 overlay-dark z-50 flex items-center justify-center p-4">
            <div className="modal-panel rounded-2xl p-8 w-full max-w-md border-doodle">
              <h2 className="text-2xl font-bold mb-6 text-glow-blue text-center">
                Shipping Details
              </h2>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-primary placeholder-gray-400 focus:border-blue focus:ring-2 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-primary placeholder-gray-400 focus:border-blue focus:ring-2 transition-all duration-300"
                    placeholder="Enter your shipping address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-primary placeholder-gray-400 focus:border-blue focus:ring-2 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-3 bg-secondary text-primary rounded-lg hover:bg-tertiary transition-colors duration-300"
                    data-cursor="action"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-doodle text-white font-semibold py-3 rounded-lg"
                    data-cursor="action"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
