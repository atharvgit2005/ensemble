# Ensemble Club Full-Stack Website

A visually striking, fully responsive, dark-themed website for the "Ensemble" club featuring a modern tech stack with a unique "Doodle Art" aesthetic.

## 🎨 Design Features

- **Dark Theme**: Deep, rich backgrounds with vibrant neon accents
- **Doodle Art Style**: Playful, hand-drawn aesthetic with neon colors
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Modern UI**: Clean, contemporary interface with smooth animations

## 🛠️ Technology Stack

### Frontend
- **Vite + React**: Modern React development with Vite
- **Tailwind CSS**: Utility-first CSS framework with custom doodle styles
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API calls

### Backend
- **Node.js + Express**: Server-side JavaScript runtime
- **Prisma ORM**: Modern database toolkit
- **MySQL**: Relational database
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing

## 📁 Project Structure

```
Ensemble/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── hooks/         # Custom hooks
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── prisma/          # Database schema
│   ├── .env             # Environment variables
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ensemble
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../server
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/ensemble_club"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=5000
   ```

5. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   ```

6. **Start the development servers**
   
   Backend (Terminal 1):
   ```bash
   cd server
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd client
   npm run dev
   ```

## 🌟 Features

### Frontend Pages
- **Home**: Photo carousel with call-to-action sections
- **About**: Team member profiles with contact information
- **Club Pages**: Individual pages for Music, Dance, and Theatre clubs
- **Shop**: E-commerce functionality with shopping cart
- **Contact**: Contact form and club coordinator information

### Backend API
- **Authentication**: User registration and login
- **Shop**: Product management and order processing
- **Public**: Member profiles and public information

### Key Components
- **Responsive Navbar**: Sticky navigation with dropdowns
- **Auth Modal**: Login/register functionality
- **Photo Carousel**: Auto-sliding image gallery
- **Shopping Cart**: Full e-commerce cart functionality
- **Doodle Art Styling**: Custom CSS with neon effects

## 🎨 Doodle Art Design System

The website features a unique "Doodle Art" aesthetic with:

- **Color Palette**: Neon pink, electric blue, lime green, neon yellow
- **Animations**: Gradient shifts, floating elements, glow effects
- **Typography**: Inter font family for modern readability
- **Components**: Custom button styles, card designs, and borders

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Optimized for all device sizes

## 🔧 Development Scripts

### Backend
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Authentication and user management
- **Product**: E-commerce merchandise
- **Order**: Customer orders and shipping
- **MemberProfile**: Club member information

## 🚀 Deployment

### Backend Deployment
1. Set up a MySQL database (e.g., PlanetScale, Railway, or AWS RDS)
2. Update environment variables
3. Run database migrations
4. Deploy to platforms like Railway, Heroku, or Vercel

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎭 About Ensemble

Ensemble is a vibrant cultural club that brings together students passionate about:
- **Music**: From classical to contemporary
- **Dance**: Traditional and modern forms
- **Theatre**: Acting, directing, and production

Join our community and express your creativity!

---

Built with ❤️ for the Ensemble community
