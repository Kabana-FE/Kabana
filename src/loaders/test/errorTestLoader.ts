import { HttpStatusCode } from 'axios';

/**
 * @description
 * 에러 바운더리 테스트를 위해 의도적으로 에러를 발생시키는 로더입니다.
 */
const errorTestLoader = () => {
  throw new Response(JSON.stringify({ message: '의도적으로 발생시킨 테스트 에러' }), {
    status: HttpStatusCode.InternalServerError,
    statusText: 'Internal Server Error',
  });
};

export default errorTestLoader;
