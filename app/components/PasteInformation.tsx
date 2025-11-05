import { Info } from "lucide-react"
import { PasteResponse } from "../api/paste/route"
import { Card } from "@/components/ui/card"

export const PasteInformation = ({paste}: {paste: PasteResponse}) => {
    console.log(paste)
    return (paste.expiresAt || paste.readOnce || paste.passwordProtected) && (
         
        <Card className="inline-flex flex-col gap-2 text-sm my-12 px-8">
            { paste.expiresAt &&
            <div className="flex gap-2 items-center"><Info size="1rem"/> This paste expires at {new Date(paste.expiresAt).toLocaleDateString()} </div> }
            { paste.readOnce &&
            <div className="flex gap-2 items-center"><Info size="1rem"/> This paste can only be opened once! </div> }
            { paste.passwordProtected &&
            <div className="flex gap-2 items-center"><Info size="1rem"/> This paste is password protected </div> }
        </Card>
            
    )
}