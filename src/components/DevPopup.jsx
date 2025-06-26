// components/DevPopup.jsx
import React, { useState } from "react";

const DevPopup = () => {
  const [visible, setVisible] = useState(true); // tampil sekali saat halaman dibuka

  if (!visible) return null; // popup hilang setelah ditekan “Tutup”

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* kotak popup */}
      <div className="w-80 rounded-xl bg-white/5 backdrop-blur border border-white/15 p-6 text-center shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white/50">
          Pemberitahuan
        </h2>

        <p className="mb-6 text-sm text-white/50">
          Aplikasi ini masih dalam tahap pengembangan.
        </p>

        <button
          onClick={() => setVisible(false)}
          className="rounded border border-white/15 px-4 py-2 text-white transition bg-red-700"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default DevPopup;
