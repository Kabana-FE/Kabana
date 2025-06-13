import CardDetail from '@/components/cardDetail';
import CreateTodo from '@/components/createTodo';
import useKabanaStore from '@/stores/store';
// my dashboard
const DashboardList = () => {
  const toggleCreateTodo = useKabanaStore((state) => state.toggleCreateTodo);
  const toggleCardDetail = useKabanaStore((state) => state.toggleCardDetail);
  const cardDetail = useKabanaStore((state) => state.cardDetail);
  return (
    <div>
      <button onClick={toggleCreateTodo}>할일 생성 모달 표시</button>
      <button onClick={toggleCardDetail}>카드 상세</button>
      <CreateTodo />
      <CardDetail />
    </div>
  );
};

export default DashboardList;
