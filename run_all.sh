#!/bin/bash
# Quick Start Script for Frontend-Backend Integration
# Run this script to start both services

echo "🚀 FOSSEE Workshop Platform - Quick Start"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from correct directory
if [ ! -f "manage.py" ]; then
    echo -e "${YELLOW}⚠️  Warning: Please run this from the workshop_booking directory${NC}"
    echo "Usage: cd workshop_booking && bash run_all.sh"
    exit 1
fi

# Function to run Django backend
run_backend() {
    echo -e "${BLUE}Starting Django Backend...${NC}"
    echo "📍 Backend URL: http://localhost:8000"
    echo ""
    python manage.py runserver
}

# Function to run React frontend
run_frontend() {
    echo -e "${BLUE}Starting React Frontend...${NC}"
    echo "📍 Frontend URL: http://localhost:3000"
    echo ""
    cd frontend
    npm start
}

# Check Python
if ! command -v python &> /dev/null; then
    echo -e "${YELLOW}❌ Python not found${NC}"
    echo "Please install Python 3.6+ and try again"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}❌ npm not found${NC}"
    echo "Please install Node.js and npm, then run:"
    echo "  cd frontend && npm install"
    exit 1
fi

echo -e "${GREEN}✅ All dependencies found${NC}"
echo ""
echo "Choose which service to start:"
echo "1) Both (Backend + Frontend) - Requires 2 terminals"
echo "2) Backend only (port 8000)"
echo "3) Frontend only (port 3000)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo -e "${BLUE}Opening 2 terminals for Backend and Frontend...${NC}"
        echo ""
        echo "Starting Backend in a new terminal..."
        if command -v gnome-terminal &> /dev/null; then
            # Linux with GNOME
            gnome-terminal -- bash -c "cd $(pwd) && $(which python) manage.py runserver; bash"
        elif command -v xterm &> /dev/null; then
            # Generic Linux
            xterm -hold -e "cd $(pwd) && $(which python) manage.py runserver" &
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            open -a Terminal "$(pwd)/run_backend.sh"
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            # Windows
            start cmd /k "cd /d $(pwd) && python manage.py runserver"
        fi
        
        sleep 2
        echo "Starting Frontend in a new terminal..."
        if command -v gnome-terminal &> /dev/null; then
            gnome-terminal -- bash -c "cd $(pwd)/frontend && npm start; bash"
        elif command -v xterm &> /dev/null; then
            xterm -hold -e "cd $(pwd)/frontend && npm start" &
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            open -a Terminal "$(pwd)/run_frontend.sh"
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            start cmd /k "cd /d $(pwd)/frontend && npm start"
        fi
        echo -e "${GREEN}✅ Services started in separate terminals${NC}"
        ;;
    2)
        run_backend
        ;;
    3)
        run_frontend
        ;;
    *)
        echo -e "${YELLOW}Invalid choice${NC}"
        exit 1
        ;;
esac
