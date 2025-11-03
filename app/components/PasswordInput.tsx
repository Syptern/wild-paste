'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleX, ClosedCaption, Lock } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  onChange: (password: string | null) => void;
}

export const PasswordInput = ({onChange}: PasswordInputProps) => {
    const [showInput, setShowInput] = useState(false)



    return (
        <div className="inline-flex flex-row ">
            <Button  variant={'outline'} onClick={() => setShowInput(!showInput)} className={`${showInput ? "rounded-e-none" : ""} cursor-pointer`} >

                { showInput ? <CircleX/> : <Lock /> }

            </Button>
            {showInput && <Input
            onChange={e => onChange(e.currentTarget.value || null)}
                placeholder="Set a password"
                type="password"
                className="rounded-s-none"
                />
            }
        </div>
    )
}