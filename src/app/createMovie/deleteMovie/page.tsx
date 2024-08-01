"use client";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import Container from "@/components/Contanier";
import { Movie } from "@/models/Movies";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<Movie[]>([]);
  const [inputValue, setInputValue] = useState<string>(
    searchParams.get("query")?.toString() || ""
  );

  // Use debounced callback
  const handleSearch = useDebouncedCallback(async (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`/api/search?title=${value}`);
      setResults(res.data.movies);
    } catch (error: any) {
      console.log("Error", error.message);
      setResults([]);
    }
  }, 400);

  useEffect(() => {
    handleSearch(inputValue);
  }, [inputValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = (title: string) => {
    setInputValue(title); // Set the input field value to the clicked title
  };

  const submitHandler = async () => {
    if (!searchParams.get("query")) return;
    const value = searchParams.get("query")?.toString();

    try {
      const res = await axios.get(`/api/search?title=${value}`);
      setResults(res.data.data);
    } catch (error: any) {
      console.log("Error", error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center mb-6">
          <input
            className="p-2 rounded-sm bg-gray-700 text-white"
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
            placeholder="Search Movie To delete..."
          />
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
      {results.length > 0 && (
          <div>
            <Container results={results} />
          </div>
        )}
    </div>
  );
};

export default Page;
