export default function Loading(): JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FA]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-navy border-t-gold animate-spin" />
        <p className="text-navy text-sm tracking-widest uppercase font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
