"use client";

import { Delete, Rocket, TrashBin } from "@gravity-ui/icons";
import { Button, Modal, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function TrainerDeleteModal({ c }) {
  const state = useOverlayState();
  const router = useRouter();

  const deleteButton = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}delete-class/${c._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        state.close();
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  return (
    <Modal state={state}>
      {/* Trigger Button */}
      <Button
        className="flex-1 sm:flex-none px-3 py-1.5 text-[11px] font-bold uppercase rounded-md h-auto min-w-0
        bg-red-500/10 text-red-400 border border-red-500/20
        hover:bg-red-500/20 transition"
      >
        Delete
      </Button>

      {/* Darkened backdrop to focus on the warning */}
      <Modal.Backdrop className="bg-black/80 backdrop-blur-md">
        <Modal.Container>
          <Modal.Dialog 
            className="sm:max-w-[400px] bg-[#0e0b1f] border border-red-500/20 rounded-2xl shadow-2xl overflow-hidden text-white"
          >
            {/* White/40 Close Button styling inside HeroUI */}
            <Modal.CloseTrigger className="text-white/40 hover:text-white transition" />
            
            <Modal.Header className="flex flex-col items-center pt-8 pb-4 text-center">
              {/* Alert Glowing Icon Container */}
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-full mb-4 animate-pulse">
                <TrashBin className="size-6 text-red-400 transform " />
              </div>
              <Modal.Heading 
                className="text-xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                Confirm Destruction
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="px-6 py-2 text-center">
              <p className="text-white/60 text-sm leading-relaxed">
                Are you absolutely sure you want to delete <span className="text-red-300 font-bold">{c.className}</span>? 
              </p>
              <p className="text-xs text-white/30 mt-2 bg-black/40 p-2.5 rounded-lg border border-white/5">
                Warning: This class and its scheduling data will be permanently wiped from the database.
              </p>
            </Modal.Body>

            <Modal.Footer className="flex flex-col sm:flex-row gap-2 px-6 pt-4 pb-6">
              {/* Cancel Button */}
              <Button 
                onClick={() => state.close()} 
                className="w-full sm:flex-1 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 transition font-medium rounded-lg text-sm"
              >
                Nevermind
              </Button>

              {/* Confirm Delete Button */}
              <Button 
                onClick={deleteButton} 
                className="w-full sm:flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold uppercase tracking-wider shadow-lg shadow-red-950/50 transition rounded-lg text-sm"
              >
                Delete Class
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}