import { auth } from "@/lib/auth";
import TrainerClassUpdateModal from "@/Modals/TrainerCalssUpdateModal";
import TrainerDeleteModal from "@/Modals/TrainerDeleteModal";
import { headers } from "next/headers";
import Link from "next/link";

export default async function MyClasses() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}my-classes/${user?.id}`,
    { cache: "no-store" }
  );

  const myClasses = await res.json();

  return (
    <div className="space-y-8 text-white px-4 sm:px-6 lg:px-0">

      {/* HEADER */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-[.12em]
          bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          My Classes
        </h1>

        <p className="text-white/40 text-xs sm:text-sm mt-2">
          Manage, monitor, and control all classes created by you.
        </p>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-xl">

        {/* DESKTOP HEADER (hidden on mobile) */}
        <div className="hidden sm:grid grid-cols-5 gap-4 px-6 py-4 bg-white/[0.02] border-b border-purple-500/10 text-[10px] uppercase tracking-widest text-white/40">
          <span>Class Info</span>
          <span>Schedule</span>
          <span>Price</span>
          <span>Status</span>
          <span className="text-center">Actions</span>
        </div>

        <div className="divide-y divide-purple-500/5">

          {myClasses?.map((c) => (
            <div
              key={c._id}
              className="
                p-4 sm:px-6 sm:py-5
                sm:grid sm:grid-cols-5 sm:gap-4
                flex flex-col gap-3
                hover:bg-purple-500/5 transition
              "
            >

              {/* CLASS INFO */}
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {c.className}
                </h3>
                <p className="text-xs text-white/40">
                  {c.trainerName}
                </p>
              </div>

              {/* SCHEDULE */}
              <div className="text-xs sm:text-sm text-white/60">
                <span className="sm:hidden font-semibold text-white/40">Schedule: </span>
                {c.scheduleTime || "Not set"}
              </div>

              {/* PRICE */}
              <div className="text-purple-300 font-semibold text-sm sm:text-base">
                <span className="sm:hidden font-semibold text-white/40">Price: </span>
                ${c.price || 0}
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                  ${c.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : c.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                >
                  {c.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2 sm:justify-center">

                <TrainerClassUpdateModal c={c}></TrainerClassUpdateModal>
                <TrainerDeleteModal c={c}></TrainerDeleteModal>

                <button className="flex-1 sm:flex-none px-3 py-1.5 text-[11px] font-bold uppercase rounded-md
                  bg-cyan-500/10 text-cyan-300 border border-cyan-500/20
                  hover:bg-cyan-500/20 transition">
                  Students
                </button>

              </div>
            </div>
          ))}

          {/* EMPTY STATE */}
          {(!myClasses || myClasses.length === 0) && (
            <div className="py-16 sm:py-20 text-center text-white/40 px-4">
              <p className="text-base sm:text-lg font-semibold">No classes found</p>
              <p className="text-xs sm:text-sm mt-2">
                Your created classes will appear here.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}