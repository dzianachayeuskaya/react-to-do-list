import { TodoItem } from '../TodoItem';
import { Task } from '../../store/reducer';

interface ITodoList {
  list: Task[];
}
export function TodoList({ list }: ITodoList) {
  return (
    <>
      {list.map((item) => (
        <TodoItem props={item} key={item.id} />
      ))}
    </>
  );
}
