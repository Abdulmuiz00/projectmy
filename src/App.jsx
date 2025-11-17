import React, { useState } from "react";
import QRCodeGenerator from "./QrGenerator";




function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <QRCodeGenerator />
    </div>
  );
}
export default App;
