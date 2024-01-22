"use client";

import React from "react";

import { Session } from "@ory/client";
import { frontend } from "@/lib/ory";
import axios from "axios";

interface SessionContextProps {
  data: Session | undefined;
  set: React.Dispatch<React.SetStateAction<Session | undefined>>;
  destroy: () => void;
}

export const SessionContext = React.createContext<SessionContextProps>({
  data: undefined,
  set: () => {},
  destroy: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = React.useState<Session | undefined>(undefined);

  React.useEffect(() => {
    frontend.toSession().then(({ data: session }) => {
      setData(session);
    });
  }, []);

  const destroy = React.useCallback(() => {
    frontend
      .createBrowserLogoutFlow()
      .then(({ data: flow }) => {
        return axios.get(flow.logout_url, {
          withCredentials: true,
        });
      })
      .then(() => {
        setData(undefined);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <SessionContext.Provider value={{ data, set: setData, destroy }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);
