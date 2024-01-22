"use client";

import React from "react";

import { Session } from "@ory/client";
import { frontend } from "@/lib/ory";

interface SessionContextProps {
  data: Session | undefined;
  set: React.Dispatch<React.SetStateAction<Session | undefined>>;
}

export const SessionContext = React.createContext<SessionContextProps>({
  data: undefined,
  set: () => {},
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

  return (
    <SessionContext.Provider value={{ data, set: setData }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);
