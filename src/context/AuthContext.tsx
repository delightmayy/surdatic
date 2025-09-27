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

export interface stakeData {
  amount: string;
  profit: string;
  user: string;
  active: boolean;
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

  requestOTP: () => Promise<AxiosResponse<any>>;

  addStake: (data: stakeData) => Promise<AxiosResponse<any>>;

  userStake: () => Promise<AxiosResponse<any>>;

  sumStake: () => Promise<AxiosResponse<any>>;

  userStakewithId: (id: string) => Promise<AxiosResponse<any>>;

  withdrawStake: (id: string) => Promise<AxiosResponse<any>>;

  covertSurda: (amount: number, asset: string) => Promise<AxiosResponse<any>>;

  evmAssetSurdaSwapID: (
    amount: number,
    id: string
  ) => Promise<AxiosResponse<any>>;

  walletAssetConvertID: (
    amount: number,
    id: string
  ) => Promise<AxiosResponse<any>>;

  evmAssetTransferID: (
    amount: number,
    id: string,
    to: string
  ) => Promise<AxiosResponse<any>>;

  walletAssetTransferID: (
    amount: number,
    id: string,
    to: string
  ) => Promise<AxiosResponse<any>>;

  walletTransfer: (
    amount: number,
    to: string
  ) => Promise<AxiosResponse<any>>;

  getEvmAssetID: (id: string) => Promise<AxiosResponse<any>>;

  userAssetTransactionID: (id: string) => Promise<AxiosResponse<any>>;

  getEvmAsset: () => Promise<AxiosResponse<any>>;

  getEvmWallet: () => Promise<AxiosResponse<any>>;

  getLskBalance: () => Promise<AxiosResponse<any>>;

  getSurdaRate: () => Promise<AxiosResponse<any>>;

  transferFee: () => Promise<AxiosResponse<any>>;

  userIcpAsset: () => Promise<AxiosResponse<any>>;

  userTransaction: () => Promise<AxiosResponse<any>>;

  userWallet: () => Promise<AxiosResponse<any>>;

  userIcpAssetID: (id: string) => Promise<AxiosResponse<any>>;

  userTransactionID: (id: string) => Promise<AxiosResponse<any>>;

  verifyLskTransaction: (tx: string) => Promise<AxiosResponse<any>>;

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

  const addStake = async (data: stakeData): Promise<AxiosResponse<any>> => {
    return api.post("/wallet/add_staken", data);
  };

  const userStake = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/user_stake");
  };

  const userStakewithId = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/wallet/user_stake/${id}`);
  };

  const sumStake = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/user_stake_sum");
  };

  const withdrawStake = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/wallet/withdraw_stake/${id}`);
  };

  const covertSurda = async (
    amount: number,
    asset: string
  ): Promise<AxiosResponse<any>> => {
    return api.post("/wallet/convert_surda", { amount, asset });
  };

  const evmAssetSurdaSwapID = async (
    amount: number,
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/wallet/evm_asset_surda_swap/${id}`, { amount });
  };

  const evmAssetTransferID = async (
    amount: number,
    id: string,
    to: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/wallet/evm_asset_transfer/${id}`, { to, amount });
  };

  const getEvmAssetID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/wallet/get_evm_asset/${id}`);
  };

  const getEvmAsset = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/get_evm_assets");
  };

  const getEvmWallet = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/get_evm_wallet");
  };

  const getLskBalance = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/get_lsk_balance");
  };

  const getSurdaRate = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/get_surda_rate");
  };
  const transferFee = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/transfer_fee");
  };

  const userAssetTransactionID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/wallet/user_asset_transaction/${id}`);
  };

  const userIcpAssetID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/wallet/user_icp_assets/${id}`);
  };

  const userTransactionID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/wallet/user_transaction/${id}`);
  };

  const userIcpAsset = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/user_icp_assets");
  };

  const userTransaction = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/user_transaction");
  };

  const userWallet = async (): Promise<AxiosResponse<any>> => {
    return api.get("/wallet/user_wallet");
  };

  const verifyLskTransaction = async (
    tx: string
  ): Promise<AxiosResponse<any>> => {
    return api.post("/wallet/verify_lsk_transaction", tx);
  };

  const walletAssetConvertID = async (
    amount: number,
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/wallet/wallet_asset_convert/${id}`, { amount });
  };

  const walletAssetTransferID = async (
    amount: number,
    id: string,
    to: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/wallet/wallet_asset_transfer/${id}`, { to, amount });
  };

  const walletTransfer = async (
    amount: number,
    to: string
  ): Promise<AxiosResponse<any>> => {
    return api.post("/wallet/wallet_transfer", { to, amount });
  };

  //////////////
   const requestOTP = async (): Promise<AxiosResponse<any>> => {
    return api.get("transactions/request_otp");
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
        addStake,
        userStake,
        userStakewithId,
        sumStake,
        withdrawStake,
        covertSurda,
        evmAssetSurdaSwapID,
        evmAssetTransferID,
        getEvmAssetID,
        getEvmAsset,
        getEvmWallet,
        getLskBalance,
        getSurdaRate,
        transferFee,
        userAssetTransactionID,
        userIcpAsset,
        userIcpAssetID,
        userTransaction,
        userTransactionID,
        userWallet,
        verifyLskTransaction,
        walletAssetConvertID,
        walletAssetTransferID,
        walletTransfer,
        requestOTP,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
