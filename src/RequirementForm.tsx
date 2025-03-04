import React from "react";
import { Item } from "./store";

const RequirementForm = () => {
  const { payload } = Item.use();
  return (
    <div>
      {payload?.title} {payload?.manager} {payload?.status}
    </div>
  );
};

export default RequirementForm;
