import React, { useState, useContext, createContext, useEffect, useCallback } from "react";

import { toast } from 'react-toastify';
import { endpoint } from "../config/endpoints";
import { axiosRequest } from "../http/axiosRequest";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
  const getUser =useCallback(
    async () => {
      try {
        const res = await axiosRequest.get(endpoint.user.me);
        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
        setLoadingUser(() => false);
      } catch (e) {
        setLoadingUser(() => false);
      }

    },
    [],
  )

    useEffect(() => {

        getUser()
    }, [])

  const signin = async (username, password, cb) => {
      try {
        return await axiosRequest.post(endpoint.user.login,

          {
            username: username,
            password: password,
          },


        ).then((res) => {
          if (res.data === 'success') {

            axiosRequest.get(endpoint.user.me).then((res) => {
              setUser(res.data);
              cb();
            });
          } else {
            toast.error('Email or Password not correct');
          }
        });
      } catch (error) {
        toast.error(error.message);
      }

    };

    const signout = cb => {
        axiosRequest.get(endpoint.user.logout).then((res) => {
          if (res.data === 'success') {
            setUser(null);
            cb();
          }
        });
    };

    return {
        user,
        loadingUser,
        signin,
        signout
    };
}

