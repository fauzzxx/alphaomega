export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path;

    // Skip frontend assets and Vite internal paths
    if (
        path.startsWith('/src/') ||
        path.startsWith('/@fs/') ||
        path.startsWith('/assets/') ||
        path.startsWith('/payment/') ||
        path.includes('node_modules')
    ) {
        return path;
    }

    // For local development, prepend the backend URL and handle /uploads/ prefix
    let backendBase = API_BASE_URL.replace('/api', '');
    if (!backendBase || backendBase === '/') {
        backendBase = 'http://localhost:5000';
    }

    // If it's already a full upload path, just prepend backendBase
    if (path.startsWith('uploads/') || path.startsWith('/uploads/')) {
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${backendBase}/${cleanPath}`;
    }

    // Otherwise, assume it needs the uploads prefix (e.g. from DB)
    return `${backendBase}/uploads/${path.startsWith('/') ? path.substring(1) : path}`;
};

const handleResponse = async (response: Response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

const getAuthHeadersFormData = () => {
    const token = localStorage.getItem('adminToken');
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const productsAPI = {
    getAll: () => fetch(`${API_BASE_URL}/products`).then(handleResponse),
    getOne: (id: string) => fetch(`${API_BASE_URL}/products/${id}`).then(handleResponse),
    create: (formData: FormData) => fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: getAuthHeadersFormData(),
        body: formData,
    }).then(handleResponse),
    update: (id: string, formData: FormData) => fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeadersFormData(),
        body: formData,
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeadersFormData(),
    }).then(handleResponse),
};

export const ordersAPI = {
    getAll: (params?: { limit?: number }) => {
        const query = params?.limit ? `?limit=${params.limit}` : '';
        return fetch(`${API_BASE_URL}/orders${query}`, {
            headers: getAuthHeaders()
        }).then(handleResponse);
    },
    create: (formData: FormData) => fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        body: formData,
    }).then(handleResponse),
    updateStatus: (id: string, status: string) => fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
    }).then(handleResponse),
};

export const authAPI = {
    login: (credentials: any) => fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    }).then(handleResponse),
    verify: () => {
        // Basic verification: check if we have a token or just ping a protected route
        // For now, simpler: we assume if they can reach here they are "verified" or we'll add logic later
        return Promise.resolve({ success: true });
    },
    logout: () => {
        localStorage.removeItem('adminToken');
        return Promise.resolve();
    }
};

export const analyticsAPI = {
    getDashboard: (days: number = 30) => fetch(`${API_BASE_URL}/analytics/dashboard?days=${days}`).then(handleResponse),
};

export const bannerAPI = {
    getAll: () => fetch(`${API_BASE_URL}/banners`).then(handleResponse),
    create: (formData: FormData) => fetch(`${API_BASE_URL}/banners`, {
        method: 'POST',
        body: formData,
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE_URL}/banners/${id}`, {
        method: 'DELETE',
    }).then(handleResponse),
};
