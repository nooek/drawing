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
  user: User;
  login: (data: LoginData) => Promise<string>
}

type AxiosLoginResponseType = {
  token: string;
  responseData: User;
}

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({ name: "", email: "" })

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
        console.log(redirect)
        if (res.data.returnData.email === null && redirect) return Router.push("/login")
        setUser(res.data.returnData)
      }).catch(e => console.log(e))
    }
  }, [])

  console.log(user)

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
      
      await setUser(data.responseData)

      console.log(user !== null)

      if (user !== undefined) Router.push("/")
  
      return ""
    }catch(err: any) {
      console.log(err)
      if (err.response) return err.response.data.message
      return "Some error happened"
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
