"use client";

import { useState, useEffect } from "react";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function TrainerClassUpdateModal({ c }) {
  // Initialize state to hold your single class fields smoothly
  const [formData, setFormData] = useState({
    className: "",
    trainerName: "",
    scheduleTime: "",
    price: ""
  });

  // Sync incoming data to the state when the component mounts or c changes
  useEffect(() => {
    if (c) {
      setFormData({
        className: c.className || "",
        trainerName: c.trainerName || "",
        scheduleTime: c.scheduleTime || "",
        price: c.price || ""
      });
    }
  }, [c]);

  // Track field keystrokes safely
  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Catch the complete updated single item snapshot here!
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const singleDataPayload = {
      id: c?._id,
      ...formData
    };

    console.log("Caught Single Data Successfully! ->", singleDataPayload);
    // You can now trigger your Axios or Fetch updates with this object payload
  };

  return (
    <Modal>
      <Button className="flex-1 sm:flex-none px-3 py-1.5 text-[11px] font-bold uppercase rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition">
        Update
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
{/* 
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon> */}

              <Modal.Heading>Update Class Details</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  {/* Class Name */}
                  <TextField className="w-full" name="className" variant="secondary">
                    <Label>Class Name</Label>
                    <Input 
                      placeholder="Enter class name" 
                      value={formData.className}
                      onChange={(e) => handleInputChange("className", e.target.value)}
                    />
                  </TextField>

                  {/* Trainer Name */}
                  <TextField className="w-full" name="trainerName" variant="secondary">
                    <Label>Trainer Name</Label>
                    <Input 
                      placeholder="Enter trainer name" 
                      value={formData.trainerName}
                      onChange={(e) => handleInputChange("trainerName", e.target.value)}
                    />
                  </TextField>

                  {/* Schedule Time */}
                  <TextField className="w-full" name="scheduleTime" variant="secondary">
                    <Label>Schedule</Label>
                    <Input 
                      placeholder="Enter schedule layout" 
                      value={formData.scheduleTime}
                      onChange={(e) => handleInputChange("scheduleTime", e.target.value)}
                    />
                  </TextField>

                  {/* Price */}
                  <TextField className="w-full" name="price" variant="secondary">
                    <Label>Price</Label>
                    <Input 
                      placeholder="Enter price value" 
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </TextField>

                  <Button type="submit" className="w-full mt-2 bg-purple-600 text-white">
                    Save Changes
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}