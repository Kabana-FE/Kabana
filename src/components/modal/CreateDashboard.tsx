import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { createDashboard } from '@/apis/dashboard';
import ColorSelector from '@/components/colorSelector';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import type { CreateDashboardInput } from '@/schemas/dashboard';
import { createDashboardSchema } from '@/schemas/dashboard';
import useKabanaStore from '@/stores/store';
/**
 * @description 새로운 대시보드를 생성할 수 있는 모달 컴포넌트입니다.
 *
 * @description
 * - 대시보드 이름과 색상을 입력받아 생성 요청을 보냅니다.
 * - 유효성 검사: 이름은 1~20자, 색상은 hex 코드 (#RRGGBB 형식)
 * - 생성 완료 시:
 *   - 모달이 닫히고,
 *   - 대시보드 상세 페이지(`/dashboard/{dashboardId}`)로 이동합니다.
 */
const CreateDashboard = () => {
  const navigate = useNavigate();
  const modalIsOpen = useKabanaStore((state) => state.createDashboard);
  const toggleModal = useKabanaStore((store) => store.toggleCreateDashboard);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateDashboardInput>({
    resolver: zodResolver(createDashboardSchema),
    mode: 'onChange',
  });
  const title = watch('title');
  const color = watch('color');
  const onSubmit = async (data: CreateDashboardInput) => {
    try {
      const dashboard = await createDashboard(data);
      toggleModal();
      reset();
      navigate(`/dashboard/${dashboard.id}`);
    } catch (err) {
      console.error('대시보드 생성 실패:', err);
    }
  };

  return (
    <Dialog.Root
      className='w-327 rounded-lg px-16 py-20 tablet:w-568 tablet:p-32'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Title className='text-xl font-bold tablet:text-2xl'>새로운 대시보드</Dialog.Title>
      <Dialog.Content className='pt-16 pb-24 tablet:pt-24'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <label className='text-lg tablet:text-2lg'>대시보드 이름</label>
          <input
            {...register('title')}
            className='rounded-lg border border-gray-300 px-16 py-12 text-md'
            placeholder='뉴프로젝트'
            type='text'
          />
          <ColorSelector value={color} onChange={(hex) => setValue('color', hex, { shouldValidate: true })} />
        </form>
        {errors.title && <span className='text-sm text-red-500'>{errors.title.message}</span>}
      </Dialog.Content>
      <Dialog.ButtonArea>
        <Button
          className='w-full rounded-lg'
          disabled={!title?.trim() || !color}
          size='lg'
          type='submit'
          variant='filled'
          onClick={handleSubmit(onSubmit)}
        >
          생성
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateDashboard;
