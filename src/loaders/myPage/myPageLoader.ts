import { getMyInfo } from '@/apis/user';
import type { MypageLoaderData } from '@/loaders/myPage/types';
import { userInfoSchema } from '@/schemas/user';
import handleLoaderError from '@/utils/error/handleLoaderError';
/**
 * @description
 * 마이페이지 진입 시 유저 정보를 요청합니다.
 *
 * ✅ 포함되는 데이터
 * - 내 정보 (이메일, 닉네임, 프로필 이미지, 생성일 등)
 *
 * ✅ 데이터 요청 방식
 * - 단일 API (`getMyInfo`) 호출
 *
 * ✅ 스키마 유효성 검사
 * - API 응답을 Zod 스키마 (`userInfoSchema`)로 검증하여
 *   서버 응답 구조가 예상과 다를 경우 에러를 발생시킵니다.
 *
 * @returns {Promise<MyPageLoaderData>} 마이페이지 렌더링에 필요한 데이터
 *
 * @throws {Response}
 * - API 응답이 Zod 스키마와 맞지 않으면 ZodError를 throw
 * - API 요청 실패 시 해당 에러를 그대로 전파
 */
export const loader = async (): Promise<MypageLoaderData> => {
  try {
    const myInfoRaw = await getMyInfo();
    const myInfo = userInfoSchema.parse(myInfoRaw);

    return { myInfo };
  } catch (error: unknown) {
    return handleLoaderError(error);
  }
};
