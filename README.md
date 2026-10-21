# Dastoor Home Essentials & Décor (Pakistan)

A modern, professional, visually attractive, and fully responsive e-commerce storefront crafted for a Pakistani home essentials and artisanal décor brand.

## Key Features

1. **Pakistani Regional Craft & Catalog**
   - 13 distinct categories: Terracotta & Ceramics, Lamps & Lighting, Raw Silk Block-Printed Cushions, Marble & Sheesham Centerpieces, Wall Art, Storage Baskets, Tableware, etc.
   - Prices consistently formatted in Pakistani Rupees (**PKR / Rs.**).
   - Detailed specifications including materials, dimensions, artisan origin (Multan, Chiniot, Gujranwala, Sindh), and care guidelines.

2. **Full Responsive E-Commerce Workflow**
   - **Persistent Shopping Bag:** Local Storage synchronization across browser reloads.
   - **Slide-out Cart Drawer & Full Cart View:** Free delivery threshold progress meter (Free shipping over Rs. 4,999; flat Rs. 250 fee for other orders).
   - **Discount Coupons:** Active discount vouchers (`WELCOME10` for 10% off, `DASTOOR15` for 15% off).
   - **Saved Wishlist:** One-click save, instant feedback, and batch move to bag.
   - **Responsive Product Filters:** Real-time keyword search, category switching, price slider, in-stock toggle, and sorting options.

3. **WhatsApp Click-to-Chat & Order Placement**
   - Official Business Contact: **03126687237** (`923126687237`)
   - Click-to-chat format: `https://wa.me/923126687237`
   - Floating WhatsApp button with concierge card and quick inquiry prompts.
   - Direct product inquiries with pre-filled SKU, name, and price.
   - Automated WhatsApp order generator formatting full item breakdown, customer name, delivery address, city, and subtotal.

4. **Checkout & Pakistan Logistics**
   - Delivery address collection with Pakistani city picker (Karachi, Lahore, Islamabad, Faisalabad, Multan, Peshawar, Quetta, etc.).
   - Payment options: **Cash on Delivery (COD)**, **Direct Bank Transfer / Raast**, and **JazzCash / EasyPaisa**.
   - Clear customer confirmation and order reference generation (e.g., `#DH-8291`).

5. **16 Complete Pages & Customer Policies**
   - Home, Shop All, Product Category views, Product Details (PDP), Search, Bag, Checkout, Order Confirmation, Wishlist, About Us, Contact & Showrooms, FAQs, Shipping Policy, Returns & Damaged Goods Guarantee, Privacy Policy, Terms & Conditions.

---

## Local Development Setup

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository and navigate into the folder
cd dastoor-home

# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open your browser at `http://localhost:3000`.

### Building for Production
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import your repository. Vercel automatically detects Vite/React configuration.
4. Click **Deploy**.

### Deploy to Cloud Run / Docker
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Brand Contact Details
- **Brand Name:** Dastoor Home Essentials & Décor
- **WhatsApp Support:** 0312-6687237 (`+92 312 6687237`)
- **Showrooms:** MM Alam Road, Gulberg III, Lahore & Bukhari Commercial, DHA Phase 6, Karachi
