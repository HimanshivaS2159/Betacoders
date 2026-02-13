def get_calorie_data(ingredient: str):
    """
    Get calorie information for ingredients
    Returns calories per 100g for common ingredients
    """
    if not ingredient:
        return {"error": "Ingredient name is required"}
    
    ingredient = ingredient.lower().strip()
    
    # Comprehensive calorie database (per 100g)
    calorie_database = {
        # Dairy products
        "milk": {"calories": 42, "unit": "kcal per 100ml", "protein": 3.4, "carbs": 5.0, "fat": 1.0},
        "almond milk": {"calories": 15, "unit": "kcal per 100ml", "protein": 0.6, "carbs": 0.3, "fat": 1.2},
        "soy milk": {"calories": 33, "unit": "kcal per 100ml", "protein": 2.8, "carbs": 2.1, "fat": 1.8},
        "coconut milk": {"calories": 230, "unit": "kcal per 100ml", "protein": 2.3, "carbs": 5.5, "fat": 24.0},
        "oat milk": {"calories": 47, "unit": "kcal per 100ml", "protein": 1.3, "carbs": 6.7, "fat": 1.8},
        "cashew milk": {"calories": 25, "unit": "kcal per 100ml", "protein": 0.9, "carbs": 1.6, "fat": 2.0},
        "cheese": {"calories": 402, "unit": "kcal per 100g", "protein": 25.0, "carbs": 1.3, "fat": 33.0},
        "mozzarella": {"calories": 280, "unit": "kcal per 100g", "protein": 22.0, "carbs": 2.2, "fat": 22.0},
        "butter": {"calories": 717, "unit": "kcal per 100g", "protein": 0.9, "carbs": 0.1, "fat": 81.0},
        "ghee": {"calories": 880, "unit": "kcal per 100g", "protein": 0.3, "carbs": 0.0, "fat": 98.0},
        "margarine": {"calories": 720, "unit": "kcal per 100g", "protein": 0.2, "carbs": 0.5, "fat": 80.0},
        
        # Oils and fats
        "olive oil": {"calories": 884, "unit": "kcal per 100ml", "protein": 0.0, "carbs": 0.0, "fat": 100.0},
        "coconut oil": {"calories": 862, "unit": "kcal per 100ml", "protein": 0.0, "carbs": 0.0, "fat": 100.0},
        "avocado oil": {"calories": 884, "unit": "kcal per 100ml", "protein": 0.0, "carbs": 0.0, "fat": 100.0},
        
        # Eggs
        "eggs": {"calories": 155, "unit": "kcal per 100g", "protein": 13.0, "carbs": 1.1, "fat": 11.0},
        "egg": {"calories": 155, "unit": "kcal per 100g", "protein": 13.0, "carbs": 1.1, "fat": 11.0},
        
        # Flours and grains
        "flour": {"calories": 364, "unit": "kcal per 100g", "protein": 10.0, "carbs": 76.0, "fat": 1.0},
        "almond flour": {"calories": 579, "unit": "kcal per 100g", "protein": 21.0, "carbs": 21.0, "fat": 50.0},
        "coconut flour": {"calories": 444, "unit": "kcal per 100g", "protein": 19.0, "carbs": 16.0, "fat": 13.0},
        "oat flour": {"calories": 389, "unit": "kcal per 100g", "protein": 17.0, "carbs": 66.0, "fat": 7.0},
        "whole wheat flour": {"calories": 340, "unit": "kcal per 100g", "protein": 13.0, "carbs": 72.0, "fat": 2.5},
        "gluten-free flour": {"calories": 380, "unit": "kcal per 100g", "protein": 8.0, "carbs": 78.0, "fat": 2.0},
        
        # Sweeteners
        "sugar": {"calories": 387, "unit": "kcal per 100g", "protein": 0.0, "carbs": 100.0, "fat": 0.0},
        "honey": {"calories": 304, "unit": "kcal per 100g", "protein": 0.3, "carbs": 82.0, "fat": 0.0},
        "maple syrup": {"calories": 260, "unit": "kcal per 100g", "protein": 0.0, "carbs": 67.0, "fat": 0.3},
        "stevia": {"calories": 0, "unit": "kcal per 100g", "protein": 0.0, "carbs": 0.0, "fat": 0.0},
        "coconut sugar": {"calories": 375, "unit": "kcal per 100g", "protein": 0.5, "carbs": 94.0, "fat": 0.1},
        "brown sugar": {"calories": 380, "unit": "kcal per 100g", "protein": 0.0, "carbs": 98.0, "fat": 0.0},
        
        # Fruits
        "apple": {"calories": 52, "unit": "kcal per 100g", "protein": 0.3, "carbs": 14.0, "fat": 0.2},
        "banana": {"calories": 89, "unit": "kcal per 100g", "protein": 1.1, "carbs": 23.0, "fat": 0.3},
        "lemon": {"calories": 29, "unit": "kcal per 100g", "protein": 1.1, "carbs": 9.3, "fat": 0.3},
        "vanilla": {"calories": 288, "unit": "kcal per 100g", "protein": 0.1, "carbs": 12.7, "fat": 0.1},
        
        # Vegetables and herbs
        "garlic": {"calories": 149, "unit": "kcal per 100g", "protein": 6.4, "carbs": 33.0, "fat": 0.5},
        "basil": {"calories": 23, "unit": "kcal per 100g", "protein": 3.2, "carbs": 2.7, "fat": 0.6},
        "ginger": {"calories": 80, "unit": "kcal per 100g", "protein": 1.8, "carbs": 18.0, "fat": 0.8},
        "mint": {"calories": 70, "unit": "kcal per 100g", "protein": 3.8, "carbs": 15.0, "fat": 0.9},
        "cinnamon": {"calories": 247, "unit": "kcal per 100g", "protein": 4.0, "carbs": 81.0, "fat": 1.2},
        
        # Other ingredients
        "chocolate": {"calories": 546, "unit": "kcal per 100g", "protein": 5.0, "carbs": 61.0, "fat": 31.0},
        "coffee": {"calories": 1, "unit": "kcal per 100ml", "protein": 0.1, "carbs": 0.0, "fat": 0.0},
        "honey": {"calories": 304, "unit": "kcal per 100g", "protein": 0.3, "carbs": 82.0, "fat": 0.0},
        "applesauce": {"calories": 68, "unit": "kcal per 100g", "protein": 0.2, "carbs": 17.0, "fat": 0.1},
        "flax eggs": {"calories": 37, "unit": "kcal per egg", "protein": 1.3, "carbs": 2.0, "fat": 2.9},
        "chia eggs": {"calories": 65, "unit": "kcal per egg", "protein": 2.1, "carbs": 5.1, "fat": 4.2},
        "silken tofu": {"calories": 55, "unit": "kcal per 100g", "protein": 8.0, "carbs": 1.9, "fat": 3.2},
        "nutritional yeast": {"calories": 290, "unit": "kcal per 100g", "protein": 50.0, "carbs": 7.0, "fat": 0.5},
        "cashew cheese": {"calories": 300, "unit": "kcal per 100g", "protein": 10.0, "carbs": 15.0, "fat": 25.0},
        "tofu": {"calories": 76, "unit": "kcal per 100g", "protein": 8.0, "carbs": 1.9, "fat": 4.8},
        "coconut yogurt": {"calories": 99, "unit": "kcal per 100g", "protein": 2.5, "carbs": 8.0, "fat": 7.0},
        "plant-based milk": {"calories": 30, "unit": "kcal per 100ml", "protein": 1.0, "carbs": 3.0, "fat": 1.5},
        
        # Grains
        "rice": {"calories": 130, "unit": "kcal per 100g", "protein": 2.7, "carbs": 28.0, "fat": 0.3},
        "brown rice": {"calories": 111, "unit": "kcal per 100g", "protein": 2.6, "carbs": 23.0, "fat": 0.9},
        "white rice": {"calories": 130, "unit": "kcal per 100g", "protein": 2.7, "carbs": 28.0, "fat": 0.3},
        "quinoa": {"calories": 120, "unit": "kcal per 100g", "protein": 4.4, "carbs": 21.0, "fat": 1.9},
        "oats": {"calories": 389, "unit": "kcal per 100g", "protein": 16.9, "carbs": 66.0, "fat": 6.9}
    }
    
    # Try to find exact match first
    if ingredient in calorie_database:
        data = calorie_database[ingredient].copy()
        data["ingredient"] = ingredient
        data["source"] = "local_database"
        return data
    
    # Try partial matches for common variations
    for key, value in calorie_database.items():
        if ingredient in key or key in ingredient:
            data = value.copy()
            data["ingredient"] = key
            data["source"] = "partial_match"
            data["matched_from"] = key
            return data
    
    # Return error with suggestions
    available_ingredients = list(calorie_database.keys())[:20]  # Show first 20 for brevity
    
    return {
        "error": f"No calorie data found for '{ingredient}'",
        "suggestion": f"Try one of these ingredients: {', '.join(available_ingredients)}",
        "available_ingredients": available_ingredients
    }

def calculate_recipe_calories(ingredients_list: list):
    """
    Calculate total calories for a recipe
    ingredients_list should be a list of dictionaries with 'ingredient' and 'amount' keys
    """
    if not ingredients_list:
        return {"error": "Ingredients list is required"}
    
    total_calories = 0
    total_protein = 0
    total_carbs = 0
    total_fat = 0
    ingredient_details = []
    
    for item in ingredients_list:
        if not isinstance(item, dict) or 'ingredient' not in item:
            continue
            
        ingredient_name = item['ingredient']
        amount = item.get('amount', 100)  # Default to 100g if not specified
        
        # Get calorie data for this ingredient
        calorie_data = get_calorie_data(ingredient_name)
        
        if 'error' in calorie_data:
            ingredient_details.append({
                "ingredient": ingredient_name,
                "amount": amount,
                "error": calorie_data['error']
            })
            continue
        
        # Calculate based on amount (assuming base data is per 100g/ml)
        multiplier = amount / 100
        ingredient_calories = calorie_data['calories'] * multiplier
        ingredient_protein = calorie_data.get('protein', 0) * multiplier
        ingredient_carbs = calorie_data.get('carbs', 0) * multiplier
        ingredient_fat = calorie_data.get('fat', 0) * multiplier
        
        total_calories += ingredient_calories
        total_protein += ingredient_protein
        total_carbs += ingredient_carbs
        total_fat += ingredient_fat
        
        ingredient_details.append({
            "ingredient": ingredient_name,
            "amount": amount,
            "calories": round(ingredient_calories, 1),
            "protein": round(ingredient_protein, 1),
            "carbs": round(ingredient_carbs, 1),
            "fat": round(ingredient_fat, 1),
            "unit": calorie_data.get('unit', 'kcal per 100g')
        })
    
    return {
        "total_calories": round(total_calories, 1),
        "total_protein": round(total_protein, 1),
        "total_carbs": round(total_carbs, 1),
        "total_fat": round(total_fat, 1),
        "ingredients": ingredient_details,
        "serving_size": len(ingredients_list)
    }
