import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import download from "downloadjs";

function QRCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [includeMargin, setIncludeMargin] = useState(false);
  const [loading, setLoading] = useState(false);
  const qrRef = useRef(null);

  const handleDownloadPNG = async () => {
    if (!qrRef.current) return;
    setLoading(true);
    try {
      const node = qrRef.current;
      const dataUrl = await toPng(node, {
        filter: (node) => {
          // avoid including UI controls when converting
          return node.id !== "qr-ui-wrapper";
        },
        cacheBust: true,
        backgroundColor: bgColor === "transparent" ? undefined : bgColor,
      });
      download(dataUrl, "qr-code.png");
    } catch (err) {
      console.error("Failed to download PNG", err);
      alert("Could not generate PNG. See console for details.");
    }
    setLoading(false);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("QR text copied to clipboard.");
    } catch (err) {
      console.error(err);
      alert("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">QR Code Generator</h2>

          <label className="block text-sm font-medium text-gray-700">Text / URL</label>
          <input
            className="mt-2 mb-4 block w-full rounded-lg border p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
          />

          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Size: {size}px</label>
              <input
                type="range"
                min="64"
                max="1024"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="w-36">
              <label className="block text-sm font-medium text-gray-700">Error Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="mt-2 block w-full rounded-lg border p-2"
              >
                <option value="L">L (Low ~7%)</option>
                <option value="M">M (Med ~15%)</option>
                <option value="Q">Q (Quart ~25%)</option>
                <option value="H">H (High ~30%)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Foreground color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="mt-2 h-10 w-full rounded-lg p-0 border"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Background color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="mt-2 h-10 w-full rounded-lg p-0 border"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <input
              id="margin"
              type="checkbox"
              checked={includeMargin}
              onChange={(e) => setIncludeMargin(e.target.checked)}
            />
            <label htmlFor="margin" className="text-sm text-gray-700">Include quiet zone (margin)</label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownloadPNG}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
              disabled={loading}
            >
              {loading ? "Generating..." : "Download PNG"}
            </button>

            <button
              onClick={handleCopyText}
              className="px-4 py-2 rounded-lg border bg-white"
            >
              Copy text
            </button>

            <button
              onClick={() => {
                setText("https://example.com");
                setSize(256);
                setLevel("M");
                setFgColor("#000000");
                setBgColor("#ffffff");
              }}
              className="px-4 py-2 rounded-lg border bg-white"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center gap-4">
          <h3 className="text-lg font-medium">Live preview</h3>

          <div
            id="qr-ui-wrapper"
            className="p-4 rounded-lg"
            style={{ background: bgColor === "transparent" ? "transparent" : bgColor }}
          >
            <div
              ref={qrRef}
              style={{
                width: size,
                height: size,
                padding: includeMargin ? 16 : 0,
                display: "inline-block",
                background: bgColor,
              }}
            >
              <QRCode
                value={text || " "}
                size={size - (includeMargin ? 32 : 0)}
                level={level}
                fgColor={fgColor}
                bgColor={bgColor}
                style={{ height: "auto" }}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Data URI / Raw value</label>
            <textarea
              readOnly
              value={text}
              className="mt-2 w-full rounded-lg border p-2 h-28"
            />
          </div>

          <p className="text-xs text-gray-500">Tip: You can paste any text, URL, vCard, Wi‑Fi string, or other payload.</p>
        </div>
      </div>
    </div>
  );
};
export default QRCodeGenerator;


//color picker using prop drilling