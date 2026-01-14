import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const [userInfo, setUserInfo] = useState(userInfoFromStorage);

  const login = (data) => {
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
