import { Card } from "@/components/ui/card";
import { BadgeX } from "lucide-react";

interface DeactivatedTextProps {
    reason: string | null
}

export const DeactivatedText = ({ reason }: DeactivatedTextProps) => {
    let text = ""
    console.log(reason)
    switch (reason) {
        case "read-once":
            text = "This paste has been opened and can only be opened once";
            break;
        case "expired":
            text = "This paste has expired";
            // Expected output: "Mangoes and papayas are $2.79 a pound."
            break;
        case "deleted":
            text = "This paste has been deleted"
            break;
        default:
            console.log(`This paste is not accessible anymore`);
    }

    return (
        <Card>
            <div className="my-12 flex flex-col gap-8 items-center text-stone-700 p-8"><BadgeX size="6rem" />
                <h2 className="my-4 text-2xl text-center ">{text}</h2>
            </div>
        </Card>
        
    )

}