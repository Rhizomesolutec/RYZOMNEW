import WorkDetail from "@/components/WorkDetail";
import Clients from "@/components/Clients";

export default function WorkPage() {
  return (
    <div className="bg-black min-h-screen pt-20 md:pt-24">
      {/* Client Network at top of Work page */}
      <Clients isWorkPage={true} />
      {/* Selected Work Detail */}
      <WorkDetail />
    </div>
  );
}

