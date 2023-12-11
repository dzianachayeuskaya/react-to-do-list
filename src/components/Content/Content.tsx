import styles from './content.module.css';
import { Header } from '../Header';
import { TodoForm } from '../TodoForm';
import { FooterMessage } from '../FooterMessage';
import { TodoList } from '../TodoList';
import { ETodoState, TodoBlock } from '../TodoBlock';
import {
  getColorClass,
  loadDataFromIndexedDB,
  returnActiveTaskCount,
  returnCompletedTaskCount,
} from '../../utils/utils';
import { useSelector } from 'react-redux';
import { RootState, Task } from '../../store/reducer';
import { TodoTag } from '../TodoTag';
import Lottie from 'lottie-react';
import todoAnimation from '../../images/todoIcon.json';
import classNames from 'classnames';
import { ComponentWrapper } from '../ComponentWrapper';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateState } from '../../store/actions';

export function Content() {
  const todoList = useSelector<RootState, Task[]>((state) => state.taskList);
  const currentFilterTagsList = useSelector<RootState, string[]>(
    (state) => state.filterTags
  );
  const currentTodoList = todoList.filter((task) =>
    currentFilterTagsList.every((tag) => task.value.includes(tag))
  );

  const currentTagList = useSelector<RootState, string[]>(
    (state) => state.tagList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    loadDataFromIndexedDB()
      .then((data) => {
        if (data) dispatch(updateState(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <>
      <div className={classNames(styles.animation, 'flex justify-center')}>
        <Lottie animationData={todoAnimation} loop={true} />
      </div>
      <ComponentWrapper children={<Header />} />
      <ComponentWrapper children={<TodoForm />} />
      <ComponentWrapper>
        {currentTagList.length !== 0 && (
          <ul className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {currentTagList.map((tag, i) => (
              <li className={styles.tag} key={tag}>
                <TodoTag title={tag} classes={getColorClass(i)} />
              </li>
            ))}
          </ul>
        )}
      </ComponentWrapper>
      <ComponentWrapper children={<TodoList list={currentTodoList} />} />
      {todoList.length !== 0 && (
        <div className='flex justify-between items-stretch gap-x-3 sm:gap-x-7'>
          <TodoBlock
            allTasksCount={todoList.length}
            filteredTasksCount={returnCompletedTaskCount(todoList)}
            state={ETodoState.Completed}
          />
          <TodoBlock
            allTasksCount={todoList.length}
            filteredTasksCount={returnActiveTaskCount(todoList)}
            state={ETodoState.Active}
          />
        </div>
      )}
      {todoList.length === 0 && <FooterMessage />}
    </>
  );
}
