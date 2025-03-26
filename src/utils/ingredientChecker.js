// File: src/utils/ingredientChecker.js

/**
 * Dynamically analyze ingredients using Open Food Facts API
 * Checks for harmful/beneficial patterns and fetches NOVA, vegan status, etc.
 */

const harmfulKeywords = [
    'aspartame', 'sodium benzoate', 'paraben', 'sodium lauryl sulfate',
    'zinc pyrithione', 'ammonia', 'sucralose', 'xylitol', 'carrageenan',
    'fructose', 'gluten'
  ];
  
  const beneficialKeywords = [
    'fiber', 'protein', 'vitamin c', 'vitamin d', 'omega-3', 'antioxidant'
  ];
  
  const cache = new Map();
  
  const fetchIngredientDetails = async (name) => {
    if (cache.has(name)) return cache.get(name);
  
    try {
      const res = await fetch(`https://world.openfoodfacts.org/ingredient/${encodeURIComponent(name)}.json`, {
        headers: { 'User-Agent': 'Ingrdnt/1.0 (support@ingrdnt.app)' }
      });
      const json = await res.json();
  
      const info = {
        nova: json?.nova_group,
        vegan: json?.vegan || 'unknown',
        vegetarian: json?.vegetarian || 'unknown',
        additives_tags: json?.additives_tags || [],
        allergens: json?.allergens_tags || []
      };
  
      cache.set(name, info);
      return info;
    } catch (err) {
      console.warn(`Failed to fetch ingredient info: ${name}`);
      return {};
    }
  };
  
  export const analyzeIngredients = async (rawText) => {
    if (!rawText) return [];
  
    const ingredients = rawText
      .toLowerCase()
      .replace(/\(.*?\)/g, '')
      .replace(/[^a-zA-Z0-9,\s-]/g, '')
      .split(/[\n,]/)
      .map(word => word.trim())
      .filter(Boolean);
  
    const seen = new Set();
    const results = [];
  
    for (const name of ingredients) {
      if (seen.has(name)) continue;
      seen.add(name);
  
      const isHarmful = harmfulKeywords.some(k => name.includes(k));
      const isBeneficial = beneficialKeywords.some(k => name.includes(k));
      const apiData = await fetchIngredientDetails(name);
  
      results.push({
        name,
        harmful: isHarmful || false,
        beneficial: isBeneficial || false,
        reason: isHarmful ? 'Flagged by keyword pattern' : isBeneficial ? 'Known beneficial compound' : undefined,
        ...apiData
      });
    }
  
    return results;
  };
  