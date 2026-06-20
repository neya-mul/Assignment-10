import ClassCard from '@/components/ClassCard';
import React from 'react';

const AllClasses = async () => {
  // 1. Establish absolute URL mapping with strict fallback safety for local builds
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000/';
  const cleanUrl = baseUrl.endsWith('/') ? `${baseUrl}all-classes` : `${baseUrl}/all-classes`;

  let classes = [];

  // 2. Wrap network request pipeline inside execution guard rails
  try {
    const res = await fetch(cleanUrl, { 
      next: { revalidate: 60 } // Optimizes bandwidth: re-caches page increments every 60 seconds
    });
    
    if (res.ok) {
      classes = await res.json();
      console.log(classes);
      
    } else {
      console.error(`Data transmission failure code: ${res.status}`);
    }
  } catch (error) {
    console.error("Critical connection failure to server infrastructure clusters:", error);
  }



  return (
    <div className="min-h-screen bg-[#05020a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ── Section Header Layout ── */}
        <div className="text-center space-y-3">
          <h1 
            className="text-5xl md:text-6xl font-black tracking-[.15em] bg-gradient-to-r from-white via-purple-100 to-purple-500 bg-clip-text text-transparent uppercase"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            Available Training Matrices
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest font-mono max-w-md mx-auto">
            Fetched live via background server pipelines. Ready for interaction.
          </p>
        </div>

        {/* ── Content Grid Execution Layer ── */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, ind) => (
              <ClassCard 
                key={cls._id || cls.id || ind} 
                cls={cls} 
              />
            ))}
          </div>
        ) : (
          /* Null/Void Dataset Fallback Alert Card */
         <div className="py-24 text-center border border-purple-500/10 rounded-3xl bg-gradient-to-b from-[#0c091f] to-[#05020a]">
  <p className="text-purple-400 text-xs tracking-[0.4em] uppercase mb-4">
    System Status
  </p>

  <h2 className="text-4xl font-black tracking-wider text-white">
    NO APPROVED CLASSES
  </h2>

  <p className="mt-4 text-white/40 max-w-lg mx-auto">
    The training matrix is currently empty. Once instructors publish
    approved programs, they will appear here automatically.
  </p>

  <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
    <span className="text-xs text-white/60">
      Awaiting New Class Deployments
    </span>
  </div>
</div>
        )}

      </div>
    </div>
  );
};

export default AllClasses;