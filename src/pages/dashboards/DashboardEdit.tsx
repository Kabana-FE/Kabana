import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher, useLoaderData, useNavigate, useParams } from 'react-router';

import { deleteDashboard, getInviteeList } from '@/apis/dashboard';
import { getMemberList } from '@/apis/member';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import ColorSelector from '@/components/colorSelector';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Invitations from '@/components/dashboardEdit/invitations';
import Members from '@/components/dashboardEdit/members';
import InviteMember from '@/components/modal/InviteMember';
import Pagination from '@/components/pagination';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { getDashboardDetailPath, ROUTES } from '@/constants/paths';
import { useToast } from '@/hooks/useToast';
import type { DashboardEditLoaderData } from '@/loaders/dashboard/types';
import type { UpdateDashboardInput } from '@/schemas/dashboard';
import { inviteeListSchema, updateDashboardSchema } from '@/schemas/dashboard';
import type { Invitation } from '@/schemas/invitation';
import type { Member } from '@/schemas/member';
import { memberListResponseSchema } from '@/schemas/member';

const DashboardEdit = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { dashboardId } = useParams();
  const dashboardIdNumber = Number(dashboardId);
  const initialData = useLoaderData() as DashboardEditLoaderData;

  const handleMovePage = () => {
    navigate(getDashboardDetailPath(String(dashboardIdNumber)));
  };
  const [color, setColor] = useState(initialData.dashboardDetail.color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Member state
  const [memberList, setMemberList] = useState<Member[]>(initialData.memberList.members);
  const [memberPage, setMemberPage] = useState<number>(1);
  const [isMemberLoading, setIsMemberLoading] = useState<boolean>(false);
  const totalMemberPage = Math.ceil(initialData.memberList.totalCount / 4);

  // Invitee state
  const [inviteeList, setInviteeList] = useState<Invitation[]>(initialData.inviteeList.invitations);
  const [inviteePage, setInviteePage] = useState<number>(1);
  const [isInviteeLoading, setIsInviteeLoading] = useState<boolean>(false);
  const totalInviteePage = Math.ceil(initialData.inviteeList.totalCount / 5);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateDashboardInput>({
    resolver: zodResolver(updateDashboardSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialData.dashboardDetail.title,
      color: initialData.dashboardDetail.color,
    },
  });

  const fetcher = useFetcher();
  const onSubmit = async (data: UpdateDashboardInput) => {
    const formData = new FormData();
    formData.append('intent', 'updateDashboard');
    formData.append('title', String(data.title));
    formData.append('color', String(data.color));
    try {
      fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });
      showSuccess(TOAST_MESSAGES.API.UPDATE_SUCCESS('대시보드'));
    } catch (err) {
      showError(TOAST_MESSAGES.API.UPDATE_FAILURE('대시보드'));
      console.error('🩺대시보드 수정 실패:', err);
    }
  };

  // Fetch member list
  const memberFetcher = useFetcher();
  const fetchMemberList = async () => {
    if (isMemberLoading) return;
    setIsMemberLoading(true);
    try {
      const rawMemberList = await getMemberList({ dashboardId: dashboardIdNumber, size: 4, page: memberPage });
      const memberList = memberListResponseSchema.parse(rawMemberList);
      setMemberList(memberList.members);
    } catch (err) {
      showError(TOAST_MESSAGES.API.FETCH_FAILURE('멤버'));
      console.error('🩺 멤버 조회 실패:', err);
    } finally {
      setIsMemberLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberList();
  }, [memberPage, memberFetcher.state]);

  const handleDeleteMember = (id: number) => {
    const formData = new FormData();
    formData.append('intent', 'deleteMember');
    formData.append('memberId', String(id));
    memberFetcher.submit(formData, { method: 'post' });
  };

  // Fetch invitee list
  const dashboardFetcher = useFetcher();
  const fetchInvitation = async () => {
    if (isInviteeLoading) return;
    setIsInviteeLoading(true);
    try {
      const rawInviteeList = await getInviteeList({ dashboardId: dashboardIdNumber, size: 5, page: inviteePage });
      const inviteeList = inviteeListSchema.parse(rawInviteeList);
      setInviteeList(inviteeList.invitations);
    } catch (err) {
      showError(TOAST_MESSAGES.API.FETCH_FAILURE('초대 내역'));
      console.error('🩺 초대내역 조회 실패:', err);
    } finally {
      setIsInviteeLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitation();
  }, [inviteePage, dashboardFetcher.state]);

  const handleDeleteInvitee = (invitationId: number) => {
    const formData = new FormData();
    formData.append('intent', 'deleteInvitee');
    formData.append('invitationId', String(invitationId));
    dashboardFetcher.submit(formData, { method: 'post' });
  };

  const handleDelete = async (dashboardId: number) => {
    try {
      await deleteDashboard(dashboardId);
      showSuccess(TOAST_MESSAGES.API.DELETE_SUCCESS('대시보드'));
      navigate(ROUTES.DASHBOARD_LIST);
    } catch (error) {
      showError(TOAST_MESSAGES.API.DELETE_FAILURE('대시보드'));
      console.error('🩺대시보드 삭제 실패:', error);
    }
  };

  return (
    <div className='flex min-h-screen w-full flex-col gap-6 bg-gray-100 px-12 py-16'>
      <div className='flex items-center'>
        <Button aria-label='돌아가기' className='gap-8' size='none' variant='none' onClick={handleMovePage}>
          <ChevronIcon className='tablet:size-20' direction='left' size={18} />
          <span className='text-md tablet:text-lg'>돌아가기</span>
        </Button>
      </div>
      <div className='flex flex-col gap-24'>
        <section className='flex max-w-620 flex-col gap-32 rounded-lg bg-white px-16 py-20 tablet:gap-40 tablet:px-28 tablet:py-32'>
          <h2 className='text-xl font-bold tablet:text-2xl'>비브리지</h2>
          <form className='flex flex-col gap-16' id='updateDashboard' onSubmit={handleSubmit(onSubmit)}>
            <Input.Root>
              <Input.Label className='tablet:text-2lg' htmlFor='dashboardEdit'>
                대시보드 이름
              </Input.Label>
              <Input.Field {...register('title')} id='dashboardEdit' placeholder='대시보드 이름' type='text' />
            </Input.Root>
            <ColorSelector
              value={color}
              onChange={(hex) => {
                setColor(hex);
                setValue('color', hex, { shouldValidate: true });
              }}
            />
            <input type='hidden' {...register('color')} />
          </form>
          <Button
            className='rounded-lg'
            disabled={isSubmitting}
            form='updateDashboard'
            size='lg'
            type='submit'
            variant='filled'
          >
            변경
          </Button>
        </section>
        <section className='flex h-337 max-w-620 flex-col rounded-lg bg-white tablet:h-404'>
          <div className='flex items-center justify-between p-20 tablet:p-28'>
            <h2 className='flex-grow text-xl font-bold tablet:text-2xl'>구성원</h2>
            <span className='pr-12 text-xs tablet:pr-16 tablet:text-md'>
              {totalMemberPage} 페이지 중 {memberPage}
            </span>
            <Pagination
              currentPage={memberPage}
              isLoading={isMemberLoading}
              totalPages={totalMemberPage}
              onPageChange={setMemberPage}
            />
          </div>
          <div className='px-20 text-md text-gray-400 tablet:px-28 tablet:text-lg'>이름</div>
          <ul>
            {memberList.map((member, index) => (
              <Members
                key={member.id}
                id={member.id}
                isLast={index === memberList.length - 1}
                isOwner={member.isOwner}
                nickname={member.nickname}
                profileImg={member.profileImageUrl ?? undefined}
                onDelete={handleDeleteMember}
              />
            ))}
          </ul>
        </section>
        <section className='h-406 max-w-620 rounded-lg bg-white tablet:h-477'>
          <div className='flex items-center justify-between p-20 tablet:p-28'>
            <h2 className='flex-grow text-xl font-bold tablet:text-2xl'>초대내역</h2>
            <span className='pr-12 text-xs tablet:pr-16 tablet:text-md'>
              {totalInviteePage} 페이지 중 {inviteePage}
            </span>
            <Pagination
              currentPage={inviteePage}
              isLoading={isInviteeLoading}
              totalPages={totalInviteePage}
              onPageChange={setInviteePage}
            />
          </div>
          <div className='flex justify-between px-20 pb-10 tablet:px-28'>
            <div className='text-gray-400'>이메일</div>
            <Button
              className='flex h-26 w-86 gap-10 p-0 tablet:h-32 tablet:w-105 tablet:text-md'
              size='sm'
              variant='filled'
              onClick={toggleModal}
            >
              <AddBoxIcon className='tablet:size-16' color='var(--color-white)' size={10} /> 초대하기
            </Button>
          </div>
          <ul>
            {inviteeList.map((invitee, index) => (
              <Invitations
                key={invitee.id}
                email={invitee.invitee.email}
                invitationId={invitee.id}
                isLast={index === inviteeList.length - 1}
                onDelete={handleDeleteInvitee}
              />
            ))}
          </ul>
        </section>
        <Button
          className='max-w-320 rounded-lg text-gray-700 tablet:h-62'
          size='lg'
          variant='outlined'
          onClick={() => handleDelete(dashboardIdNumber)}
        >
          대시보드 삭제하기
        </Button>
      </div>

      <InviteMember dashboardId={dashboardIdNumber} isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default DashboardEdit;
