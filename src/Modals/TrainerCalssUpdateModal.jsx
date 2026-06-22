"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { toast, Toaster } from "react-hot-toast"; 

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05,
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
};

export default function TrainerClassUpdateModal({ c }) {
    const router = useRouter();
    
    // Controlled visibility state for HeroUI modal instance
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        className: "",
        trainerName: "",
        scheduleTime: "",
        price: "",
    });

    useEffect(() => {
        if (c) {
            setFormData({
                className: c.className || "",
                trainerName: c.trainerName || "",
                scheduleTime: c.scheduleTime || "",
                price: c.price || "",
            });
        }
    }, [c]);

    const handleInputChange = (fieldName, value) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const executeSubmit = async () => {
        const singleDataPayload = {
            id: c?._id,
            ...formData,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}update-class/${c?._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(singleDataPayload),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("Database updated successfully! ->", data);
                toast.success("Data updated successfully");
                
                // 1. Manually close the controlled modal layout state instantly!
                setOpen(false);
                
                // 2. Instruct Next.js to fetch updated table rows smoothly
                router.refresh();
            } else {
                toast.error(data.message || "Failed to update record");
                console.error("Server update rejected:", data.message);
            }
        } catch (error) {
            toast.error("Network connection error");
            console.error("Internal transaction error:", error);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            {/* Bind open visibility settings directly onto HeroUI provider element */}
            <Modal isOpen={open} onOpenChange={setOpen}>
                <Button className="flex-1 sm:flex-none px-3 py-1.5 text-[11px] font-bold uppercase rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition">
                    Update
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md p-0 overflow-hidden bg-transparent border-0 shadow-none">
                            <Modal.CloseTrigger className="text-zinc-400 hover:text-white top-4 right-4 z-50" />

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                className="flex flex-col gap-6 p-6 md:p-8 bg-[#0e0b1f]/95 border border-purple-500/20 rounded-3xl shadow-[0_0_50px_-10px_rgba(124,58,237,0.4)] backdrop-blur-2xl text-white w-full"
                            >
                                {/* FORM HEADER */}
                                <motion.div variants={itemVariants} className="mb-1 border-b border-purple-500/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400">
                                            <Envelope className="size-5" />
                                        </div>
                                        <h2
                                            className="text-2xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
                                            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                                        >
                                            Update Class Details
                                        </h2>
                                    </div>
                                    <p className="text-zinc-400 text-xs mt-2">
                                        Editing record for: <span className="text-purple-300 font-medium">{formData.className || "This Class"}</span>
                                    </p>
                                </motion.div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Class Name */}
                                        <motion.div variants={itemVariants}>
                                            <TextField className="w-full" name="className">
                                                <Label className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 block">
                                                    Class Name
                                                </Label>
                                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                                                    <Input
                                                        placeholder="e.g. Strength Booster"
                                                        value={formData.className}
                                                        onChange={(e) => handleInputChange("className", e.target.value)}
                                                        className="w-full h-11 px-4 bg-[#141129] border border-purple-500/10 text-white rounded-xl placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400 transition-all"
                                                    />
                                                </motion.div>
                                            </TextField>
                                        </motion.div>

                                        {/* Trainer Name */}
                                        <motion.div variants={itemVariants}>
                                            <TextField className="w-full" name="trainerName">
                                                <Label className="text-purple-300 text-[10px] font-bold uppercase tracking-widest mb-1.5 block">
                                                    Trainer Name
                                                </Label>
                                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                                                    <Input
                                                        placeholder="Trainer Name"
                                                        value={formData.trainerName}
                                                        onChange={(e) => handleInputChange("trainerName", e.target.value)}
                                                        className="w-full h-11 px-4 bg-[#141129] border border-purple-500/10 text-white rounded-xl placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 transition-all"
                                                    />
                                                </motion.div>
                                            </TextField>
                                        </motion.div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-purple-500/5">
                                        {/* Schedule Time */}
                                        <motion.div variants={itemVariants}>
                                            <TextField className="w-full" name="scheduleTime">
                                                <Label className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 block">
                                                    Schedule
                                                </Label>
                                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                                                    <Input
                                                        placeholder="e.g. Mon, Wed, Fri"
                                                        value={formData.scheduleTime}
                                                        onChange={(e) => handleInputChange("scheduleTime", e.target.value)}
                                                        className="w-full h-11 px-4 bg-[#141129] border border-purple-500/10 text-zinc-200 rounded-xl placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-zinc-500 transition-all"
                                                    />
                                                </motion.div>
                                            </TextField>
                                        </motion.div>

                                        {/* Price */}
                                        <motion.div variants={itemVariants}>
                                            <TextField className="w-full" name="price">
                                                <Label className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 block">
                                                    Price (USD)
                                                </Label>
                                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }} className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold text-sm">$</span>
                                                    <Input
                                                        type="number"
                                                        placeholder="0.00"
                                                        value={formData.price}
                                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                                        className="w-full h-11 pl-9 pr-4 bg-[#141129] border border-purple-500/10 text-emerald-300 font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all"
                                                    />
                                                </motion.div>
                                            </TextField>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* ACTION FOOTER */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex gap-3 items-center justify-between mt-4 pt-4 border-t border-purple-500/10"
                                >
                                    {/* Cancel triggers a state change to false */}
                                    <Button
                                        onPress={() => setOpen(false)}
                                        type="button"
                                        className="px-5 py-2.5 h-11 text-xs font-semibold w-full uppercase tracking-wider rounded-xl text-purple-300/70 bg-purple-900/10 border border-purple-500/10 hover:bg-purple-500/10 hover:text-purple-200 hover:border-purple-500/30 transition-all duration-200 active:scale-95"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        onPress={executeSubmit}
                                        as={motion.button}
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0px 0px 25px 0px rgba(147, 51, 234, 0.6)"
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-6 py-2.5 h-11 w-full text-xs font-bold uppercase tracking-widest text-white rounded-xl bg-purple-600 border-0 shadow-[0_0_20px_-3px_rgba(124,58,237,0.5)] cursor-pointer"
                                    >
                                        Save Changes
                                    </Button>
                                </motion.div>
                            </motion.div>

                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}