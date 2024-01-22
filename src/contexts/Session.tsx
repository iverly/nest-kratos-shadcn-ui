"use client";

import React from "react";

import { Session } from "@ory/client";
import { frontend } from "@/lib/ory";

interface SessionContextProps {
  session: Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
}

export const SessionContext = React.createContext<SessionContextProps>({
  session: undefined,
  setSession: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = React.useState<Session | undefined>(undefined);

  React.useEffect(() => {
    frontend.toSession().then(({ data: session }) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);
