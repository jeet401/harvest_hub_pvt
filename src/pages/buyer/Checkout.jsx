import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockApi } from '../../lib/mockApi.js'

export default function Checkout() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(50)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
      // Fetch actual cart data from mockApi
      console.log('Fetching cart items from mockApi...')
      const response = await mockApi.getCart()
      console.log('Cart response:', response)
      const realCartItems = response.cart || []
      console.log('Real cart items:', realCartItems)
      setCartItems(realCartItems)
      const subtotalAmount = realCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      setSubtotal(subtotalAmount)
      setTotal(subtotalAmount + shipping)
      console.log('Subtotal:', subtotalAmount, 'Total:', subtotalAmount + shipping)
    } catch (error) {
      console.error('Cart fetch error:', error)
      setCartItems([])
      setSubtotal(0)
      setTotal(shipping)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayment = async () => {
    console.log('Starting payment process...')
    console.log('Cart items:', cartItems)
    console.log('Total amount:', total)
    
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add some items before checkout.')
      return
    }
    
    setIsProcessing(true)
    try {
      // Mock payment processing - simulate successful payment
      console.log('Calling processPayment with amount:', total * 100)
      const paymentResult = await mockApi.processPayment({
        amount: total * 100,
        method: 'razorpay'
      })
      
      console.log('Payment result:', paymentResult)
      
      if (paymentResult.success) {
        // Create order after successful payment
        const orderData = {
          products: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          })),
          totalAmount: total,
          shippingAddress: 'Mock Address' // In real app, get from form
        }
        
        console.log('Creating order with data:', orderData)
        await mockApi.createOrder(orderData)
        console.log('Order created successfully, navigating to success page')
        navigate('/buyer/order-success')
      } else {
        console.log('Payment result success was false')
        throw new Error('Payment failed')
      }
    } catch (error) {
      console.error('Payment initiation failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ height: 32, background: '#e5e7eb', borderRadius: 8, width: '33%', marginBottom: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32 }}>
          <div style={{ height: 400, background: '#e5e7eb', borderRadius: 8 }} />
          <div style={{ height: 300, background: '#e5e7eb', borderRadius: 8 }} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px 0', color: '#111827' }}>Checkout</h1>
        <p style={{ color: '#6b7280' }}>Review your order and complete payment</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32 }}>
        {/* Order Details */}
        <div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 16px 0' }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: 60, height: 60, background: '#f3f4f6', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.product.image_url || '/placeholder.svg'} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 500, color: '#111827', margin: '0 0 4px 0' }}>{item.product.name}</h3>
                    <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 4px 0' }}>Qty: {item.quantity} × ₹{item.product.price}</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#16a34a', margin: 0 }}>₹{item.product.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 16px 0' }}>Delivery Information</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#16a34a' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: 8, 
                    border: '2px solid #86efac', 
                    backgroundColor: '#f0fdf4',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    ':focus': { borderColor: '#16a34a', backgroundColor: '#fff' }
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#16a34a'
                    e.target.style.backgroundColor = '#fff'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#86efac'
                    e.target.style.backgroundColor = '#f0fdf4'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#16a34a' }}>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number"
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: 8, 
                    border: '2px solid #86efac', 
                    backgroundColor: '#f0fdf4',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#16a34a'
                    e.target.style.backgroundColor = '#fff'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#86efac'
                    e.target.style.backgroundColor = '#f0fdf4'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4, color: '#16a34a' }}>Delivery Address</label>
                <textarea 
                  rows={4} 
                  placeholder="Enter your complete delivery address"
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: 8, 
                    border: '2px solid #86efac', 
                    backgroundColor: '#f0fdf4',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#16a34a'
                    e.target.style.backgroundColor = '#fff'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#86efac'
                    e.target.style.backgroundColor = '#f0fdf4'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, position: 'sticky', top: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 16px 0' }}>Payment Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#6b7280' }}>Subtotal</span>
              <span style={{ fontWeight: 500 }}>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#6b7280' }}>Shipping</span>
              <span style={{ fontWeight: 500 }}>₹{shipping}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, paddingTop: 8, borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: 18, fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#16a34a' }}>₹{total}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing || cartItems.length === 0}
              style={{
                width: '100%',
                background: isProcessing ? '#9ca3af' : '#16a34a',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: 8,
                border: 0,
                fontSize: 16,
                fontWeight: 600,
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${total}`}
            </button>

            <div style={{ marginTop: 12, fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
              Secure payment powered by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
