import { createContext, useState } from "react";
import type { ReactNode } from "react";
import cardimg1 from "../img/card1img.png";
import cardimg2 from "../img/card2img.png";
import { FiLogOut, FiRepeat } from "react-icons/fi";
import { FaCheck, FaRepeat, FaXmark } from "react-icons/fa6";

export interface Stat {
  title: string;
  value: number;
  icon: ReactNode; // Since you're rendering JSX
  iconBg: string;
}
export interface Survey {
  id: string;
  title: string;
  frontImg: string;
  date: string;
  reward: number;
  questions: number;
  description: string;
  keyPoints: string[];
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

export interface MarketPlaceData {
  id: string;
  frontImg: string;
  type: string;
  title: string;
  status: string;
  reward: number;
  date: string;
  questions: number;
  description: string;
  keyPoints: string[];
}

interface DataContextType {
  overveiwTab: string;
  setOverveiwTab: (value: string) => void;
  UserSigned: boolean;
  setUserSigned: (value: boolean) => void;
  targetDate: Date;
  totalEarnings: number;
  createdStats: Stat[];
  validatedStats: Stat[];
  participatedStats: Stat[];

  surveyCreated: Survey[];
  surveyValidated: Survey[];
  surveyParticipated: Survey[];

  surveyVideoValidated: Video[];
  surveyVideoParticipated: Video[];
  surveyVideoCreated: Video[];
  marketPlaceData: MarketPlaceData[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [overveiwTab, setOverveiwTab] = useState("created");
  const [UserSigned, setUserSigned] = useState(true);

  const targetDate = new Date("2025-09-30T00:00:00Z");
  const totalEarnings = 20546;

  const surveyCreated = [
    {
      id: "safety-001",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "safety-002",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "safety-003",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "safety-004",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "safety-005",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "safety-006",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "safety-007",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
  ];

  const surveyParticipated = [
    {
      id: "participate-001",
      title: "Examining Safety Compliance...",
      frontImg: cardimg2,
      date: "2025-09-08",
      reward: 75,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "participate-002",
      title: "Examining Safety Compliance...",
      frontImg: cardimg2,
      date: "2025-09-08",
      reward: 75,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "participate-003",
      title: "Examining Safety Compliance...",
      frontImg: cardimg2,
      date: "2025-09-08",
      reward: 75,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "participate-004",
      title: "Examining Safety Compliance...",
      frontImg: cardimg2,
      date: "2025-09-08",
      reward: 75,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "participate-005",
      title: "Examining Safety Compliance...",
      frontImg: cardimg2,
      date: "2025-09-08",
      reward: 75,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "participate-006",
      title: "Examining Safety Compliance...",
      frontImg: cardimg2,
      date: "2025-09-08",
      reward: 75,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
  ];

  const surveyValidated = [
    {
      id: "validated-001",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "validated-002",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "validated-003",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "validated-004",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "validated-005",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
    {
      id: "validated-006",
      title: "Examining Safety Compliance...",
      frontImg: cardimg1,
      date: "2025-09-08",
      reward: 50,
      questions: 10,
      description:
        "This study observes how effectively senior managers in Nigerian organizations follow safety compliance directives...",
      keyPoints: [
        "Data & Documents",
        "Organizational Culture",
        "HR Frameworks",
      ],
    },
  ];

  const createdStats = [
    {
      title: "Ongoing Survey",
      value: 0,
      icon: <FiLogOut size={16} />,
      iconBg: "bg-amber-400",
    },
    {
      title: "Pending Approval and Validation",
      value: 18,
      icon: <FaRepeat size={16} />,
      iconBg: "bg-emerald-500",
    },
    {
      title: "Completed Survey",
      value: 18,
      icon: <FaCheck size={16} />,
      iconBg: "bg-rose-600",
    },
  ];
  const validatedStats = [
    {
      title: "Under Review",
      value: 6,
      icon: <FiRepeat size={16} />,
      iconBg: "bg-amber-400",
    },
    {
      title: "Approved Survey",
      value: 18,
      icon: <FaCheck size={16} />,
      iconBg: "bg-emerald-500",
    },
    {
      title: "Rejected Survey",
      value: 2,
      icon: <FaXmark size={16} />,
      iconBg: "bg-rose-600",
    },
  ];
  const participatedStats = [
    {
      title: "Pending Survey",
      value: 6,
      icon: <FiRepeat size={16} />,
      iconBg: "bg-amber-400",
    },
    {
      title: "Completed Survey",
      value: 18,
      icon: <FaCheck size={16} />,
      iconBg: "bg-emerald-500",
    },
    {
      title: "Rejected Survey",
      value: 2,
      icon: <FaXmark size={16} />,
      iconBg: "bg-rose-600",
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

  const marketPlaceData = [
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
  ];

  return (
    <DataContext.Provider
      value={{
        overveiwTab,
        setOverveiwTab,
        UserSigned,
        setUserSigned,
        targetDate,
        totalEarnings,
        createdStats,
        surveyCreated,
        surveyParticipated,
        surveyValidated,
        validatedStats,
        participatedStats,
        surveyVideoCreated,
        surveyVideoParticipated,
        surveyVideoValidated,
        marketPlaceData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
