import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';

import { getInvitationList } from '@/apis/dashboard';
import { getMemberList } from '@/apis/member';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import Avatar from '@/components/Avatar';
import ColorSelector from '@/components/colorSelector';
import Button from '@/components/common/button';
import Pagination from '@/components/pagination';
import type { DashboardEditLoaderData } from '@/loaders/dashboard/types';
import { invitationListSchema } from '@/schemas/dashboard';
import type { Invitation } from '@/schemas/invitation';
import { type Member, memberListResponseSchema } from '@/schemas/member';

const DashboardEdit = () => {
  const initialData = useLoaderData() as DashboardEditLoaderData;
  const [memberList, setMemberList] = useState<Member[]>(initialData.memberList.members);
  const [memberPage, setMemberPage] = useState<number>(1);
  const [isMemberLoading, setIsMemberLoading] = useState<boolean>(false);
  const totalMemberCount = initialData.memberList.totalCount;
  const totalMemberPage = Math.ceil(totalMemberCount / 5);

  const [invitationList, setInvitationList] = useState<Invitation[]>(initialData.invitationList.invitations);
  const [invitationPage, setInvitationPage] = useState<number>(1);
  const [isInvitationLoading, setIsInvitationLoading] = useState<boolean>(false);
  const totalInvitationCount = initialData.invitationList.totalCount;
  const totalInvitationPage = Math.ceil(totalInvitationCount / 5);

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
        const rawMemberList = await getMemberList({ dashboardId: 15131, size: 4, page: memberPage });
        const memberList = memberListResponseSchema.parse(rawMemberList);
        setMemberList(memberList.members);
      } catch (error) {
        console.error(error); // 에러 미구현
      } finally {
        setIsMemberLoading(false);
      }
    };
    fetchMember();
  }, [memberPage]);

  const isInvitationRender = useRef(true);

  useEffect(() => {
    if (isInvitationRender.current) {
      isInvitationRender.current = false;
      return;
    }

    const fetchInvitation = async () => {
      if (isInvitationLoading) return;
      setIsInvitationLoading(true);
      try {
        const rawInvitationList = await getInvitationList({ dashboardId: 15131, size: 5, page: invitationPage });
        const invitationList = invitationListSchema.parse(rawInvitationList);
        setInvitationList(invitationList.invitations);
      } catch (error) {
        console.error(error); // 에러 미구현
      } finally {
        setIsInvitationLoading(false);
      }
    };
    fetchInvitation();
  }, [invitationPage]);

  console.log(memberList);
  console.log(invitationList);

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
          <section className='flex h-312 max-w-620 flex-col gap-32 rounded-lg bg-white px-16 py-20 tablet:h-344 tablet:gap-40 tablet:px-28 tablet:py-32'>
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
              <h2 className='text-xl font-bold tablet:text-2xl'>구성원</h2>
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
                const { userId, nickname, profileImageUrl } = member;
                const isLast = index === arr.length - 1;
                return (
                  <>
                    <li
                      key={userId}
                      className='flex items-center justify-between px-20 py-12 tablet:px-28 tablet:py-16'
                    >
                      <div className='flex items-center justify-between gap-8'>
                        <Avatar nickname={nickname} src={profileImageUrl ?? undefined} />
                        <span className='text-md tablet:text-lg'>{nickname}</span>
                      </div>
                      <Button
                        className='w-52 p-0 tablet:w-84 tablet:text-md'
                        size='sm'
                        type='button'
                        variant='outlined'
                      >
                        삭제
                      </Button>
                    </li>
                    {!isLast && <div className='border-b border-gray-200' />}
                  </>
                );
              })}
            </ul>
          </section>
          <section className='h-406 max-w-620 rounded-lg bg-white tablet:h-477'>
            <div className='flex items-center justify-between p-20 tablet:p-28'>
              <h2 className='text-xl font-bold tablet:text-2xl'>초대내역</h2>
              <span className='pr-12 text-xs tablet:pr-16 tablet:text-md'>
                {totalInvitationPage} 페이지 중 {invitationPage}
              </span>
              <Pagination
                currentPage={invitationPage}
                isLoading={isInvitationLoading}
                totalPages={totalInvitationPage}
                onPageChange={setInvitationPage}
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
              {invitationList.map((member, index, arr) => {
                const { id, email } = member.invitee;
                const isLast = index === arr.length - 1;
                return (
                  <>
                    <li key={id} className='flex items-center justify-between px-20 py-12 tablet:px-28 tablet:py-16'>
                      <div className='text-md tablet:text-lg'>{email}</div>
                      <Button
                        className='w-52 p-0 tablet:w-84 tablet:text-md'
                        size='sm'
                        type='button'
                        variant='outlined'
                      >
                        취소
                      </Button>
                    </li>
                    {!isLast && <div className='border-b border-gray-200' />}
                  </>
                );
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
