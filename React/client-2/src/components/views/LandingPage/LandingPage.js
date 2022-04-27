import React, { userEffect } from "react";
import axios from "axios";
import { response } from "express";

function LandingPage() {
  userEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  return <div>LandingPage 랜딩페이지입니다</div>;
}

export default LandingPage;
