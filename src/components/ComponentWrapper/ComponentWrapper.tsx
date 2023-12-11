import React from 'react';

interface IWrapperProps {
  children?: React.ReactNode;
}

export function ComponentWrapper({ children }: IWrapperProps) {
  return <div className='mb-2 sm:mb-8 xl:mb-12'>{children}</div>;
}
