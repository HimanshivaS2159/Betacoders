// Test API connection using built-in fetch
async function testCalorieAPI() {
  try {
    console.log('Testing calorie API...');
    const response = await fetch('http://localhost:8000/calories?ingredient=milk');
    const data = await response.json();
    console.log('API Response:', data);
    
    if (data.calories === 42) {
      console.log('✅ API Test PASSED: Calorie API working correctly');
      console.log('Response:', data);
    } else {
      console.log('❌ API Test FAILED: Unexpected response');
      console.log('Response:', data);
    }
  } catch (error) {
    console.log('❌ API Test FAILED: Network error:', error.message);
  }
}

testCalorieAPI();
