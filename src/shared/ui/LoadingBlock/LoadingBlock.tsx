import { SpinLoading } from 'antd-mobile';
import styles from './LoadingBlock.module.scss';

const LoadingBlock = () => {
    return (
        <div className={styles.loading}>
            <SpinLoading color="primary" />
        </div>
    );
};

export default LoadingBlock;
