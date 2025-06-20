import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import MoreVertIcon from '@/assets/icons/MoreVertIcon';
import TriangleIcon from '@/assets/icons/TriangleIcon';
import Dropdown from '@/components/common/dropdown';
import type { DropdownOption } from '@/components/common/dropdown/types';
import { ROUTES } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';

// --- API에서 받아온 데이터라고 가정 ---
const statusData = [
  { id: 'todo', name: 'To Do' },
  { id: 'inProgress', name: 'In Progress' },
  { id: 'done', name: 'Done' },
];

const Playground = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  // 위치 기준으로 삼을 div 요소의 ref를 생성합니다.
  const dropdownContainerRef1 = useRef<HTMLDivElement>(null);
  const dropdownContainerRef2 = useRef<HTMLDivElement>(null);

  // 받아온 데이터를 Dropdown이 요구하는 형식({ label, value })으로 변환
  const statusOptions: DropdownOption[] = statusData.map((status) => ({
    label: status.name,
    value: status.id,
  }));

  // 두 번째 드롭다운의 선택된 상태를 관리하기 위한 state를 추가합니다.
  const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);

  const handleOptionSelect1 = async (value: string | number) => {
    if (value === 'edit') {
      console.log('수정하기 클릭');
      // 할일 수정 모달 열기
    }

    if (value === 'delete') {
      console.log('삭제하기 클릭');
      // 정말삭제할건지 확인하는 모달 띄우거나 삭제하기 요청 바로. 아래는 예시
      // try {
      //     await deleteCard(cardId);
      //     showSuccess('카드가 삭제되었습니다.');
      //     여기에 카드 목록을 새로고침하는 로직 추가
      //   } catch (error) {
      //     showError('카드 삭제에 실패했습니다.');
      //     console.error('카드 삭제 실패:', error);
      //   }
    }

    if (value === 'logout') {
      logout();
      navigate(ROUTES.SIGNIN);
    }
  };

  const handleOptionSelect2 = async (value: string | number) => {
    // 선택된 값(value)에 해당하는 옵션 객체(label, value)를 찾습니다.
    const selected = statusOptions.find((option) => option.value === value);
    if (selected) {
      setSelectedStatus(selected);
      console.log(`선택된 상태: ${selected.label} (값: ${value})`);
      // 여기서 상태 업데이트 API 호출 등을 수행할 수 있습니다.
    }
  };

  return (
    <div className='p-10'>
      <h1 className='mb-4 text-xl font-bold'>🧪 Playground</h1>
      <p className='mb-4 text-lg text-gray-500'>여기서 임시 UI, 컴포넌트, API 테스트 등을 자유롭게 구현하세요.</p>

      {/* <DropdownTest /> */}
      <div ref={dropdownContainerRef1} className='flex w-fit items-center rounded border border-gray-300 p-4'>
        <div className='text-gray-400'>여기에 placeholder 쓰고 이런식으로 사용하면 될거같아요</div>
        <Dropdown
          align='end'
          contentClassName=''
          optionClassName='text-center'
          options={[
            { label: '수정하기', value: 'edit' },
            { label: '삭제하기', value: 'delete' },
            { label: '마이페이지', value: 'mypage', to: ROUTES.MYPAGE },
            { label: '로그아웃', value: 'logout' },
          ]}
          positionRef={dropdownContainerRef1}
          trigger={<MoreVertIcon aria-label='더보기 옵션' size={24} />}
          triggerClassName='px-2 py-1 hover:bg-gray-100'
          onSelect={handleOptionSelect1}
        />
      </div>
      <div
        ref={dropdownContainerRef2}
        className='flex w-300 items-center justify-between rounded border border-gray-300 px-16 py-11'
      >
        <div className={twMerge(selectedStatus ? 'rounded-full bg-cream p-6 text-capybara' : 'text-gray-400')}>
          {selectedStatus ? selectedStatus.label : '칼럼선택'}
        </div>
        <Dropdown
          align='start'
          contentClassName='w-300'
          optionClassName='text-left'
          options={statusOptions}
          positionRef={dropdownContainerRef2}
          selectedValue={selectedStatus?.value}
          trigger={<TriangleIcon aria-label='OOO 옵션' size={12} />}
          onSelect={handleOptionSelect2}
        />
      </div>
    </div>
  );
};

export default Playground;
