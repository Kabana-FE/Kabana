import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

import { getInviteeList } from '@/apis/dashboard';
import { getMemberList } from '@/apis/member';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import ColorSelector from '@/components/colorSelector';
import Button from '@/components/common/button';
import Invitations from '@/components/dashboardEdit/invitations';
import Members from '@/components/dashboardEdit/members';
import Pagination from '@/components/pagination';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useToast } from '@/hooks/useToast';
import type { DashboardEditLoaderData } from '@/loaders/dashboard/types';
import { inviteeListSchema } from '@/schemas/dashboard';
import type { Invitation } from '@/schemas/invitation';
import type { Member } from '@/schemas/member';
import { memberListResponseSchema } from '@/schemas/member';

const DashboardEdit = () => {
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

  const isMemberRender = useRef(true);

  const { showSuccess, showError } = useToast();

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
        console.error('🩺 구성원 조회 실패:', err);
      } finally {
        showError(TOAST_MESSAGES.API.FETCH_FAILURE('구성원'));
        setIsMemberLoading(false);
      }
    };
    fetchMember();
  }, [memberPage]);

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
        showError(TOAST_MESSAGES.API.FETCH_FAILURE('초대 내역'));
        console.error('🩺 초대내역 조회 실패:', err);
      } finally {
        setIsInviteeLoading(false);
      }
    };
    fetchInvitation();
  }, [inviteePage]);

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
              <div className='flex flex-col gap-16'>
                {/* input 컴포넌트로 수정 예정 */}
                <label className='flex flex-col gap-8 text-lg tablet:text-2lg'>
                  대시보드 이름
                  <input
                    className='rounded-lg border border-gray-300 p-12 text-md text-gray-400'
                    placeholder='뉴프로젝트'
                    type='text'
                  />
                </label>
                <ColorSelector value='color' onChange={() => {}} />
              </div>
            </div>
            <Button className='rounded-lg' size='lg' type='submit' variant='filled'>
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
                const { userId, nickname, profileImageUrl, isOwner } = member;
                const isLast = index === arr.length - 1;
                return (
                  <Members
                    key={userId}
                    isLast={isLast}
                    isOwner={isOwner}
                    nickname={nickname}
                    profileImg={profileImageUrl ?? undefined}
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
                return <Invitations key={id} email={email} isLast={isLast} />;
              })}
            </ul>
          </section>
        </div>
        <Button className='max-w-320 rounded-lg text-gray-700 tablet:h-62' size='lg' variant='outlined'>
          대시보드 삭제하기
        </Button>
      </div>
    </div>
  );
};

export default DashboardEdit;
