import axios, { AxiosInstance } from 'axios';

class ApiService {
    private static instance: ApiService;
    private axiosInstance: AxiosInstance;

    private constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            // timeout: 5000,
            headers: { 'Content-Type': 'application/json' },
        });
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
}

export default ApiService;
