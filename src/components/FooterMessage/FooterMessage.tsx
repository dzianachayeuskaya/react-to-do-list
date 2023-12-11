import styles from './footermessage.module.css';
import { EIcons, Icon } from '../Icon';
import classNames from 'classnames';

export function FooterMessage() {
  return (
    <div className='flex justify-center items-center'>
      <div className='mr-2'>
        <Icon name={EIcons.footerImage} />
      </div>
      <span className={classNames(styles.footerMessage, 'text-sm leading-4')}>
        Congrats, you have no more tasks to do
      </span>
    </div>
  );
}
