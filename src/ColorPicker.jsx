function ColorPicker({ color, setColor }) {
    return (
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Pick a Color:
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
        />
        <p className="mt-2 text-gray-600 font-semibold">Selected Color: {color}</p>
      </div>
    );
  }
  
  export default ColorPicker;
  