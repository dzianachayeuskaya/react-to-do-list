import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './todoform.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/actions';

export function TodoForm() {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const dispatch = useDispatch();

  const determineIsButtonActive = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value) setIsButtonActive(true);
    else setIsButtonActive(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formattedValue = value.replace(/\s+/g, ' ').trim();
    setValue(formattedValue);
    if (formattedValue.length < 4) {
      setErrorMessage('The task name is too short');
      return;
    }

    dispatch(addTask(formattedValue));

    setErrorMessage('');
    setValue('');
    setIsButtonActive(false);
  };

  return (
    <>
      <form className='flex justify-center' onSubmit={handleSubmit}>
        <input
          value={value}
          className={classNames(
            styles.todoInput,
            'flex-1 xl:flex-initial rounded-lg border-0 bg-transparent w-80 sm:max-w-md p-3 text-sm leading-4'
          )}
          aria-invalid={errorMessage ? 'true' : undefined}
          type='text'
          placeholder='Add new todo...'
          onChange={determineIsButtonActive}
        />
        {isButtonActive && (
          <button
            type='submit'
            className={classNames(
              styles.submitButton,
              'rounded-lg ml-2 sm:ml-4 px-2 sm:px-4 py-3 text-sm leading-4 font-semibold text-white shadow-sm'
            )}>
            Submit
          </button>
        )}
      </form>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </>
  );
}
