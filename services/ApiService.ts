import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
    private static instance: ApiService;
    private axiosInstance: AxiosInstance;

    private constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            // timeout: 5000
            headers: { 'Content-Type': 'application/json' },
            maxRedirects: 5, // Дозволити до 5 редіректів
            validateStatus: function (status) {
                return status >= 200 && status < 400; // Прийняти 2xx та 3xx статуси
            },
        });

        // Додати інтерцептор для обробки редіректів
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Якщо це редірект (3xx), обробити його
                if (response.status >= 300 && response.status < 400 && response.headers.location) {
                    console.log(`Redirect detected: ${response.status} to ${response.headers.location}`);
                }
                return response;
            },
            (error) => {
                // Обробка помилок
                if (error.response && error.response.status >= 300 && error.response.status < 400) {
                    console.log(`Redirect error: ${error.response.status}`);
                }
                return Promise.reject(error);
            }
        );
    }

    // Create a singleton instance
    public static getInstance(baseUrl: string): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService(baseUrl);
        }
        return ApiService.instance;
    }

    // GET - Fetch data from the API
    public async getData(endpoint: string) {
        try {
            const response = await this.axiosInstance.get(endpoint);
            return response.data;
        }
        catch (error) {
            throw new Error(`API GET request failed: ${error}`);
        }
    }

    // POST - Send data to the API
    public async postData(endpoint: string, data: any) {
        try {
            const response = await this.axiosInstance.post(endpoint, data);
            return response.data;
        }
        catch (error) {
            throw new Error(`API POST request failed: ${error}`);
        }
    }

    // Новий метод для ручної обробки редіректів (якщо потрібно)
    public async postDataWithRedirectHandling(endpoint: string, data: any, maxRedirects: number = 3) {
        try {
            let currentEndpoint = endpoint;
            let redirectCount = 0;

            while (redirectCount <= maxRedirects) {
                const response = await this.axiosInstance.post(currentEndpoint, data, {
                    maxRedirects: 0, // Вимкнути автоматичні редіректи
                    validateStatus: null // Прийняти всі статуси
                });

                if (response.status >= 300 && response.status < 400 && response.headers.location) {
                    // Редірект знайдено
                    redirectCount++;
                    currentEndpoint = response.headers.location;
                    console.log(`Following redirect ${redirectCount} to: ${currentEndpoint}`);
                } else {
                    // Успішна відповідь або помилка
                    return response.data;
                }
            }

            throw new Error(`Too many redirects (${maxRedirects})`);
        }
        catch (error) {
            throw new Error(`API POST request failed: ${error}`);
        }
    }

    // Метод для отримання повної відповіді (з headers, status, etc.)
    public async postDataFullResponse(endpoint: string, data: any): Promise<AxiosResponse> {
        try {
            const response = await this.axiosInstance.post(endpoint, data);
            return response;
        }
        catch (error) {
            throw new Error(`API POST request failed: ${error}`);
        }
    }
}

export default ApiService;
