"use client";
// ConversationProvider: manages the state of the conversation

// - isConversationStarted
// - setIsConversationStarted

import { ConverstaionContextType } from "@/types/ContextTypes";
import React, { useState, useContext, createContext, ReactNode } from "react";

// create new context (type은 다 끝나고 정리)
const ConversationContext = createContext<ConverstaionContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export function ConversationProvider({ children }: Props) {
  // define states
  const [isConversationStarted, setIsConversationStarted] = useState(false);

  // define what we are going to manage globally (as object)
  const contextValue: ConverstaionContextType = {
    isConversationStarted,
    setIsConversationStarted,
  };

  // return Provider, we will wrap component with this provider
  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversationContext() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConverstaionContext must be used within a ConverstaionProvider"
    );
  }
  return context;
}
