# Frontend - ProU Employee & Task Management

React + TypeScript frontend for the Employee & Task Management System.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

App runs on `http://localhost:5173`

## Features

- React 18 with TypeScript
- React Router for navigation
- TanStack React Query for data fetching
- Tailwind CSS for styling
- Axios for API calls
- Recharts for data visualization
- Toast notifications
- JWT authentication
- Responsive design

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Login Credentials

**Admin:**
- Email: admin@prothink.com
- Password: password123

**Manager:**
- Email: manager@prothink.com
- Password: manager123

## Project Structure

```
src/
├── api/          # API client and endpoints
├── components/   # Reusable components
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── types/        # TypeScript types
├── App.tsx       # Root component
└── main.tsx      # Entry point
```

## Development

- Hot module replacement enabled
- TypeScript strict mode
- ESLint for code quality
- Tailwind CSS for styling
