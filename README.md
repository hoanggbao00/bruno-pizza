# Pizza Store & Craft 

This is a **Pizza Store & Craft** built with **Next.js** and deployed on **Vercel**. The app is designed for customers who want to buy Pizza or craft own Pizzas

**Live Demo:** [bruno-pizza-six.vercel.app](https://bruno-pizza-six.vercel.app/)

---

## Features  

### General:  
- **Sign Up / Sign In** for customer
- Role-based functionality:  
  - **Customer**: Order & Craft Pizzas and view order history.  
  - **Admin**: Manage all the items listings and handle order requests.  
- Add to cart and view history.  

### Customer-Specific:  
- Search and filter pizzas in a list view.  
- Add item to cart
- Craft Own Pizza with selectable toppings (max 5)  
- Send order requests to admin.
- View orders request history.  

### Admin-Specific:  
- Manage **Pizzas, Sizes, Toppings, Categories, Vouchers, Orders** with full **CRUD (Create, Read, Update, Delete)** capabilities.  
- Respond to customer orders requests.  

---

## Routes
```
├── (auth)
│   ├──login            # Login page
│   ├──sign-up           # Register Page
├── (main)
│   ├── /               # Landing Page
│   ├── /about          # About Page
│   ├── /menu           # List Product
│   ├── /pizza-builder  # Build own Pizza
│   ├── /cart           # Cart system
│   ├── /pizza/[id]     # Product Detail
└── admin
    ├── /               # Admin Dashboard           
    ├── /categories     # Category Management
    ├── /toppings       # Toppings Management
    ├── /sizes          # Size Management
    ├── /pizzas         # Pizzas Management
    ├── /vouchers       # Vouchers Management
    └── /orders         # Order Request Management
```

## Contributing  

Contributions are welcome! If you encounter bugs or have feature suggestions, please open an issue or submit a pull request.  

---

Thank you for exploring the **Pizza Store & Craft**! Check it out live at [bruno-pizza-six.vercel.app](https://bruno-pizza-six.vercel.app/).  