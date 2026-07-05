export default function PrivacyNote() {
  return (
    <div className="max-w-4xl mx-auto px-6 mb-2">
      <div className="border border-[#1a1a1a] rounded-lg px-5 py-4 bg-[#0d0d0d] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-[#444] text-lg shrink-0">🔒</span>
        <div>
          <p className="text-[#e8e6e0] text-[13px] font-medium mb-0.5">Your data stays yours.</p>
          <p className="text-[#555] text-[12px] leading-relaxed">
            Uploaded CSVs are only used to process your job. Files are never sold, shared, or reused.
            Raw uploads are automatically deleted after processing. You retain full ownership of your data.
          </p>
        </div>
      </div>
    </div>
  );
}