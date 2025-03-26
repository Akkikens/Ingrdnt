// File: src/utils/alternatives.js

/**
 * Suggest healthier alternatives dynamically using Open Food Facts API
 * Based on product category, this fetches top-scanned products
 */

export const getAlternatives = async (productName, category = '') => {
    if (!category) return [];
  
    try {
      const searchUrl = `https://world.openfoodfacts.org/api/v2/search?categories_tags=${category}&sort_by=unique_scans_n&page_size=5`;
      const response = await fetch(searchUrl, {
        headers: { 'User-Agent': 'Ingrdnt/1.0 (support@ingrdnt.app)' }
      });
  
      const result = await response.json();
  
      if (result?.products?.length > 0) {
        const alternatives = result.products
          .map(p => p.product_name)
          .filter(Boolean);
  
        return [...new Set(alternatives)].slice(0, 5);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching dynamic alternatives:', error);
      return [];
    }
  };
  