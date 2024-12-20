import * as React from 'react';
import { socket } from './socket';

export interface AuthContext {
  isAuthenticated: boolean;
  setUser: (username: string | null) => void;
  user: string | null;
  token: string | null;
  setToken: (token: string | null) => void;
  expires: string | null;
  setExpires: (expires: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [expires, setExpires] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, token, setToken, expires, setExpires, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = React.useContext(AuthContext);

  React.useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('expires');
    const userId = localStorage.getItem('userId');

    if (user && token && expires && userId) {
      const expiresNum = parseInt(expires, 10);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < expiresNum) {
        context?.setUser(user);
        context?.setToken(token);
        context?.setExpires(expires);
        context?.setUserId(userId);
        socket.connect();
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
        localStorage.removeItem('userId');
      }
    }
  }, [context]);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
