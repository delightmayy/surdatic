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

interface DataContextType {
  overveiwTab: string;
  setOverveiwTab: (value: string) => void;
  targetDate: Date;
  totalEarnings: number;
  createdStats: Stat[];
  validatedStats: Stat[];
  participatedStats: Stat[];

  surveyCreated: Survey[];
  surveyValidated: Survey[];
  surveyParticipated: Survey[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [overveiwTab, setOverveiwTab] = useState("created");

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

  return (
    <DataContext.Provider
      value={{
        overveiwTab,
        setOverveiwTab,
        targetDate,
        totalEarnings,
        createdStats,
        surveyCreated,
        surveyParticipated,
        surveyValidated,
        validatedStats,
        participatedStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
