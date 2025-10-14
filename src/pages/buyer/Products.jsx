import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { mockApi } from '../../lib/mockApi.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useCart } from '../../contexts/CartContext.jsx'
import { Button } from '../../components/ui/button'
import MagicBento from '../../components/MagicBento.jsx'
import MagicCard from '../../components/MagicCard.jsx'

export default function Products() {
  const { user } = useAuth()
  const { addToCart: addToCartContext } = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedQuality, setSelectedQuality] = useState('')
  const [searchParams] = useSearchParams()
  const [cartLoading, setCartLoading] = useState(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
    const categoryParam = searchParams.get('category')
    if (categoryParam) setSelectedCategory(categoryParam)
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory])

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      
      const params = {}
      if (searchTerm) params.search = searchTerm
      if (selectedCategory) params.category = selectedCategory
      
      const response = await mockApi.getProducts(params)
      
      // Get farmer-added products from localStorage
      const farmerProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
      const localStorageProducts = farmerProducts.map(product => ({
        ...product,
        category: { name: product.categoryName || 'Other' },
        seller: { name: 'Local Farmer', location: product.location || 'Punjab, India' },
        rating: product.rating || 4.5,
        reviewsCount: product.reviewsCount || Math.floor(Math.random() * 20) + 1
      }));

      // Combine mock products with localStorage products
      const allProducts = [
        ...(response.products || []),
        ...localStorageProducts
      ];

      setProducts(allProducts);
    } catch (error) {
      console.error('Products fetch error:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await mockApi.getCategories()
      setCategories(response.categories || []);
    } catch (error) {
      console.error('Categories fetch error:', error);
      setCategories([]);
    }
  };

  // Apply client-side filters for price range and quality
  const filteredProducts = products.filter(product => {
    // Price range filter
    if (priceRange.min && product.price < parseFloat(priceRange.min)) return false
    if (priceRange.max && product.price > parseFloat(priceRange.max)) return false
    
    // Quality filter (based on agmarkGrade or organicCertified)
    if (selectedQuality) {
      if (selectedQuality === 'organic' && !product.organicCertified) return false
      if (selectedQuality === 'A+' && product.agmarkGrade !== 'A+') return false
      if (selectedQuality === 'A' && product.agmarkGrade !== 'A') return false
    }
    
    return true
  })

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('Please login to add items to cart')
      return
    }

    setCartLoading(productId)
    try {
      const success = await addToCartContext(productId, 1)
      if (success) {
        alert('Added to cart!')
      } else {
        alert('Failed to add to cart. Please try again.')
      }
    } catch (error) {
      console.error('Add to cart error:', error)
      alert('Failed to add to cart. Please try again.')
    } finally {
      setCartLoading(null)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-6" />
        <div className="grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <MagicBento className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
            Browse Products ✨
          </h1>
          
          {/* Search Bar and Quality Filter - Same Line */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-300 min-w-[300px] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-300 min-w-[200px] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-300 min-w-[180px] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <option value="">All Quality Grades</option>
              <option value="A+">A+ Grade (Premium)</option>
              <option value="A">A Grade (High Quality)</option>
              <option value="organic">Organic Certified</option>
            </select>
          </div>

          {/* Price Range Filter with Scroll Bars */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-gray-700">💰 Price Range:</span>
                
                {/* Min Price Range Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-8">Min:</span>
                  <input
                    type="range"
                    min="0"
                    max="400"
                    step="5"
                    value={priceRange.min || 0}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-28 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="px-2 py-1 rounded border border-gray-300 w-16 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-xs text-center"
                  />
                </div>
                
                {/* Max Price Range Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-8">Max:</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="5"
                    value={priceRange.max || 500}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-28 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    placeholder="500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="px-2 py-1 rounded border border-gray-300 w-16 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-xs text-center"
                  />
                </div>
              </div>
              
              {/* Clear Filters Button */}
              {(priceRange.min || priceRange.max || selectedQuality) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPriceRange({ min: '', max: '' })
                    setSelectedQuality('')
                  }}
                  className="text-gray-600 hover:text-gray-800 bg-white/80"
                >
                  🗑️ Clear Filters
                </Button>
              )}
            </div>
            
            {/* Price Range Display */}
            <div className="mt-3 text-sm">
              <span className="text-green-700 font-medium">
                Active Range: ₹{priceRange.min || 0} - ₹{priceRange.max || 500}
              </span>
              {(priceRange.min > 0 || priceRange.max < 500) && (
                <span className="ml-3 text-blue-600">
                  ({filteredProducts.length} products match)
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Filter Results Summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
          {(priceRange.min || priceRange.max || selectedQuality) && (
            <span className="ml-2 text-green-600">
              (filtered by {[
                priceRange.min || priceRange.max ? 'price' : null,
                selectedQuality ? 'quality' : null
              ].filter(Boolean).join(', ')})
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <span className="text-5xl opacity-50">🔍</span>
            <p className="mt-4 text-lg">No products found</p>
            <p className="mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-auto-fill gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {filteredProducts.map((product) => (
              <MagicCard key={product._id} className="overflow-hidden" glowIntensity="medium">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <img 
                    src={product.images?.[0] || '/placeholder.svg'} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {product.categoryId?.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {product.organicCertified && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">🌱 Organic</span>
                      )}
                      {product.agmarkGrade && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {product.agmarkGrade} Grade
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {product.description || 'Fresh produce from local farmers'}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
                      <span className="text-sm text-muted-foreground">/{product.unit || 'kg'}</span>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product._id)}
                      size="sm"
                      disabled={cartLoading === product._id || !user}
                    >
                      {cartLoading === product._id ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground border-t border-border pt-2">
                    by {product.sellerId?.email}
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        )}
      </div>
    </MagicBento>
  )
}
