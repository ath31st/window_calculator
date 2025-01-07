import React from 'react';
import styles from './OrSpacer.module.css';

interface OrSpacerProps {
  isVertical?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

const OrSpacer: React.FC<OrSpacerProps> = () => {
  return (
    <div className={`${styles['or-spacer']}`}>
      <div className={styles.mask}></div>
    </div>
  );
};

export default OrSpacer;
