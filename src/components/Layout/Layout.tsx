import React from 'react';
import styles from './layout.module.css';
import classNames from 'classnames';

interface ILayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  return (
    <div
      className={classNames(
        styles.layout,
        'relative flex items-top justify-center px-4 sm:px-10 min-h-screen items-center sm:pt-0'
      )}>
      <div
        className={classNames(
          styles.content,
          'flex flex-col max-h-full justify-between bg-white shadow rounded-3xl w-11/12 xl-w-2/4 my-8 pb-8 px-8 sm:px-32 xl:px-40'
        )}>
        {children}
      </div>
    </div>
  );
}
