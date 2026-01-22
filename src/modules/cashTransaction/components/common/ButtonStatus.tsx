import Button from "@/components/common/form/Button";
import { useState } from "react";

export default function ButtonStatus() {
    const [isActive, setIsActive] = useState("Draft")
    return (<>
        <Button
            type="button"
            variant="normal"
            size="sm"
            onClick={() => setIsActive("Draft")}
            className={`${isActive === "Draft" ? "mr-2 bg-blue-500 shadow-xl" : "bg-gray-500 mr-2 hover:bg-gray-600 shadow-xl"}`}
        >Draft
        </Button>
        <Button
            type="button"
            variant="normal"
            size="sm"
            onClick={() => setIsActive("Pending")}
            className={`${isActive === "Pending" ? "mr-2 bg-orange-500 shadow-xl" : "bg-gray-500 mr-2 hover:bg-gray-600 shadow-xl"}`}>Pending</Button>
        <Button
            type="button"
            variant="normal"
            size="sm"
            onClick={() => setIsActive("Complete")}
            className={`${isActive === "Complete" ? "mr-2 bg-green-500 shadow-xl" : "bg-gray-500 mr-2 hover:bg-gray-600 shadow-xl"}`}
        >Complete</Button>
    </>)
}