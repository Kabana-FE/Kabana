import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate, useParams } from 'react-router';

import { cancelInvitee, deleteDashboard, getInviteeList, updateDashboard } from '@/apis/dashboard';
import { deleteMember, getMemberList } from '@/apis/member';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import ColorSelector from '@/components/colorSelector';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Invitations from '@/components/dashboardEdit/invitations';
import Members from '@/components/dashboardEdit/members';
import InviteMember from '@/components/modal/InviteMember';
import Pagination from '@/components/pagination';
import { ROUTES } from '@/constants/paths';
import type { DashboardEditLoaderData } from '@/loaders/dashboard/types';
import { inviteeListSchema, type UpdateDashboardInput, updateDashboardSchema } from '@/schemas/dashboard';
import type { Invitation } from '@/schemas/invitation';
import type { Member } from '@/schemas/member';
import { memberListResponseSchema } from '@/schemas/member';

const DashboardEdit = () => {
  const navigate = useNavigate();
  const { dashboardId } = useParams();
  const dashboardIdNumber = Number(dashboardId);
  const initialData = useLoaderData() as DashboardEditLoaderData;
  const [memberList, setMemberList] = useState<Member[]>(initialData.memberList.members);
  const [memberPage, setMemberPage] = useState<number>(1);
  const [isMemberLoading, setIsMemberLoading] = useState<boolean>(false);
  const totalMemberCount = initialData.memberList.totalCount;
  const totalMemberPage = Math.ceil(totalMemberCount / 4);

  const [inviteeList, setInviteeList] = useState<Invitation[]>(initialData.inviteeList.invitations);
  const [inviteePage, setInviteePage] = useState<number>(1);
  const [isInviteeLoading, setIsInviteeLoading] = useState<boolean>(false);
  const totalInviteeCount = initialData.inviteeList.totalCount;
  const totalInviteePage = Math.ceil(totalInviteeCount / 5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm<UpdateDashboardInput>({
    resolver: zodResolver(updateDashboardSchema),
    mode: 'onChange',
  });

  const title = useWatch({ control, name: 'title' });
  const color = useWatch({ control, name: 'color' });
  const onSubmit = async (data: UpdateDashboardInput) => {
    try {
      await updateDashboard(dashboardIdNumber, data);
    } catch (err) {
      console.error('🩺대시보드 수정 실패:', err);
    }
  };

  const isMemberRender = useRef(true);

  useEffect(() => {
    if (isMemberRender.current) {
      isMemberRender.current = false;
      return;
    }

    const fetchMember = async () => {
      if (isMemberLoading) return;
      setIsMemberLoading(true);
      try {
        const rawMemberList = await getMemberList({ dashboardId: dashboardIdNumber, size: 4, page: memberPage });
        const memberList = memberListResponseSchema.parse(rawMemberList);
        setMemberList(memberList.members);
      } catch (err) {
        console.error('🩺구성원 조회 실패:', err);
      } finally {
        setIsMemberLoading(false);
      }
    };
    fetchMember();
  }, [memberPage]);

  const handleDeleteMember = async (id: number) => {
    try {
      await deleteMember(id);
      setMemberList((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      console.error('🩺 멤버 삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const isInviteeRender = useRef(true);

  useEffect(() => {
    if (isInviteeRender.current) {
      isInviteeRender.current = false;
      return;
    }

    const fetchInvitation = async () => {
      if (isInviteeLoading) return;
      setIsInviteeLoading(true);
      try {
        const rawInviteeList = await getInviteeList({
          dashboardId: dashboardIdNumber,
          size: 5,
          page: inviteePage,
        });
        const inviteeList = inviteeListSchema.parse(rawInviteeList);
        setInviteeList(inviteeList.invitations);
      } catch (err) {
        console.error('🩺초대내역 조회 실패:', err);
      } finally {
        setIsInviteeLoading(false);
      }
    };
    fetchInvitation();
  }, [inviteePage]);

  const handleDeleteInvitee = async (invitationId: number) => {
    try {
      await cancelInvitee({ dashboardId: dashboardIdNumber, invitationId });
      setInviteeList((prev) => prev.filter((invitee) => invitee.id !== invitationId));
    } catch (error) {
      console.error('🩺 초대내역 삭제 실패:', error);
      alert('초대내역 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (dashboardId: number) => {
    try {
      await deleteDashboard(dashboardId);
      navigate(ROUTES.DASHBOARD_LIST);
    } catch (error) {
      console.error('🩺대시보드 삭제 실패:', error);
    }
  };

  return (
    <div className='flex min-h-screen flex-col gap-6 bg-gray-100 px-12 py-16'>
      <div className='flex items-center gap-8'>
        <Button aria-label='돌아가기' size='none' variant='none'>
          <ChevronIcon className='tablet:size-20' direction='left' size={18} />
        </Button>
        <span className='text-md tablet:text-lg'>돌아가기</span>
      </div>
      <div className='flex flex-col gap-24'>
        <div className='flex flex-col gap-16'>
          <section className='flex max-w-620 flex-col gap-32 rounded-lg bg-white px-16 py-20 tablet:gap-40 tablet:px-28 tablet:py-32'>
            <div className='flex flex-col gap-24'>
              <h2 className='text-xl font-bold tablet:text-2xl'>비브리지</h2>
              <form className='flex flex-col gap-16' id='updateDashboard' onSubmit={handleSubmit(onSubmit)}>
                <Input.Root>
                  <Input.Label className='tablet:text-2lg' htmlFor='dashboardEdit'>
                    대시보드 이름
                  </Input.Label>
                  <Input.Field {...register('title')} id='dashboardEdit' placeholder='뉴프로젝트' type='text' />
                </Input.Root>
                <ColorSelector value={color} onChange={(hex) => setValue('color', hex, { shouldValidate: true })} />
              </form>
            </div>
            <Button
              className='rounded-lg'
              disabled={!title?.trim() || !color || isSubmitting}
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
              {memberList.map((member, index, arr) => {
                const { id, nickname, profileImageUrl, isOwner } = member;
                const isLast = index === arr.length - 1;
                return (
                  <Members
                    key={id}
                    id={id}
                    isLast={isLast}
                    isOwner={isOwner}
                    nickname={nickname}
                    profileImg={profileImageUrl ?? undefined}
                    onDelete={handleDeleteMember}
                  />
                );
              })}
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
                <AddBoxIcon className='tablet:size-16' color='var(--color-white)' size={10} />
                초대하기
              </Button>
            </div>
            <ul>
              {inviteeList.map((member, index, arr) => {
                const { id } = member;
                const { email } = member.invitee;
                const isLast = index === arr.length - 1;
                return (
                  <Invitations
                    key={id}
                    email={email}
                    invitationId={id}
                    isLast={isLast}
                    onDelete={handleDeleteInvitee}
                  />
                );
              })}
            </ul>
          </section>
        </div>
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
