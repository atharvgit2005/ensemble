#!/bin/bash

echo "🎭 Setting up Ensemble Club Website..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL is not installed. Please install MySQL first."
    echo "   You can use Docker: docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8.0"
fi

echo "📦 Installing backend dependencies..."
cd server
npm install

echo "📦 Installing frontend dependencies..."
cd ../client
npm install

echo "🔧 Setting up environment variables..."
cd ../server
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
DATABASE_URL="mysql://root:password@localhost:3306/ensemble_club"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
EOF
    echo "✅ .env file created. Please update the database credentials."
fi

echo "🗄️  Setting up database..."
echo "Please make sure MySQL is running and create a database named 'ensemble_club'"
echo "You can do this by running:"
echo "mysql -u root -p -e 'CREATE DATABASE ensemble_club;'"

read -p "Press Enter when you've created the database..."

echo "🔄 Generating Prisma client..."
npm run db:generate

echo "🔄 Running database migrations..."
npm run db:migrate

echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the development servers:"
echo "1. Backend: cd server && npm run dev"
echo "2. Frontend: cd client && npm run dev"
echo ""
echo "The website will be available at:"
echo "- Frontend: http://localhost:5173"
echo "- Backend: http://localhost:5000"
echo ""
echo "Admin credentials:"
echo "- Email: admin@ensemble.com"
echo "- Password: admin123"
echo ""
echo "Happy coding! 🚀"
