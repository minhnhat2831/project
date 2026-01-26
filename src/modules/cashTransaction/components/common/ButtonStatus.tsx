import ButtonForm from "@/components/common/form/ButtonForm";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ButtonStatus() {
    const [isActive, setIsActive] = useState("Draft")
    const { control } = useFormContext()
    return (<>
        <ButtonForm
            name='action'
            control={control}
            className={`${isActive === "Draft" ? "mr-2 bg-blue-500 shadow-xl" : "bg-gray-500 mr-2 hover:bg-gray-600 shadow-xl"}`}
            onClick={() => setIsActive("Draft")}
        >
            Draft
        </ButtonForm>

        <ButtonForm
            name='action'
            control={control}
            className={`${isActive === "Pending" ? "mr-2 bg-orange-500 shadow-xl" : "bg-gray-500 mr-2 hover:bg-gray-600 shadow-xl"}`}
            onClick={() => setIsActive("Pending")}
        >
            Pending
        </ButtonForm>
        
        <ButtonForm
            name='action'
            control={control}
            className={`${isActive === "Complete" ? "mr-2 bg-green-500 shadow-xl" : "bg-gray-500 mr-2 hover:bg-gray-600 shadow-xl"}`}
            onClick={() => setIsActive("Complete")}
        >
            Complete
        </ButtonForm>
    </>)
}