import React from "react";
import FormGrid from "./components/FormGrid";

const fieldConfig = [
  {
    name: "autocomplete1",
    type: "autocomplete",
    options: ["Auto Option 1", "Auto Option 2", "Auto Option 3"],
    initialValue: "",
  },
  {
    name: "autocomplete2",
    type: "autocomplete",
    options: ["Auto Option A", "Auto Option B", "Auto Option C"],
    initialValue: "",
  },
  {
    name: "multiSelect",
    type: "multiSelect",
    options: ["Multi 1", "Multi 2", "Multi 3"],
    initialValue: [],
    multiple: true,
  },
  { name: "numberInput", type: "number", initialValue: 1 },
  { name: "coordinateInput", type: "text", placeholder: "(1).(2)A3.(4)B" },
];

const fieldConfig2 = [
  {
    name: "autocomplete1",
    type: "autocomplete",
    options: ["Auto Option 1", "Auto Option 2", "Auto Option 3"],
    initialValue: "",
  },
  {
    name: "multiSelect",
    type: "multiSelect",
    options: ["Multi 1", "Multi 2", "Multi 3"],
    initialValue: [],
    multiple: true,
  },
  { name: "numberInput", type: "number", initialValue: 1 },
  { name: "coordinateInput", type: "text", placeholder: "(1).(2)A3.(4)B" },
];

export default function App() {
  return (
    <div>
      <FormGrid fieldConfig={fieldConfig} />
      <FormGrid fieldConfig={fieldConfig2} />
    </div>
  );
}
