import { NextResponse } from "next/server";
import data from "./data.json";

export async function GET(request: Request) {
  // 요청에서 URL 추출
  const { searchParams } = new URL(request.url);

  // pageNum 쿼리 파라미터 가져오기
  const pageNum = searchParams.get("page");
  // pageNum이 없으면 1로 설정
  const page = pageNum ? Number(pageNum) : 1;
  // 근데 pageNum이 1부터가 맞음??
  // data.json에서 content를 가져와서 리턴 - 이 방식은 content와 pageable 같은 메타데이터가 나뉘어잇어야함.
  //   const contents = data.content.slice((page - 1) * 10, page * 10);
  const contents = data;

  return NextResponse.json(contents, { status: 200 });
}
