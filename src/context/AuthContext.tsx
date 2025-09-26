import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import api from "../api/api";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dob: string | null;
  country: string | null;
  phone: string | null;
  address: string | null;
  occupation: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
  user: string;
  gender: string | null;
  profession: string | null;
  city: string | null;
}
export interface ProfileData {
  first_name: FormDataEntryValue | null;
  last_name: FormDataEntryValue | null;
  dob: FormDataEntryValue | null;
  country: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  address: FormDataEntryValue | null;
  occupation: FormDataEntryValue | null;
  bio: FormDataEntryValue | null;
  gender: FormDataEntryValue | null;
  profession: FormDataEntryValue | null;
  city: FormDataEntryValue | null;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user: string; // UUID
}

interface AuthContextType {
  user: UserProfile | null;
  code: string;
  refStatus: boolean;
  token: string | null;

  login: (email: string, password: string) => Promise<void>;

  forgetPassword: (email: string) => Promise<void>;

  becomeValidator: () => Promise<void>;

  faceVerify: (imageData: string) => Promise<AxiosResponse<any>>;

  updateProfile: (data: ProfileData) => Promise<AxiosResponse<any>>;

  notifyUser: () => Promise<AxiosResponse<any>>;

  resetPassword: (
    email: string,
    new_password: string,
    otp: string
  ) => Promise<void>;

  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [code, setCode] = useState("");
  const [refStatus, setRefStatus] = useState(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUserProfile();
      refferalCode();
      refferalStatus();
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data?.access);
    setUser(res.data.user);
  };

  const forgetPassword = async (email: string) => {
    const response = await api.post("/auth/reset_password", { email });
    response.data && navigate("/reset-password");
  };

  const resetPassword = async (
    email: string,
    new_password: string,
    otp: string
  ) => {
    const response = await api.post("/auth/confirm_reset_password", {
      email,
      new_password,
      otp,
    });
    response.data && navigate("/reset-success");
  };

  const becomeValidator = async () => {
    await api.get("/auth/become_validator");
  };

  const refferalCode = async () => {
    try {
      const response = await api.get("auth/get_referral_code");
      if (response.data) {
        setCode(response.data.code);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  const refferalStatus = async () => {
    try {
      const response = await api.get("auth/get_verify_status");
      if (response.data) {
        setRefStatus(response.data.status);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  /*  const refferalCount = async () => {
    try {
      const response = await api.get("auth/get_referral_count");
      if (response.data) {
        // setCode(response.data.code);
      }
    } catch (err: any) {
      console.error(err);
    }
  }; */

  const faceVerify = async (imageData: string): Promise<AxiosResponse<any>> => {
    return api.post("/auth/face-verify", { image: imageData });
  };

  const updateProfile = async (
    data: ProfileData
  ): Promise<AxiosResponse<any>> => {
    return api.put("/auth/profile", { data });
  };

  const notifyUser = async (): Promise<AxiosResponse<any>> => {
    return api.get("/auth/user_notification");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        code,
        refStatus,
        token,
        login,
        becomeValidator,
        forgetPassword,
        resetPassword,
        faceVerify,
        updateProfile,
        notifyUser,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
