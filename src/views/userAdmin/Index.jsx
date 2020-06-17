import React from "react";
import { Link, useParams } from "react-router-dom";

const Index = () => {
  let { id } = useParams();
  return (
    <div>
      <h1 className="">user admin</h1>
    </div>
  );
};

export default Index;
