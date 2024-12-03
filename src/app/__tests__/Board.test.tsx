import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Board from "../board/page";
import mockData from "../v1/board/data.json";
import axios from '../api/AxiosInstance'
import { act } from "react"; 

jest.mock('../api/AxiosInstance');

describe("Board Page", () => {
  beforeEach(() => {
    // Mock API response
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
    // Mock IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  // Todo : 컴포넌트가 렌더링될 때 Board 컴포넌트가 올바르게 렌더링되는지 확인
  it("should render Board component", async () => {
    await act(async () => {
      render(<Board />);
    });
    const board = screen.getByTestId("Board");
    expect(board).toBeInTheDocument();
  })

  // Todo : loadHoneyPots 함수가 호출되면 데이터를 올바르게 contents에 추가하는지 확인
  it("should call loadHoneyPots on initial render", async () => {
    await act(async () => {
      render(<Board />);
    });
    // 첫 로딩 시 올바른 URL로 요청되었는지 확인
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/v1/board?page=1');
      expect(axios.get).toHaveBeenCalledTimes(1);
      const HoneyPots = screen.getAllByTestId("HoneyPot");
      HoneyPots.forEach((honeypot) => {
        expect(honeypot).toBeInTheDocument();
      });
    });
  });
  // Todo : target 요소가 뷰포트에 들어오면 페이지 증가 및 데이터 요청이 이루어지는지
  it("should increment page and request data when target element is in viewport", async () => {
    await act(async () => {
      render(<Board />);
    });
    // IntersectionObserver mock을 통해 observe가 제대로 호출되었는지 확인
    const mockIntersectionObserver = window.IntersectionObserver as jest.Mock;

    // 첫 번째 페이지 데이터 로딩 확인
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/v1/board?page=1');
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    // `target` 요소를 뷰포트에 들어왔다고 시뮬레이션
    const observer = mockIntersectionObserver.mock.calls[0][0];
    const targetElement = screen.getByTestId("target");

    // `targetElement`가 뷰포트에 들어왔을 때 페이지를 증가시키고 데이터 요청을 시뮬레이션
    await act(()=>observer([{ isIntersecting: true, target: targetElement }]));

    // 페이지 증가 후 두 번째 데이터 요청 확인
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/v1/board?page=2');
      expect(axios.get).toHaveBeenCalledTimes(2);
    });

    // `target` 요소가 다시 뷰포트에 들어왔을 때, 페이지가 3으로 증가하고 데이터 요청이 이루어졌는지 확인
    await act(()=>observer([{ isIntersecting: true, target: targetElement }]));
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/v1/board?page=3');
      expect(axios.get).toHaveBeenCalledTimes(3);
    });
  });

  // Todo : 더 이상 데이터를 가져올 수 없을 때, 추가 요청이 없는지
  it("should not request data when there is no more data to fetch", async () => {
    await act(async () => {
      render(<Board />);
    });
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { content: [], last: true } });
    // const mockIntersectionObserver = window.IntersectionObserver as jest.Mock;
     // 첫 번째 요청을 기다리고, 페이지 번호가 1일 때 데이터를 가져왔는지 확인
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/v1/board?page=1');
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    // 더 이상 요청이 발생하지 않도록 설정 (isLast가 true일 때)
    await waitFor(() => {
      // 요청이 두 번째로 발생하지 않도록 해야 함
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  // Todo : 페이지 증가 시 isLoading 상태가 true로 변경되는지, isLoading 상태가 true일 때 observe가 중단되는지
  // Todo : 빈 데이터 또는 에러 응답 시 적절한 메시지를 보여주는지
});