# Flavour Verse - Advanced Culinary Intelligence System

<div align="center">

![Flavour Verse Logo](https://img.shields.io/badge/Flavour%20Verse-orange?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-green?style=for-the-badge&logo=fastapi&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A comprehensive AI-powered culinary application that provides intelligent flavor analysis, ingredient substitutions, and nutritional information.**

[![GitHub stars](https://img.shields.io/github/stars/HimanshivaS2159/Betacoders.svg?style=social&label=Star)](https://github.com/HimanshivaS2159/Betacoders)
[![GitHub forks](https://img.shields.io/github/forks/HimanshivaS2159/Betacoders.svg?style=social&label=Fork)](https://github.com/HimanshivaS2159/Betacoders/fork)
[![GitHub issues](https://img.shields.io/github/issues/HimanshivaS2159/Betacoders.svg)](https://github.com/HimanshivaS2159/Betacoders/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Features

### Enhanced UI/UX
- Dark Theme: Beautiful gradient backgrounds with orange accents
- Responsive Design: Mobile-friendly interface with smooth animations
- Interactive Components: Real-time feedback and visual indicators
- Framer Motion: Smooth transitions and micro-interactions
- Glassmorphism: Modern blur effects with transparency

![Flavour Verse - Ingredient Substitution Interface](image.png)

### Core Functionality
- Flavor Analysis: Scientific taste breakdown with 6-point flavor profiles
- Ingredient Substitution: Smart recommendations for ingredient replacements
- Calorie Calculator: Nutritional information with serving sizes
- Smart Pairings: Scientific flavor combinations and recommendations

### Advanced Features
- Multi-Ingredient Analysis: Advanced flavor profiling for recipes
- Search History: Track and reuse previous searches
- Export Functionality: Save and share recipe data
- API Integration: External flavor database connectivity
- NLP Processing: Natural language query understanding

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/HimanshivaS2159/Betacoders.git
   cd Betacoders
   ```

2. Backend Setup
   ```bash
   cd backend
   pip install -r requirements.txt
   python run.py
   ```

3. Frontend Setup
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Access the Application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /flavors | All flavors from database |
| GET | /flavor/{ingredient} | Specific ingredient analysis |
| GET | /flavor-categories | All flavor categories |
| GET | /flavor-pairings/{category} | Pairing recommendations |
| POST | /flavor-profile | Multi-ingredient analysis |
| GET | /substitute/{ingredient} | Ingredient substitutions |
| GET | /calories/{ingredient} | Calorie information |
| POST | /nlp/parse | Query parsing |
| POST | /nlp/suggestions | Smart suggestions |

## Flavor Categories

| Category | Description | Key Ingredients | Best Pairings |
|----------|-------------|------------------|----------------|
| Sweet | Sugar, honey, vanilla, maple syrup | Citrus, nuts, spices |
| Sour | Lemon, lime, vinegar, yogurt | Sweet, herbs, fatty |
| Salty | Salt, soy sauce, cheese, bacon | Sweet, acidic, herbs |
| Bitter | Coffee, dark chocolate, kale | Sweet, fatty, creamy |
| Umami | Mushrooms, soy sauce, parmesan | Salty, acidic, fatty |
| Spicy | Chili, pepper, ginger, wasabi | Cooling, creamy, sweet |

## UI Components

### CalorieAnalyzer
- Advanced calorie calculation with serving sizes
- Export functionality for recipe data
- Visual nutritional breakdowns
- Real-time calorie tracking

### SubstitutionFinder
- Smart ingredient substitution recommendations
- Search history and sorting options
- Score-based matching system
- Popular ingredient suggestions

### FlavorAnalyzer
- Comprehensive flavor profile analysis
- Multi-ingredient flavor combinations
- Scientific pairing recommendations
- Interactive flavor charts

### SmartAssistant
- Natural language processing for queries
- Intelligent recipe suggestions
- Allergy and taste preference analysis
- Context-aware recommendations

## Technology Stack

### Backend
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-green?style=flat-square&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-ASGI-lightgrey?style=flat-square)
![CORS](https://img.shields.io/badge/CORS-Enabled-brightgreen?style=flat-square)

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.0-black?style=flat-square&logo=framer&logoColor=white)

### Additional Libraries
![Lucide React](https://img.shields.io/badge/Lucide%20React-0.294.0-8B5CF6?style=flat-square&logo=lucide&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-2.4.0-red?style=flat-square&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.0-5A29E4?style=flat-square&logo=axios&logoColor=white)

## Configuration

### API Key Setup
1. Copy `.env.example` to `.env` in the backend directory:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Add your API key:
   ```bash
   FOODOSCOPE_API_KEY=your_actual_api_key_here
   ```

### CORS Configuration
- Frontend URLs: `http://localhost:3000`, `http://127.0.0.1:3000`
- VS Code Live Server: `http://127.0.0.1:49342`, `http://localhost:49342`

## Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Lemon Analysis | Working | Detailed flavor profile with sour notes |
| Garlic Analysis | Working | Umami-rich savory profile |
| Vanilla Analysis | Working | Sweet aromatic compounds |
| Chocolate Analysis | Working | Complex bitter-sweet profile |
| Herb Analysis | Working | Fresh aromatic profiles |
| Dark Theme | Enhanced | Beautiful gradient UI |
| Multi-Ingredient | Advanced | Recipe flavor combinations |
| Smart Pairings | Working | Scientific recommendations |
| Export Features | Working | Recipe data export |
| Search History | Working | Track previous searches |

## Project Structure

```
Betacoders/
├── backend/                 # FastAPI Python backend
│   ├── app/                # Main application
│   │   ├── main.py         # FastAPI app setup
│   │   └── config.py       # Configuration
│   ├── api/                # API routes
│   │   └── routes.py       # All endpoints
│   ├── services/           # Business logic
│   │   ├── calorie_service.py
│   │   ├── flavordb_service.py
│   │   ├── substitution.py
│   │   └── nlp_service.py
│   ├── ml/                 # Machine learning models
│   └── run.py              # Entry point
├── frontend/               # React TypeScript frontend
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   │   ├── CalorieAnalyzer.tsx
│   │   │   ├── SubstitutionFinder.tsx
│   │   │   ├── FlavorAnalyzer.tsx
│   │   │   ├── SmartAssistant.tsx
│   │   │   ├── Header.tsx
│   │   │   └── App.tsx
│   │   ├── services/       # API services
│   │   │   └── api.ts
│   │   ├── App.tsx         # Main app
│   │   ├── index.tsx       # Entry point
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies
│   └── test-api.js         # API testing
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Usage Examples

### Flavor Analysis
```bash
# Get flavor profile for lemon
curl http://localhost:8000/flavor/lemon

# Get flavor categories
curl http://localhost:8000/flavor-categories

# Get pairings for sweet flavors
curl http://localhost:8000/flavor-pairings/sweet
```

### Multi-Ingredient Analysis
```bash
# Analyze flavor profile of multiple ingredients
curl -X POST http://localhost:8000/flavor-profile \
  -H "Content-Type: application/json" \
  -d '["lemon", "garlic", "basil"]'
```

### Ingredient Substitution
```bash
# Get substitutions for milk
curl http://localhost:8000/substitute/milk
```

## Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

### API Testing
```bash
cd frontend
node test-api.js
```

## Deployment

### Backend Deployment
```bash
# Using Docker
docker build -t flavour-verse-backend .
docker run -p 8000:8000 flavour-verse-backend

# Using Python
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to Netlify/Vercel
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
   ```bash
   git fork https://github.com/HimanshivaS2159/Betacoders.git
   ```

2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Make your changes
   - Follow the existing code style
   - Add tests for new features
   - Update documentation

4. Test thoroughly
   ```bash
   npm test
   python -m pytest
   ```

5. Submit a pull request
   - Provide a clear description
   - Include screenshots for UI changes
   - Reference related issues

## Development Guidelines

- Code Style: Follow PEP 8 for Python, ESLint for JavaScript/TypeScript
- Commit Messages: Use conventional commits (`feat:`, `fix:`, `docs:`, etc.)
- Branch Naming: Use `feature/`, `bugfix/`, `docs/` prefixes
- Testing: Maintain >80% code coverage

## Troubleshooting

### Common Issues

1. Port 3000 already in use
   ```bash
   # Kill existing process
   lsof -ti:3000 | xargs kill -9
   # Or use different port
   npm start -- --port=3001
   ```

2. Backend connection issues
   ```bash
   # Check if backend is running
   curl http://localhost:8000/docs
   # Verify CORS settings
   ```

3. Missing dependencies
   ```bash
   # Backend
   pip install -r requirements.txt
   # Frontend
   npm install
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FastAPI - Modern Python web framework
- React - JavaScript library for building UIs
- TailwindCSS - Utility-first CSS framework
- Framer Motion - Production-ready motion library
- Lucide React - Beautiful icon library

## Contact

- GitHub: [@HimanshivaS2159](https://github.com/HimanshivaS2159)
- Project: [Flavour Verse](https://github.com/HimanshivaS2159/Betacoders)

---

<div align="center">

**Flavour Verse** - Where Culinary Intelligence Meets Modern Technology 

Made with by [Himanshiva S](https://github.com/HimanshivaS2159)

[![Star History Chart](https://api.star-history.com/svg?repos=HimanshivaS2159/Betacoders&type=Date)](https://star-history.com/#HimanshivaS2159/Betacoders&Date)

</div>
Updated today 
Updated today 🚀
