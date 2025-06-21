import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { createDashboard } from '@/apis/dashboard';
import ColorSelector from '@/components/colorSelector';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import type { CreateDashboardProps } from '@/components/modal/types';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { getDashboardDetailPath } from '@/constants/paths';
import { useToast } from '@/hooks/useToast';
import type { CreateDashboardInput } from '@/schemas/dashboard';
import { createDashboardSchema } from '@/schemas/dashboard';
/**
 * 새로운 대시보드를 생성할 수 있는 모달 컴포넌트
 *
 * @param {boolean} isModalOpen - 모달의 열림 여부
 * @param {() => void} toggleModal - 모달의 열람/닫힘 상태를 토글하는 함수
 *
 * @description
 * - 대시보드 이름과 색상을 입력받아 생성 요청을 보냅니다.
 * - 유효성 검사: 이름은 1~20자, 색상은 hex 코드 (#RRGGBB 형식)
 * - 생성 완료 시:
 *   - 모달이 닫히고,
 *   - 대시보드 상세 페이지(`/dashboard/{dashboardId}`)로 이동합니다.
 */
const CreateDashboard = ({ isModalOpen, toggleModal }: CreateDashboardProps) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
  } = useForm<CreateDashboardInput>({
    resolver: zodResolver(createDashboardSchema),
    mode: 'onChange',
  });
  const title = useWatch({ control, name: 'title' });
  const color = useWatch({ control, name: 'color' });
  const onSubmit = async (data: CreateDashboardInput) => {
    try {
      const dashboard = await createDashboard(data);
      toggleModal();
      reset();
      showSuccess(TOAST_MESSAGES.API.CREATE_SUCCESS('대시보드'));
      navigate(getDashboardDetailPath(String(dashboard.id)));
    } catch (err) {
      showError(TOAST_MESSAGES.API.CREATE_FAILURE('대시보드'));
      console.error('🩺대시보드 생성 실패:', err);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-20 tablet:w-568 tablet:p-32'
      isModalOpen={isModalOpen}
      toggleModal={isSubmitting ? () => {} : toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>새로운 대시보드</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8' id='createDashboard' onSubmit={handleSubmit(onSubmit)}>
          <Input.Root>
            <Input.Label className='tablet:text-2lg' htmlFor='title'>
              대시보드 이름
            </Input.Label>
            <Input.Field {...register('title')} id='title' placeholder='뉴프로젝트' type='text' />
            <Input.ErrorMessage>{errors.title?.message}</Input.ErrorMessage>
          </Input.Root>
          <ColorSelector value={color} onChange={(hex) => setValue('color', hex, { shouldValidate: true })} />
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea>
        <Button
          className='w-full rounded-lg'
          disabled={!title?.trim() || !color || isSubmitting}
          form='createDashboard'
          size='lg'
          type='submit'
          variant='filled'
        >
          {isSubmitting ? '생성 중' : '생성'}
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateDashboard;
