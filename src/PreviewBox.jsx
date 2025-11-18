function PreviewBox({ color }) {
    return (
      <div className="w-full max-h-full h-32 rounded-2xl border border-gray-300 shadow-md"
           style={{ backgroundColor: color }}
      ></div>
    );
  }
  
  export default PreviewBox;
  