const Order = require('../models/Order');
const Settings = require('../models/Settings');
const nodemailer = require('nodemailer');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    // Calculate shipping cost based on region
    const settings = await Settings.findOne();
    let shippingCost = 0;
    
    if (settings && settings.shippingRates) {
      const regionRate = settings.shippingRates.find(
        rate => rate.region === req.body.address.region
      );
      shippingCost = regionRate ? regionRate.rate : 200; // Default shipping
    }
    
    const orderData = {
      ...req.body,
      shippingCost,
      totalAmount: req.body.totalAmount + shippingCost
    };
    
    const order = new Order(orderData);
    await order.save();
    
    // Populate product details
    await order.populate('items.product');
    
    // Send confirmation email (optional)
    try {
      await sendOrderConfirmationEmail(order, settings);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }
    
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    const filter = {};
    
    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    
    const orders = await Order.find(filter)
      .populate('items.product')
      .sort({ createdAt: -1 });
      
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
      { new: true, runValidators: true }
    ).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Helper function to send order confirmation email
async function sendOrderConfirmationEmail(order, settings) {
  if (!settings || !settings.emailConfig || !settings.emailConfig.smtpHost) {
    return; // Email not configured
  }
  
  const transporter = nodemailer.createTransport({
    host: settings.emailConfig.smtpHost,
    port: settings.emailConfig.smtpPort,
    secure: settings.emailConfig.smtpPort === 465,
    auth: {
      user: settings.emailConfig.smtpUser,
      pass: settings.emailConfig.smtpPassword
    }
  });
  
  const mailOptions = {
    from: `${settings.emailConfig.fromName} <${settings.emailConfig.fromEmail}>`,
    to: order.email,
    subject: 'Order Confirmation - Grazie Outfits',
    html: `
      <h1>Thank you for your order!</h1>
      <p>Dear ${order.customerName},</p>
      <p>Your order has been received and is being processed.</p>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total Amount:</strong> Rs ${order.totalAmount}</p>
      <p>We will contact you soon with updates.</p>
      <p>Best regards,<br>Grazie Outfits Team</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
}
