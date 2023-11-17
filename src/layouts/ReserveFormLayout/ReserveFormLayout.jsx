import React from "react";
import { Heading } from "../../components/Heading";
import { Route, Routes } from "react-router-dom";
import { TattologForm } from "../../views/TattoologForm/TattoologForm";

export const ReserveFormLayout = () => {
  return (
    <>
      <Heading showPartners={false} />
      <Routes>
        <Route path="/:b64id" element={<TattologForm />} />
      </Routes>
    </>
  );
};
