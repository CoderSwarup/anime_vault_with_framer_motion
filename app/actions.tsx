"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const FetchAnimeData = async (pageNo: number) => {
  const res = await fetch(
    `https://shikimori.one/api/animes?page=${pageNo}&limit=8&order=popularity`
  );
  const data = await res.json();

  return data?.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ));
};
