import Content from './Content';
import Root from './Root';
import Trigger from './Trigger';

/**
 * @description Popover 합성 컴포넌트입니다.
 * `Popover.Root`, `Popover.Trigger`, `Popover.Content` 형태로 사용합니다.
 * Popover.Root가 자식들을 검사하여 필요한 props(state, event handlers, refs)를 주입하는 방식으로 동작합니다.
 *
 * @example
 * <Popover.Root>
 *   <Popover.Trigger>
 *     <button>열기</button>
 *   </Popover.Trigger>
 *   <Popover.Content>
 *     {({ close }) => (
 *      <div>
 *        <p>컨텐츠</p>
 *        <button onClick={close}>닫기</button>
 *      </div>
 *      )}
 *    </Popover.Content>
 * </Popover.Root>
 */
const Popover = {
  Root,
  Trigger,
  Content,
};

export default Popover;
