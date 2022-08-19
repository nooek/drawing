import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies"
import axios from "axios";
import Router from "next/router";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  id: string;
}

type LoginData = {
  email: string;
  password: string;
}

interface ErrorMessage {
  message: string
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  login: (data: LoginData) => Promise<string | undefined>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

type AxiosLoginResponseType = {
  token: string;
  responseData: User;
}

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({ name: "", email: "", id: "" })

  const isAuthenticated = !!user;

  const checkRedirect = (): boolean => {
    const path = window.location.pathname
    console.log(path)
    if (path === "/register" || path === "/login") return false
    return true
  }

  useEffect(() => {
    const { 'drawingauth.token': token } = parseCookies()
    if (token) {
      api.get("/user/auth").then((res) => {
        const redirect = checkRedirect()
        console.log(res.data)
        if (res.data.returnData.email === null && redirect) return Router.push("/login")
        setUser(res.data.returnData)
      }).catch(e => console.log(e))
    }
  }, [])

  const login = async ({ email, password }: LoginData): Promise<string | undefined> => {
    try {
      const { data } = await api.post("/user/login", {
        loginInfo: {
          email: email,
          password: password
        }
      }) as { data: AxiosLoginResponseType }
      
      setCookie(undefined, 'drawingauth.token', data.token, {
        maxAge: 60 * 60 * 72 // 3 days
      })

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`

      setUser(data.responseData)

      Router.push("/")
    } catch(err: any) {
      console.log(err)
      if (err.response) return err.response.data.message
      return "Some error happened"
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, login }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
