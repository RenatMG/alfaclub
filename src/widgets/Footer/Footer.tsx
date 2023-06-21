import { Footer as AntFooter } from 'antd-mobile';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <AntFooter
            className={styles.footer}
            content={`HR Digital - Альфастрахование - ${new Date().getFullYear()}`}/>
    );
};

export default Footer;
