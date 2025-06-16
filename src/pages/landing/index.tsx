import Button from '@/components/common/button';
import { useToast } from '@/hooks/useToast';

const Landing = () => {
  const { showSuccess, showError, showInfo, showWarning, addToast } = useToast();
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Welcome to Kabana!</h1>
      <Button onClick={() => showSuccess('작업이 성공적으로 완료되었습니다!')}>성공 토스트</Button>
      <Button onClick={() => showError('오류가 발생했습니다. 다시 시도해주세요.')}>에러 토스트</Button>
      <Button onClick={() => showInfo('새로운 알림이 있습니다.')}>정보 토스트</Button>
      <Button onClick={() => showWarning('주의! 민감한 작업입니다.')}>경고 토스트</Button>
    </div>
  );
};

export default Landing;
