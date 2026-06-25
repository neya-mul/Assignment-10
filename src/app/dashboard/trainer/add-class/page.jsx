"use client";

import { useSession } from "@/lib/auth-client";
import { uploadToImgBB } from "@/lib/iamgeUpload/imageUpload";
import { toast } from "@heroui/react";
import React, { useState } from "react";
import {
  FiImage,
  FiGrid,
  FiActivity,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";

export default function AddClass() {
  const { data: session } = useSession()
  const user = session?.user

  const [formData, setFormData] = useState({
    className: "",
    image: null,
    category: "",
    difficulty: "Beginner",
    duration: "",
    scheduleTime: "",
    price: "",
    description: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let imageUrl = "";

      if (formData.image) {
        imageUrl = await uploadToImgBB(formData.image);
      }

      const classData = {
        className: formData.className,
        image: imageUrl,
        category: formData.category,
        difficulty: formData.difficulty,
        duration: formData.duration,
        scheduleTime: formData.scheduleTime,
        price: formData.price,
        description: formData.description,
        status: 'pending',
        trainerName: user?.name,
        trainerId: user?.id
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}all-classes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(classData)
      })
      const data =await res.json()

      if(data.insertedId){
        window.location.reload()
      }


      // save classData to database
    } catch (error) {
      console.error(error);
    }
            toast('Class added')

  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1
          className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          Add New Class
        </h1>

        <p className="text-white/40 text-sm mt-1">
          Create a new fitness class.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        {/* Class Name & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">
              Class Name
            </label>

            <input
              type="text"
              placeholder="e.g. Strength Training"
              value={formData.className}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  className: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
              <FiImage className="text-purple-400" />
              Class Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files?.[0] || null,
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-purple-500/20 file:text-purple-300 file:cursor-pointer"
            />
          </div>
        </div>

        {/* Category, Difficulty, Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
         <div className="space-y-1.5">
  <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
    <FiGrid className="text-purple-400" />
    Category
  </label>

  <select
    value={formData.category}
    onChange={(e) =>
      setFormData({
        ...formData,
        category: e.target.value,
      })
    }
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white text-xs focus:outline-none focus:border-purple-500/50"
  >
    <option value="" className="bg-[#120f26]">
      Select Category
    </option>
    <option value="Cardio" className="bg-[#120f26]">
      Cardio
    </option>
    <option value="Strength Training" className="bg-[#120f26]">
      Strength Training
    </option>
    <option value="Yoga" className="bg-[#120f26]">
      Yoga
    </option>
    <option value="Pilates" className="bg-[#120f26]">
      Pilates
    </option>
    <option value="CrossFit" className="bg-[#120f26]">
      CrossFit
    </option>
    <option value="HIIT" className="bg-[#120f26]">
      HIIT
    </option>
   
  </select>
</div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
              <FiActivity className="text-purple-400" />
              Difficulty
            </label>

            <select
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficulty: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white text-xs focus:outline-none focus:border-purple-500/50"
            >
              <option value="Beginner" className="bg-[#120f26]">
                Beginner
              </option>
              <option value="Intermediate" className="bg-[#120f26]">
                Intermediate
              </option>
              <option value="Advanced" className="bg-[#120f26]">
                Advanced
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
              <FiClock className="text-purple-400" />
              Duration (Minutes)
            </label>

            <input
              type="number"
              placeholder="45"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
            <FiCalendar className="text-purple-400" />
            Schedule
          </label>

          <input
            type="text"
            placeholder="e.g. Monday, Wednesday, Friday - 8:00 AM"
            value={formData.scheduleTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                scheduleTime: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
            <FiDollarSign className="text-purple-400" />
            Price
          </label>

          <input
            type="number"
            placeholder="29.99"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
            <FiFileText className="text-purple-400" />
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Enter class description..."
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
        >
          Add Class
        </button>
      </form>
    </div>
  );
}




