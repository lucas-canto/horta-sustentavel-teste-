import { createContext } from "react"

interface AuthContextType {
  userId:number
  login:(userId: number, token: string) => void
  logout:()=>void
  token?:string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)