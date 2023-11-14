import React from "react";
import { Heading } from "../../components/Heading";
import { Route, Routes } from "react-router-dom";
import { ReserveForm } from "../../views/ReserveForm/ReserveForm";

export const ReserveFormLayout = () => {
  return (
    <>
      <Heading showPartners={false}/>
      <Routes>
        <Route path="/:b64id" element={<ReserveForm/>}/>
      </Routes>
    </>
  )
}