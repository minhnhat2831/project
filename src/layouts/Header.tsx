import { Button } from "@radix-ui/themes";
import InputField from "../components/common/Input";
import { Search } from "lucide-react";

export default function Header({href, children} : {href : string, children : string}){

    return(<>
        <div className="w-full h-15 border flex justify-between items-center">
            <a href={href}>{children}</a>
            <InputField 
                placeholder="Search">
            </InputField>
            <Button style={{width : 80, marginRight : 8}}>Create</Button>
        </div>
    </>)
}