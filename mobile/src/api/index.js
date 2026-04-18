const API_BASE_URL = 'https://icyizere.iraady.com/api';

// Institution endpoints
export const fetchInstitutions = async (page = 1, limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/institutions?page=${page}&limit=${limit}`);
  return response.json();
};

export const fetchInstitutionBySlug = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/institutions/${slug}`);
  return response.json();
};

export const fetchInstitutionsByCategory = async (categorySlug) => {
  const response = await fetch(`${API_BASE_URL}/institutions?category=${categorySlug}`);
  return response.json();
};

// Category endpoints
export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

// Add institution
export const addInstitution = async (data, token) => {
  const response = await fetch(`${API_BASE_URL}/institutions/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Rating endpoints (placeholder - may need implementation)
export const submitReview = async (institutionId, rating, comment, token) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      institutionId,
      rating,
      comment,
    }),
  });
  return response.json();
};

export const fetchInstitutionReviews = async (institutionSlug) => {
  const response = await fetch(`${API_BASE_URL}/institutions/${institutionSlug}`);
  return response.json();
};
