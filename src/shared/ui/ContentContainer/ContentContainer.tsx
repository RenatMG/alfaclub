import styles from './ContentContainer.module.scss';
import { FC, PropsWithChildren } from 'react';

const ContentContainer:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default ContentContainer;
