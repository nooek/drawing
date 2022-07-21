import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies"
import axios from "axios";
import Router from "next/router";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
}

type LoginData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<string>
}

type AxiosLoginResponseType = {
  token: string;
  responseData: User;
}

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'drawingauth.token': token } = parseCookies()

    if (token) {
      api.get("/user/auth").then((res) => {
        console.log(res)
      }).catch(e => console.log(e))
    }
  }, [])

  const login = async ({ email, password }: LoginData): Promise<string> => {
    try {
      const { data } = await api.post("/user/login", {
        loginInfo: {
          email: email,
          password: password
        }
      }) as { data: AxiosLoginResponseType }
      
      console.log(data)

      setCookie(undefined, 'drawingauth.token', data.token, {
        maxAge: 60 * 60 * 72 // 3 days
      })

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`
      
      setUser(data.responseData)

      Router.push("/register")
      return ""
    }catch(err: any) {
      return err.response.data.message
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
