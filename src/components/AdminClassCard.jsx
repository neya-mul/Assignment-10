'use client';

import React from 'react';
import toast from 'react-hot-toast';
import {
  FiCheck,
  FiX,
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';

const AdminClassCard = ({ c }) => {

  
  const handleApprove = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}admin-classes/${c?._id}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ status: 'approved' }),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to approve class');
      }

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success('Class Approved');
        window.location.reload();
      } else {
        toast('No changes made');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReject = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}admin-classes/${c?._id}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ status: 'rejected' }),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to reject class');
      }

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success('Class Rejected');
        window.location.reload();
      } else {
        toast('No changes made');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    const confirmed = toast(
      'Are you sure you want to delete this class?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}admin-classes/${c?._id}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        throw new Error('Failed to delete class');
      }

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success('Class Deleted');
        window.location.reload();
      } else {
        toast.error('Class not found');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="hover:bg-purple-500/5 transition-colors">
      <td className="py-4 px-6 font-semibold text-white/90">
        {c.className}
      </td>

      <td className="py-4 px-6 text-purple-300 font-medium">
        {c.trainerName}
      </td>

      <td className="py-4 px-6 text-white/50 text-xs font-mono">
        {c.scheduleTime}
      </td>

      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
            c.status === 'approved'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : c.status === 'rejected'
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}
        >
          {c.status === 'approved' ? (
            <FiCheckCircle size={10} />
          ) : c.status === 'rejected' ? (
            <FiAlertCircle size={10} />
          ) : (
            <FiClock size={10} />
          )}

          {c.status}
        </span>
      </td>

      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Approve */}
          <button
            onClick={handleApprove}
            disabled={c.status === 'approved'}
            className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${
              c.status === 'approved'
                ? 'opacity-50 cursor-not-allowed bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-400/40'
            }`}
          >
            <FiCheck size={12} />
            Approve
          </button>

          {/* Reject */}
          <button
            onClick={handleReject}
            disabled={c.status === 'rejected'}
            className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${
              c.status === 'rejected'
                ? 'opacity-50 cursor-not-allowed bg-red-500/10 text-red-400 border border-red-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-400/40'
            }`}
          >
            <FiX size={12} />
            Reject
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md
            bg-white/5 text-white/60 border border-white/10
            hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30
            transition-all duration-200"
          >
            <FiTrash2 size={12} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminClassCard;