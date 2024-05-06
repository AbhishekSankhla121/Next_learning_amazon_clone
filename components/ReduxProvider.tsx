"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let presistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={presistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
}
