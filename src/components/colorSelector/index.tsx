import CheckIcon from '@/assets/icons/CheckIcon';
import type ColorSelectorProps from '@/components/colorSelector/types';
import Button from '@/components/common/button';
const COLOR_OPTIONS = [
  { name: 'green', hex: '#7ac555' },
  { name: 'purple', hex: '#760dde' },
  { name: 'orange', hex: '#ffa500' },
  { name: 'blue', hex: '#76a5ea' },
  { name: 'pink', hex: '#e876ea' },
];
/**
 * ColorSelector 컴포넌트
 *
 * @description
 * - 미리 정의된 5가지 색상 중 하나를 선택할 수 있는 UI 버튼 목록을 렌더링합니다.
 * - 선택된 색상 버튼에는 체크 표시 역할을 하는 AddIcon이 표시됩니다.
 * - 각 버튼 클릭 시 해당 색상의 hex 코드를 onChange 콜백으로 전달합니다.
 *
 * @param {ColorSelectorProps} props
 * @param {string} props.value - 현재 선택된 색상의 hex 코드 (예: '#7ac555')
 * @param {(hex: string) => void} props.onChange - 색상 변경 시 호출되는 콜백 함수
 */
const ColorSelector = ({ value, onChange }: ColorSelectorProps) => {
  return (
    <div className='flex gap-10 py-8'>
      {COLOR_OPTIONS.map((color) => {
        const isSelected = value === color.hex;
        return (
          <Button
            key={color.hex}
            aria-label={color.name}
            className={`size-30 rounded-full p-0 bg-${color.name}`}
            variant='none'
            onClick={() => onChange(color.hex)}
          >
            {isSelected && <CheckIcon color='var(--color-gray-100)' size={15} />}
          </Button>
        );
      })}
    </div>
  );
};

export default ColorSelector;
