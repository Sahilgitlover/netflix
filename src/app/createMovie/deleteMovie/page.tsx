"use client";
import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Container from "@/components/Contanier";
import { Movie } from "@/models/Movies";

// This component contains all logic that uses Next.js hooks like useSearchParams.
const PageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<Movie[]>([]);
  const [inputValue, setInputValue] = useState<string>(
    searchParams.get("query")?.toString() || ""
  );

  // Use a debounced callback for handling search input changes
  const handleSearch = useDebouncedCallback(async (value: string) => {
    // Create new URLSearchParams from the current searchParams
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    // Update the URL with the new query string
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

  // Trigger search when the input value changes
  useEffect(() => {
    handleSearch(inputValue);
  }, [inputValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Optional: a click handler if you want to update inputValue based on a selection
  const handleClick = (title: string) => {
    setInputValue(title);
  };

  // Handler for submitting the search (if needed)
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

// Wrap the content component in a Suspense boundary with a fallback.
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
