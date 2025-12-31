# Grazie Outfits - MERN Stack E-commerce Platform

Transform of the static Grazie Outfits website into a modern, professional e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and Material-UI.

## 🚀 Quick Start

```bash
# Install all dependencies
npm run install:all

# Setup environment variables
cp .env.example .env
cp client/.env.example client/.env

# Start development (both frontend and backend)
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📋 Features

### Customer-Facing
✅ Modern, responsive landing page with MUI  
✅ Product catalog with filtering  
✅ Product detail pages  
✅ Shopping cart and checkout  
✅ Multiple payment options (COD, Bank Transfer, Easypaisa, JazzCash)  
✅ Region-based dynamic shipping costs  
✅ Contact form with email integration  

### Admin Panel
✅ Secure JWT authentication  
✅ Product management (CRUD with image upload)  
✅ Order management and tracking  
✅ Email/SMTP configuration  
✅ Shipping rate management by region  
✅ Payment method settings  

## 🛠 Technology Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Nodemailer  
**Frontend:** React, Vite, Material-UI, React Router, Axios

## 📁 Project Structure

```
Grazieoutfits/
├── server/              # Backend Express API
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & uploads
│   └── server.js        # Entry point
├── client/              # React frontend
│   └── src/
│       ├── components/  # UI components
│       ├── pages/       # Page components
│       └── services/    # API clients
└── package.json         # Root config
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

1. **Clone and install dependencies**
   ```bash
   git clone <repo-url>
   cd Grazieoutfits
   npm install
   cd client && npm install && cd ..
   ```

2. **Configure environment**
   
   Root `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/grazieoutfits
   JWT_SECRET=your-secret-key
   ```

   Client `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Create admin account**
   ```bash
   curl -X POST http://localhost:5000/api/admin/create \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","email":"admin@example.com","password":"secure123"}'
   ```

## 🚢 Deployment

**Backend:** Heroku, Railway, DigitalOcean  
**Frontend:** Vercel, Netlify  
**Database:** MongoDB Atlas

Build for production:
```bash
npm run build --prefix client
```

## 📖 API Endpoints

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create (admin)
- `PUT /api/products/:id` - Update (admin)
- `DELETE /api/products/:id` - Delete (admin)

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders` - List orders (admin)
- `PUT /api/orders/:id/status` - Update status (admin)

### Admin
- `POST /api/admin/login` - Login
- `GET /api/admin/profile` - Get profile (protected)
- `PUT /api/admin/change-password` - Change password (protected)

### Settings
- `GET /api/settings` - Get settings (admin)
- `PUT /api/settings` - Update settings (admin)
- `GET /api/settings/shipping-rate?region=X` - Get shipping rate

## 📞 Contact

- **Email:** grazieoutfits@gmail.com
- **Phone:** +92 318-6831-156
- **WhatsApp:** +92 317-5837-684
- **Location:** Islamabad, Pakistan

## 📝 License

ISC

---

**Note:** Legacy static HTML files (index.html, style.css, etc.) are preserved for reference and can be removed after full deployment of the MERN stack version.
