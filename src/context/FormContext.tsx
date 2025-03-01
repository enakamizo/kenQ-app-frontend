"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext({}); // ← null ではなく `{}` に変更！

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    background: "",
    researchField: "",
    researcherLevel: "",
    deadline: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
