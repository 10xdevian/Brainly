import React from "react";
import Button from "./components/ui/Button";
import Share from "./components/ui/icon/Share";

function App() {
  return (
    <div>
      <h1 className="text-red-500">hello</h1>
      <Button title="Click me" variant="primary" size="sm"  startIcon={<Share size="sm"/>} endIcon={<Share size="sm"/>}/>
    </div>
  );
}

export default App;
