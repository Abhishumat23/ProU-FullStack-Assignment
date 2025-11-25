#!/bin/bash

# ProU Employee & Task Management - Quick Start Script
# This script helps you start both backend and frontend servers

echo "========================================="
echo "ProU Employee & Task Management System"
echo "Quick Start Script"
echo "========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Function to start backend
start_backend() {
    echo "📦 Starting Backend Server..."
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies if needed
    if [ ! -f "venv/installed" ]; then
        echo "Installing Python dependencies..."
        pip install -r requirements.txt
        touch venv/installed
    fi
    
    # Start the server
    echo "🚀 Backend server starting on http://localhost:8000"
    python main.py
}

# Function to start frontend
start_frontend() {
    echo "📦 Starting Frontend Server..."
    cd frontend
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "Installing Node.js dependencies..."
        npm install
    fi
    
    # Start the development server
    echo "🚀 Frontend server starting on http://localhost:5173"
    npm run dev
}

# Main script
echo "Starting ProU Management System..."
echo ""
echo "Choose an option:"
echo "1. Start Backend only"
echo "2. Start Frontend only"
echo "3. Start Both (recommended)"
echo "4. Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        start_backend
        ;;
    2)
        start_frontend
        ;;
    3)
        echo ""
        echo "ℹ️  Starting both servers..."
        echo "ℹ️  Backend will run in this terminal"
        echo "ℹ️  Please open a NEW terminal and run this script again, selecting option 2"
        echo ""
        start_backend
        ;;
    4)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac
