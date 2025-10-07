import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
/* import cardimg1 from "../img/card1img.png";
import cardimg2 from "../img/card2img.png"; */
import { FiLogOut, FiRepeat } from "react-icons/fi";
import { FaCheck, FaRepeat, FaXmark } from "react-icons/fa6";
import { useAuth } from "../api/useAuth";

export interface Survey {
  id: string;
  title: string;
  description: string;
  image: string;
  fromDate: string; // could refine to Date if you parse it
  toDate: string;
  visibility: "public" | "private"; // refine if only 2 values
  respondents: number;
  validation: boolean;
  validators: number;
  totalQuestions: number;
  cost: string;
  min_age: number;
  max_age: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" | "VALIDATED";
  created_at: string;
  updated_at: string;
  owner: string;
  genders: number[];
  locations: number[];
  professions: number[];
  type?: "Video" | "Form";
}

export interface Stat {
  title: string;
  value: number;
  icon: ReactNode;
  iconBg: string;
  sendData?: Survey[];
}

export interface Marketplace {
  id: string;
  survey: string;
  user: string;
  title: string;
  description: string;
  image: string;
  mode: string;
  price: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | string;
  created_at: string;
  updated_at: string;
  type?: string;
}

export interface Video {
  id: string;
  title: string;
  frontImg: string;
  date: string;
  reward: number;
  duration: string;
  videoUrl: string;
  questions: number;
  description: string;
  keyPoints: string[];
}



interface DataContextType {
  overveiwTab: string;
  setOverveiwTab: (value: string) => void;
  surveyList: Survey[];
  userSurveyList: Survey[];
  answeredSurveyList: Survey[];
  approvedSurveyListState: Survey[];
  loading: boolean;
  togleshow: boolean;
  SetTogleShow: Dispatch<SetStateAction<boolean>>;
  targetDate: Date;
  totalEarnings: number;
  createdStats: Stat[];
  validatedStats: Stat[];
  participatedStats: Stat[];

  surveyVideoValidated: Video[];
  surveyVideoParticipated: Video[];
  surveyVideoCreated: Video[];
  marketPlaceData: Marketplace[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [overveiwTab, setOverveiwTab] = useState("created");
  const [togleshow, SetTogleShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const targetDate = new Date("2025-09-30T00:00:00Z");
  const totalEarnings = 20546;

  const {
    surveylist,
    answeredSurveylist,
    userSurveylist,
    validatorStatus,
    getVerifyStatus,
    pendingSurveylist,
    disputedResponse,

    approvedSurveyList ,
    marketItems,

    /* userStakeSum */
  } = useAuth();

  //general availlable list
  const [surveyList, setSurveyList] = useState<Survey[]>([]);

  //participated survey / responses survey
  const [answeredSurveyList, setAnsweredSurveyList] = useState<Survey[]>([]);

  //surveyCreated /my survery
  const [userSurveyList, setUserSurveyList] = useState<Survey[]>([]);

  // status
  const [/* validatorState */, setValidatorState] = useState<any | null>(null);
  const [/* verifyStatus */, setVerifyStatus] = useState<any | null>(null);

  //validated / validation
  const [pendingSurveyList, setPendingSurveyList] = useState<Survey[]>([]);
  const [disputedResponseList, setDisputedResponseList] = useState<Survey[]>(
    []
  );

  //validated / validation
  const [approvedSurveyListState, setApprovedSurveyListState] = useState<
    Survey[]
  >([]);

  //marketplace Data
  const [marketPlaceData, setMarketPlaceData] = useState<Marketplace[]>([]);

  const refreshContent = async () => {
    setLoading(true);

    try {
      const res = await surveylist();
      setSurveyList(res.data || []);
    } catch (err) {
      console.error(" Error fetching surveyList:", err);
      setSurveyList([]);
    }

    try {
      const res = await answeredSurveylist();
      setAnsweredSurveyList(res.data || []);
      console.log("answered", res.data);
    } catch (err) {
      console.error("❌ Error fetching answeredSurveyList:", err);
      setAnsweredSurveyList([]);
    }

    try {
      const res = await userSurveylist();
      setUserSurveyList(res.data || []);
      console.log("userlist", res.data);
    } catch (err) {
      console.error("❌ Error fetching userSurveyList:", err);
      setUserSurveyList([]);
    }

    try {
      const res = await validatorStatus();
      setValidatorState(res.data || null);
      console.log("validated status", res.data);
    } catch (err) {
      console.error("❌ Error fetching validatorStatus:", err);
      setValidatorState(null);
    }

    try {
      const res = await getVerifyStatus();
      setVerifyStatus(res.data || null);
      console.log("verified status", res.data);
    } catch (err) {
      console.error("❌ Error fetching verifyStatus:", err);
      setVerifyStatus(null);
    }

    try {
      const res = await pendingSurveylist();
      setPendingSurveyList(res.data || []);
      console.log("pending survey", res.data);
    } catch (err) {
      console.error("❌ Error fetching pendingSurveyList:", err);
      setPendingSurveyList([]);
    }

    try {
      const res = await disputedResponse();
      setDisputedResponseList(res.data || []);
      console.log("disputed response", res.data);
    } catch (err) {
      console.error("❌ Error fetching disputedResponse:", err);
      setDisputedResponseList([]);
    }

    try {
      const res = await approvedSurveyList();
      setApprovedSurveyListState(res.data || []);
      console.log("approved surveylist", res.data);
    } catch (err) {
      console.error("❌ Error fetching approvedSurveyList:", err);
      setApprovedSurveyListState([]);
    }

    try {
      const res = await marketItems();
      setMarketPlaceData(res.data || []);
      console.log("marketplace data", res.data);
    } catch (err) {
      console.error("❌ Error fetching approvedSurveyList:", err);
      setApprovedSurveyListState([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshContent();
  }, []);

  const createdStats = [
    {
      title: "Ongoing Survey",
      value: userSurveyList.filter((x) => x.status === "VALIDATED").length || 0,
      icon: <FiLogOut size={16} />,
      iconBg: "bg-emerald-500",
      sendData: userSurveyList.filter((x) => x.status === "VALIDATED"),
    },
    {
      title: "Pending Approval and Validation",
      value: userSurveyList.filter((x) => x.status === "PENDING").length || 0,
      icon: <FaRepeat size={16} />,
      iconBg: " bg-amber-400",
      sendData: userSurveyList.filter((x) => x.status === "PENDING"),
    },
    {
      title: "Completed Survey",
      value: userSurveyList.filter((x) => x.status === "COMPLETED").length || 0,
      icon: <FaCheck size={16} />,
      iconBg: "bg-emerald-600",
      sendData: userSurveyList.filter((x) => x.status === "COMPLETED"),
    },
  ];
  const validatedStats = [
    {
      title: "Under Review",
      value: pendingSurveyList.length,
      icon: <FiRepeat size={16} />,
      iconBg: "bg-amber-400",
      sendData: pendingSurveyList,
    },
    {
      title: "Approved Survey",
      value: approvedSurveyListState.length || 0,
      icon: <FaCheck size={16} />,
      iconBg: "bg-emerald-500",
      sendData: approvedSurveyListState,
    },
    {
      title: "Disputed Survey",
      value: disputedResponseList.length || 0,
      icon: <FaXmark size={16} />,
      iconBg: "bg-rose-600",
      sendData: disputedResponseList,
    },
  ];
  const participatedStats = [
    {
      title: "Pending Survey",
      value:
        answeredSurveyList.filter((x) => x.status === "VALIDATED").length || 0,
      icon: <FiRepeat size={16} />,
      iconBg: "bg-amber-400",
      sendData: answeredSurveyList.filter((x) => x.status === "VALIDATED"),
    },
    {
      title: "Completed Survey",
      value:
        answeredSurveyList.filter((x) => x.status === "COMPLETED").length || 0,
      icon: <FaCheck size={16} />,
      iconBg: "bg-emerald-500",
      sendData: answeredSurveyList.filter((x) => x.status === "COMPLETED"),
    },
    {
      title: "Rejected Survey",
      value:
        answeredSurveyList.filter((x) => x.status === "REJECTED").length || 0,
      icon: <FaXmark size={16} />,
      iconBg: "bg-rose-600",
      sendData: answeredSurveyList.filter((x) => x.status === "REJECTED"),
    },
  ];

  const surveyVideoCreated = [
    {
      id: "video-001",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=11",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "video-002",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=12",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "video-003",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=13",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "video-004",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=14",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
  ];

  const surveyVideoParticipated = [
    {
      id: "videopart-001",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=1",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "videopart-002",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=2",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "videopart-003",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=3",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "videopart-004",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=4",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
  ];

  const surveyVideoValidated = [
    {
      id: "videoval-001",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=5",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "videoval-002",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=6",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "videoval-003",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=7",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "videoval-004",
      title: "Examining Safety Compliance...",
      frontImg: "https://picsum.photos/400/300?random=8",
      date: "2025-09-08",
      reward: 100,
      duration: "15 Mins",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
  ];

 /*  const marketPlaceData = [
    {
      id: "s1",
      title:
        "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
      date: "2025-09-07",
      type: "Validated",
      reward: 100,
      status: "Validated",
      frontImg: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "s2",
      title:
        "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
      date: "2025-09-09",
      type: "Video",
      reward: 120,
      status: "Validated",
      frontImg: "https://images.unsplash.com/photo-1560264280-88b68371db39",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "s3",
      title:
        "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
      date: "2025-09-10",
      type: "Validated",
      reward: 80,
      status: "Validated",
      frontImg: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "s4",
      title:
        "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
      date: "2025-09-03",
      type: "Video",
      reward: 90,
      status: "Validated",
      frontImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "s5",
      title:
        "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
      date: "2025-09-01",
      type: "Validated",
      reward: 95,
      status: "Validated",
      frontImg: "https://images.unsplash.com/photo-1560264280-88b68371db39",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
    {
      id: "s6",
      title:
        "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
      date: "2025-09-08",
      type: "Video",
      reward: 110,
      status: "Validated",
      frontImg: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      questions: 10,
      description: "Video-based survey focused on safety compliance.",
      keyPoints: ["Video Evidence", "Policy Insights", "Training Gaps"],
    },
  ]; */

  return (
    <DataContext.Provider
      value={{
        overveiwTab,
        setOverveiwTab,
        surveyList,
        userSurveyList,
        answeredSurveyList,
        approvedSurveyListState,
        togleshow,
        SetTogleShow,
        targetDate,
        totalEarnings,
        createdStats,
        loading,
        validatedStats,
        participatedStats,
        marketPlaceData,

      
        surveyVideoCreated,
        surveyVideoParticipated,
        surveyVideoValidated,
        
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
