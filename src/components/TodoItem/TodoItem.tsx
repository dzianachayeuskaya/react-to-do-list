import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './todoitem.module.css';
import { deleteTask, updateTask, updateTaskValue } from '../../store/actions';
import classNames from 'classnames';
import { EIcons, Icon } from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Task } from '../../store/reducer';
import { punctuationMarks } from '../../utils/const';

interface ITodoItem {
  props: Task;
}

export function TodoItem({ props }: ITodoItem) {
  const { id, value, isChecked } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [prevValue, setPrevValue] = useState(value);
  const tagList = useSelector<RootState, string[]>((state) => state.tagList);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTask({ id, isChecked: e.target.checked }));
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrevValue(e.target.value);
    setIsTouched(true);
  };

  const disableInput = () => {
    if (isEditing) {
      const formattedValue = prevValue.replace(/\s+/g, ' ').trim();
      dispatch(updateTaskValue({ id, value: formattedValue }));
      setPrevValue(formattedValue.replaceAll('#', ''));
      setIsEditing(false);
      setIsTouched(false);
    }
  };
  const disableInputOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isTouched) {
      inputRef.current?.blur();
    }
  };

  const editItem = () => {
    let currentValue = prevValue;
    currentValue = prevValue.split(' ').reduce((prev, word) => {
      const pureWord = word.replaceAll(punctuationMarks, '');
      return prev + `${tagList.includes(pureWord) ? '#' : ''}${word} `;
    }, '');

    setIsEditing(true);
    setPrevValue(currentValue.trim());
    inputRef.current?.focus();
  };
  const editItemOnEnter = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' && !isTouched) {
      editItem();
    }
  };

  const deleteItem = () => {
    dispatch(deleteTask(id));
  };

  return (
    <div
      className={classNames(
        styles.todoItemWrapper,
        'flex items-center justify-between p-1'
      )}>
      <div className='flex flex-1 items-center'>
        <input
          className='mr-2'
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <input
          ref={inputRef}
          value={prevValue}
          className={classNames(
            styles.todoItemInput,
            'overflow-x-auto w-full text-sm leading-4'
          )}
          type='text'
          disabled={isChecked}
          readOnly={!isEditing}
          onChange={handleInputChange}
          onBlur={disableInput}
          onKeyUp={disableInputOnEnter}
        />
      </div>
      <div className='flex'>
        <button
          className={classNames(styles.editBtn, 'mr-4')}
          disabled={isChecked}
          aria-label='Edit'
          onClick={editItem}
          onKeyUp={editItemOnEnter}>
          <Icon name={EIcons.editButton} />
        </button>
        <button aria-label='Delete' onClick={deleteItem}>
          <Icon name={EIcons.binButton} />
        </button>
      </div>
    </div>
  );
}
