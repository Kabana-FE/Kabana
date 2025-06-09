import type { AxiosRequestConfig } from 'axios';

import axiosInstance from './axiosInstance';

/**
 * @description GET 요청을 보내는 함수
 * @template T 서버 응답 타입
 * @template D 요청 데이터 타입
 * @param endpoint - 요청할 API 경로
 * @param options - Axios 설정 객체 (params, headers 등)
 * @returns 서버 응답 데이터
 */
export const requestGet = async <T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.get<T>(endpoint, options);
  return response.data;
};

/**
 * @description DELETE 요청을 보내는 함수
 * @template T 서버 응답 타입
 * @param endpoint - 요청할 API 경로
 * @param options - Axios 설정 객체 (headers 등)
 * @returns 서버 응답 데이터
 */
export const requestDelete = async <T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.delete<T>(endpoint, options);
  return response.data;
};

/**
 * @description POST 요청을 보내는 함수
 * @template T 서버 응답 타입
 * @template D 요청 데이터 타입
 * @param endpoint - 요청할 API 경로
 * @param data - 요청 본문 (JSON 객체 또는 FormData)
 * @param options - 추가 설정 (headers 등)
 * @returns 서버 응답 데이터
 */
export const requestPost = async <T, D>(endpoint: string, data: D, options?: AxiosRequestConfig): Promise<T> => {
  const isFormData = data instanceof FormData;
  const headers = isFormData ? undefined : { 'Content-Type': 'application/json' };

  const response = await axiosInstance.post<T>(endpoint, data, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  return response.data;
};

/**
 * @description PUT 요청을 보내는 함수
 * @template T 서버 응답 타입
 * @template D 요청 데이터 타입
 * @param endpoint - 요청할 API 경로
 * @param data - 요청 본문 (전체 수정 내용)
 * @param options - 추가 설정
 * @returns 서버 응답 데이터
 */
export const requestPut = async <T, D>(endpoint: string, data: D, options?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.put<T>(endpoint, data, options);
  return response.data;
};

/**
 * @description PATCH 요청을 보내는 함수
 * @template T 서버 응답 타입
 * @template D 요청 데이터 타입
 * @param endpoint - 요청할 API 경로
 * @param data - 요청 본문 (일부 수정 내용)
 * @param options - 추가 설정
 * @returns 서버 응답 데이터
 */
export const requestPatch = async <T, D>(endpoint: string, data: D, options?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.patch<T>(endpoint, data, options);
  return response.data;
};
