import type { ColumnDef } from "@tanstack/react-table";
import type { isinHoldingList } from "../../schema/Schema.type";
import InputField from "@/components/common/form/Input";

export const columns : ColumnDef<isinHoldingList>[] = [
    {
        accessorKey : "organizationName",
        header : "Client Name / Sub-org Name"
    },
    {
        accessorKey : "subOrganizationName",
        header : "Bank Account(To)",
    },
    {
        accessorKey : "effectiveValueAmt",
        header : "Value of Settled Holdings"
    },
    {
        id : "data.couponPayments.cashOrderAmt",
        header : "Net Payment Amount(EUR)",
        cell : ({}) => {
            return <InputField type="number"></InputField>
        }
    }
]