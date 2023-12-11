import styles from './todoblock.module.css';
import classNames from 'classnames';
import { tasksProportion } from '../../utils/utils';

interface ITodoBlock {
  state: string;
  allTasksCount: number;
  filteredTasksCount: number;
}

export enum ETodoState {
  Completed = 'Completed',
  Active = 'Active',
}

export function TodoBlock({
  state,
  allTasksCount,
  filteredTasksCount,
}: ITodoBlock) {
  const counter = () => {
    return `${filteredTasksCount} ${
      filteredTasksCount === 1 ? 'task' : 'tasks'
    }`;
  };

  return (
    <div
      className={classNames(
        styles.todoBlock,
        'flex flex-col flex-1 justify-between rounded-lg p-4'
      )}>
      <div className='flex flex-col'>
        <span
          className={classNames(
            styles.counter,
            'mb-1 font-semibold sm:text-xs'
          )}>
          {counter()}
        </span>
        <span className='mb-3 font-bold text-xs sm:text-sm leading-4'>
          {state === ETodoState.Active ? 'To be finished' : 'Completed'}
        </span>
      </div>
      <div className={styles.range}>
        <div
          className={classNames(
            styles.rangeActive,
            state === ETodoState.Active ? styles.red : styles.pink
          )}
          style={{
            width: tasksProportion({ filteredTasksCount, allTasksCount }),
          }}></div>
      </div>
    </div>
  );
}
