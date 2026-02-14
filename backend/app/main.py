"""
Flavour Verse Backend - FastAPI Application

A comprehensive culinary intelligence system that provides:
- Flavor analysis and profiling
- Ingredient substitution recommendations
- Nutritional information and calorie calculations
- Smart recipe pairings and suggestions

Author: Himanshiva S
Version: 2.0.0
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
import uvicorn
from api.routes import router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info("🚀 Flavour Verse Backend starting up...")
    yield
    # Shutdown
    logger.info("🛑 Flavour Verse Backend shutting down...")

# Create FastAPI app with enhanced configuration
app = FastAPI(
    title="Flavour Verse API",
    description="Advanced Culinary Intelligence System - Flavor Analysis, Ingredient Substitution & Nutritional Information",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
    contact={
        "name": "Himanshiva S",
        "url": "https://github.com/HimanshivaS2159",
        "email": "himanshiva@example.com"
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
    }
)

# Enhanced CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        "http://127.0.0.1:49342", 
        "http://localhost:49342",
        "https://flavour-verse.vercel.app",  # Production frontend
        "https://flavour-verse.netlify.app"   # Alternative production
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*", "Authorization", "Content-Type", "X-Requested-With"],
    expose_headers=["*"]
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred. Please try again later.",
            "detail": str(exc) if app.debug else None
        }
    )

# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "service": "Flavour Verse Backend",
        "version": "2.0.0",
        "timestamp": "2024-02-14T21:55:00Z"
    }

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Flavour Verse API",
        "description": "Advanced Culinary Intelligence System",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "flavors": "/flavors",
            "substitutions": "/substitute/{ingredient}",
            "calories": "/calories/{ingredient}",
            "flavor_analysis": "/flavor/{ingredient}"
        }
    }

# Include API routes
app.include_router(router, prefix="/api/v1", tags=["API"])

# Log startup
logger.info("✅ Flavour Verse Backend configured successfully")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
