import React, { createContext, useContext, useReducer } from "react";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ reducer, initialState, children }) => (
  <ProfileContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ProfileContext.Provider>
);

export const useProfileContext = () => useContext(ProfileContext);
