"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";
import { FetchAnimeData } from "@/app/actions";

export type AnimeCard = JSX.Element;
let nextPage: number = 2;
function LoadMore() {
  const { ref, inView, entry } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect((): void => {
    if (inView) {
      FetchAnimeData(nextPage).then((res) => {
        setData((prev) => [...prev, ...res]);
        nextPage += 1;
      });
    }
  }, [inView, data]);
  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
