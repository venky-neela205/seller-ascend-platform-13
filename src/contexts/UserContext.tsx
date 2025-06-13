
import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "sys-admin" | "distributor" | "seller" | "supervisor";
export type SellerType = "top-channel" | "small-channel" | "zonal-channel";
export type Belt = "white" | "green" | "black";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  sellerType?: SellerType;
  belt?: Belt;
  points: number;
  completedModules: string[];
  assignedTrainer?: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Admin",
      email: "admin@company.com",
      role: "sys-admin",
      points: 0,
      completedModules: [],
    },
    {
      id: "2",
      name: "Sarah Trainer",
      email: "trainer@company.com",
      role: "supervisor",
      points: 0,
      completedModules: [],
    },
    {
      id: "3",
      name: "Mike Seller",
      email: "seller@company.com",
      role: "seller",
      sellerType: "top-channel",
      belt: "white",
      points: 250,
      completedModules: ["mod-1", "mod-2"],
      assignedTrainer: "2",
    },
    {
      id: "4",
      name: "Lisa Distributor",
      email: "distributor@company.com",
      role: "distributor",
      points: 0,
      completedModules: [],
    },
  ]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
