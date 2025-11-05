"use client";
import React, { useState } from "react";
import { Lock, Eye, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type ExpiryType = "never" | "5min" | "15min" | "1hour" | "1day" | "custom";

interface ExpiryDatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export function ExpiryDatePicker({ value, onChange }: ExpiryDatePickerProps) {
  const [selectedLabel, setSelectedLabel] = useState("Set expiry time");
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const calculateExpiryDate = (option: ExpiryType): Date | null => {
    if (option === "custom") return null;

    const now = new Date();
    switch (option) {
      case "5min":
        return new Date(now.getTime() + 5 * 60 * 1000);
      case "15min":
        return new Date(now.getTime() + 15 * 60 * 1000);
      case "1hour":
        return new Date(now.getTime() + 60 * 60 * 1000);
      case "1day":
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      default:
        return null;
    }
  };

  const handleClickCustom = (date: Date | undefined) => {
    console.log(date);
    setOpen(false);
    setShowCustomPicker(false);
    setCustomDate(date);
    setSelectedLabel(
      "Expires at " + date?.toLocaleDateString() || "No date selected"
    );
  };

  const handleOptionSelect = (option: ExpiryType, label: string) => {
    if (option === "never") {
      onChange(null);
      setOpen(false);
      setSelectedLabel(label);
    } else {
      setSelectedLabel("Expires in " + label);
      setShowCustomPicker(false);
      const expiryDate = calculateExpiryDate(option);
      onChange(expiryDate);
    }
  };

  return (
    <div className="inline">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start cursor-pointer"
          >
            {selectedLabel}
          </Button>
        </PopoverTrigger>
        {!showCustomPicker ? (
          <PopoverContent className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleOptionSelect("never", "No Expiry Date")}
            >
              Never
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleOptionSelect("5min", "5 minutes")}
            >
              5 minutes
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleOptionSelect("15min", "15 minutes")}
            >
              15 minutes
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleOptionSelect("1hour", "1 hour")}
            >
              1 hour
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleOptionSelect("1day", "1 day")}
            >
              1 day
            </Button>
            <Button
              variant="outline"
              data-empty={!customDate}
              onClick={() => setShowCustomPicker(true)}
              className="cursor-pointer"
            >
              <CalendarIcon />
              Custom
            </Button>{" "}
          </PopoverContent>
        ) : (
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={customDate}
              onSelect={handleClickCustom}
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
