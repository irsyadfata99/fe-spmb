// src/lib/api/client.ts

import { ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Terjadi kesalahan",
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Terjadi kesalahan jaringan",
      };
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    return this.request<T>(endpoint + queryString, {
      method: "GET",
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }

  async uploadFile<T>(
    endpoint: string,
    file: File,
    fieldName: string = "file"
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Gagal mengupload file",
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: "Gagal mengupload file",
      };
    }
  }
}

export const apiClient = new ApiClient(API_URL);

export const authApi = {
  login: async (username: string, password: string) => {
    return apiClient.post("/auth/login", { username, password });
  },

  logout: async () => {
    apiClient.clearToken();
    return { success: true };
  },

  getCurrentUser: async () => {
    return apiClient.get("/auth/me");
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    return apiClient.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
  },
};

export const registrationApi = {
  search: async (nomorRegistrasi: string) => {
    return apiClient.get(`/registrations/search`, { nomorRegistrasi });
  },

  create: async (data: any) => {
    return apiClient.post("/registrations", data);
  },

  getAll: async (params?: any) => {
    return apiClient.get("/registrations", params);
  },

  getById: async (id: string) => {
    return apiClient.get(`/registrations/${id}`);
  },

  update: async (id: string, data: any) => {
    return apiClient.put(`/registrations/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/registrations/${id}`);
  },

  updateStatus: async (id: string, status: string) => {
    return apiClient.put(`/registrations/${id}/status`, { status });
  },

  exportToExcel: async (params?: any) => {
    return apiClient.get("/registrations/export", params);
  },

  downloadFiles: async (ids: string[]) => {
    return apiClient.post("/registrations/download-files", { ids });
  },
};

export const formsApi = {
  getActive: async () => {
    return apiClient.get("/forms/active");
  },

  getAll: async () => {
    return apiClient.get("/forms");
  },

  getById: async (id: string) => {
    return apiClient.get(`/forms/${id}`);
  },

  create: async (data: any) => {
    return apiClient.post("/forms", data);
  },

  update: async (id: string, data: any) => {
    return apiClient.put(`/forms/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/forms/${id}`);
  },

  setActive: async (id: string) => {
    return apiClient.post(`/forms/${id}/activate`);
  },
};

export const settingsApi = {
  getSchoolInfo: async () => {
    return apiClient.get("/settings/school");
  },

  updateSchoolInfo: async (data: any) => {
    return apiClient.put("/settings/school", data);
  },

  getGelombang: async () => {
    return apiClient.get("/settings/gelombang");
  },

  createGelombang: async (data: any) => {
    return apiClient.post("/settings/gelombang", data);
  },

  updateGelombang: async (id: string, data: any) => {
    return apiClient.put(`/settings/gelombang/${id}`, data);
  },

  deleteGelombang: async (id: string) => {
    return apiClient.delete(`/settings/gelombang/${id}`);
  },

  getRegistrationFormat: async () => {
    return apiClient.get("/settings/registration-format");
  },

  updateRegistrationFormat: async (data: any) => {
    return apiClient.put("/settings/registration-format", data);
  },

  getPaymentSchemes: async () => {
    return apiClient.get("/settings/payment-schemes");
  },

  createPaymentScheme: async (data: any) => {
    return apiClient.post("/settings/payment-schemes", data);
  },

  updatePaymentScheme: async (id: string, data: any) => {
    return apiClient.put(`/settings/payment-schemes/${id}`, data);
  },

  deletePaymentScheme: async (id: string) => {
    return apiClient.delete(`/settings/payment-schemes/${id}`);
  },

  uploadLogo: async (file: File) => {
    return apiClient.uploadFile("/settings/logo", file, "logo");
  },
};

export const statisticsApi = {
  getDashboard: async () => {
    return apiClient.get("/statistics/dashboard");
  },

  getRegistrationStats: async (params?: any) => {
    return apiClient.get("/statistics/registrations", params);
  },
};
