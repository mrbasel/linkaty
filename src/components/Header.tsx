import React from "react";
import { StatusBar } from "react-native";
import { Appbar } from "react-native-paper";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <>
      <StatusBar />
      <Appbar.Header elevated>{children}</Appbar.Header>
    </>
  );
}
