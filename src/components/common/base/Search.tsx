import { useQueryParams } from "@/hooks/useQueryParams";
import InputField from "../form/Input";

type SearchProps = {
  hidden?: string;
};

export const Search = ({ hidden }: SearchProps) => {
  const { handleSearchQuery } = useQueryParams()
  const { search, setSearch } = handleSearchQuery();

  return (
    <InputField
      className={`sm:w-full lg:w-100 ${hidden}`}
      variant="search"
      value={search}
      placeholder="Search"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};