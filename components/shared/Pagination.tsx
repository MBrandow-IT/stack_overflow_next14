"use client";

import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  currentViewFull: boolean;
}

const Pagination = ({ pageNumber, currentViewFull }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="w-full flex justify-center mt-6 gap-2 items-center">
      <Button
        className="py-2 px-4 light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border bg-slate-900 body-medium text-dark200_light800"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
      >
        Prev
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        className="py-2 px-4 light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border bg-slate-900 body-medium text-dark200_light800"
        disabled={!currentViewFull}
        onClick={() => handleNavigation("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
