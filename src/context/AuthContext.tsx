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

  UserReadNotificationID: (id: number) => Promise<AxiosResponse<any>>;

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

  walletTransfer: (amount: number, to: string) => Promise<AxiosResponse<any>>;

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

  answeredSurveylist: () => Promise<AxiosResponse<any>>;
  approveAllSurveyRespondentID: (id: string) => Promise<AxiosResponse<any>>;
  approveSurveyDisputeID: (id: string) => Promise<AxiosResponse<any>>;
  approveSurveyRespondentID: (id: string) => Promise<AxiosResponse<any>>;
  approvedSurveyList: () => Promise<AxiosResponse<any>>;
  buyMarketItemID: (id: string) => Promise<AxiosResponse<any>>;
  createMarketItemID: (survey_id: string) => Promise<AxiosResponse<any>>;
  createSurveyApprovalID: (id: string) => Promise<AxiosResponse<any>>;
  disputedResponse: () => Promise<AxiosResponse<any>>;
  disputedResponseDetail: () => Promise<AxiosResponse<any>>;
  downloadCollectionItemID: (id: string) => Promise<AxiosResponse<any>>;
  expiredSurveylist: () => Promise<AxiosResponse<any>>;
  genderList: () => Promise<AxiosResponse<any>>;
  generateAiQuestion: () => Promise<AxiosResponse<any>>;
  generateReportID: (id: string) => Promise<AxiosResponse<any>>;
  getCollectionItemID: (id: string) => Promise<AxiosResponse<any>>;
  getMarketItemID: (id: string) => Promise<AxiosResponse<any>>;
  getUsersCollection: () => Promise<AxiosResponse<any>>;
  locationList: () => Promise<AxiosResponse<any>>;
  markSurveyCompletionID: (id: string) => Promise<AxiosResponse<any>>;
  marketItems: () => Promise<AxiosResponse<any>>;
  pendingSurveylist: () => Promise<AxiosResponse<any>>;
  professionList: () => Promise<AxiosResponse<any>>;
  publicMarketItems: () => Promise<AxiosResponse<any>>;
  publicSurveyDetailID: (id: string) => Promise<AxiosResponse<any>>;
  publicSurveylist: () => Promise<AxiosResponse<any>>;
  rejectSurveyDisputeID: (id: string) => Promise<AxiosResponse<any>>;
  rejectSurveyRespondentID: (id: string) => Promise<AxiosResponse<any>>;
  responseCommentID: (id: string) => Promise<AxiosResponse<any>>;
  surveyConfig: () => Promise<AxiosResponse<any>>;
  surveyDetailID: (id: string) => Promise<AxiosResponse<any>>;
  surveyDownloadID: (id: string) => Promise<AxiosResponse<any>>;

  surveyMarketItemID: (survey_id: string) => Promise<AxiosResponse<any>>;
  surveyRespondentID: (id: string) => Promise<AxiosResponse<any>>;
  surveyRespondentDetailID: (id: string) => Promise<AxiosResponse<any>>;
  surveyResponseID: (id: string) => Promise<AxiosResponse<any>>;
  surveylist: () => Promise<AxiosResponse<any>>;
  Psurveylist: () => Promise<AxiosResponse<any>>;
  userSurveylist: () => Promise<AxiosResponse<any>>;

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
  const UserReadNotificationID = async (
    id: number
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/auth/user_read_notification/${id}`);
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

  const answeredSurveylist = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/answered_surveylist");
  };

  const approveAllSurveyRespondentID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/approve_all_survey_respondent/${id}`);
  };

  const approveSurveyDisputeID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/survey/approve_survey_dispute/${id}`);
  };

  const approveSurveyRespondentID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/approve_survey_respondent/${id}`);
  };

  const approvedSurveyList = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/approved_survey_list");
  };

  const buyMarketItemID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/buy_market_item/${id}`);
  };

  const createMarketItemID = async (
    survey_id: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/survey/create_market_item/${survey_id}`);
  };

  const createSurveyApprovalID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/survey/create_survey_approval/${id}`);
  };

  const disputedResponse = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/disputed_response");
  };

  const disputedResponseDetail = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/disputed_response_detail");
  };

  const downloadCollectionItemID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/download_collection_item/${id}`);
  };

  const expiredSurveylist = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/expired_surveylist");
  };

  const genderList = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/gender_list");
  };

  const generateAiQuestion = async (): Promise<AxiosResponse<any>> => {
    return api.post("/survey/generate_ai_question");
  };

  const generateReportID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/generate_report/${id}`);
  };

  const getCollectionItemID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/get_collection_item/${id}`);
  };

  const getMarketItemID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/get_market_item/${id}`);
  };

  const getUsersCollection = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/get_users_collection");
  };

  const locationList = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/location_list");
  };

  const markSurveyCompletionID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/mark_survey_completion/${id}`);
  };

  const marketItems = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/market_items");
  };

  const pendingSurveylist = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/pending_surveylist");
  };

  const professionList = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/profession_list");
  };

  const publicMarketItems = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/public_market_items");
  };

  const publicSurveyDetailID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/public_survey_detail/${id}`);
  };

  const publicSurveylist = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/public_surveylist");
  };

  const rejectSurveyDisputeID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/survey/reject_survey_dispute/${id}`);
  };

  const rejectSurveyRespondentID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.post(`/survey/reject_survey_respondent/${id}`);
  };

  const responseCommentID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/response_comment/${id}`);
  };

  const surveyConfig = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/survey_config");
  };

  const surveyDetailID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/survey_detail/${id}`);
  };

  const surveyDownloadID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/survey_download/${id}`);
  };

  const surveyMarketItemID = async (
    survey_id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/survey_market_item/${survey_id}`);
  };

  const surveyRespondentID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/survey_respondent/${id}`);
  };

  const surveyRespondentDetailID = async (
    id: string
  ): Promise<AxiosResponse<any>> => {
    return api.get(`/survey/survey_respondent_detail/${id}`);
  };

  const surveyResponseID = async (id: string): Promise<AxiosResponse<any>> => {
    return api.post(`/survey/survey_response/${id}`);
  };

  const surveylist = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/surveylist");
  };

  const Psurveylist = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/surveylist");
  };

  const userSurveylist = async (): Promise<AxiosResponse<any>> => {
    return api.get("/survey/user_surveylist");
  };

  ///////////////////
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
        UserReadNotificationID,
        /////////
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
        ////////
        answeredSurveylist,
        approveAllSurveyRespondentID,
        approveSurveyDisputeID,
        approveSurveyRespondentID,
        approvedSurveyList,
        buyMarketItemID,
        createMarketItemID,
        createSurveyApprovalID,
        disputedResponse,
        disputedResponseDetail,
        downloadCollectionItemID,
        expiredSurveylist,
        genderList,
        generateAiQuestion,
        generateReportID,
        getCollectionItemID,
        getMarketItemID,
        getUsersCollection,
        locationList,
        markSurveyCompletionID,

        marketItems,
        pendingSurveylist,
        professionList,
        publicMarketItems,
        publicSurveyDetailID,
        publicSurveylist,
        rejectSurveyDisputeID,
        rejectSurveyRespondentID,
        responseCommentID,
        surveyConfig,
        surveyDetailID,
        surveyDownloadID,

        surveyMarketItemID,
        surveyRespondentID,
        surveyRespondentDetailID,
        surveyResponseID,
        surveylist,
        Psurveylist,
        userSurveylist,

        requestOTP,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
