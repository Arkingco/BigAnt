"use client";
import React, { useEffect, useRef, useState } from "react";
import HoneyPot from "../component/HoneyPot";
import instance from "../api/AxiosInstance";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function Board() {
  const [page,setPage] = useState(1);
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const loadHoneyPots = async () => {
    if (isLast) {
      return;
    }
    const newHoneyPots = await instance.get(`/v1/board?page=${page}`);
    if (newHoneyPots.data.last === true) {
      setIsLast(true);
    }
    setContents((prevHoneyPots) => [...prevHoneyPots, ...newHoneyPots.data.content]);
  };
  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((page) => page + 1);
  });

  useEffect(() => {
    if (page === 1) observe(target.current!);
    const count = contents.length;
    if (0 === count) {
      unobserve(target.current!);
    }
  }, [contents]);

  useEffect(() => {
    setIsLoading(true);
    loadHoneyPots();
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    if (isLoading) {
      unobserve(target.current!);
    } else {
      observe(target.current!);
    }
  }, [isLoading]);

  return (
    <div data-testid="Board" className="Board flex flex-col gap-[16px] justify-center items-center">
      {contents?.map((content, index) => {
        return <HoneyPot key={index} content={content}/>;
      })}
      <div data-testid="target" ref={target} style={{ width: '100%', height: 30 }} />
    </div>
  );
}
