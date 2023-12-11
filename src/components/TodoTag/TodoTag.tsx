import { useState } from 'react';
import styles from './todotag.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { EFilterActionKind, changeFilterTags } from '../../store/actions';

interface ITodoTag {
  title: string;
  classes: string;
}

export function TodoTag({ title, classes }: ITodoTag) {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
    dispatch(
      changeFilterTags(
        title,
        isActive ? EFilterActionKind.Delete : EFilterActionKind.Add
      )
    );
  };

  return (
    <button
      className={classNames(
        styles.todoTag,
        classes,
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        isActive ? styles.active : ''
      )}
      onClick={handleClick}>
      {title}
    </button>
  );
}
