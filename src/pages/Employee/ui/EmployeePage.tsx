import styles from './EmployeePage.module.scss';
import { collection } from "firebase/firestore";
import { firestore } from '../../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Avatar, List } from 'antd-mobile';
import { LoadingBlock } from '../../../shared/ui/LoadingBlock';
import { ContentContainer } from '../../../shared/ui/ContentContainer';

const EmployeePage = () => {

    const [values, loading] = useCollectionData(
        collection(firestore, 'users'));

    if (loading) {
        return <LoadingBlock />;
    }
    return (
        <ContentContainer>
            <List className={styles.list}>
                {
                    values?.map((employee) => {
                        const { name, surname, photo, position, email, id } = employee;
                        return (
                            <List.Item
                                key={id || email}
                                prefix={<Avatar src={photo || ''} />}
                                description={position || ''}
                            >
                                {surname} {name}
                            </List.Item>
                        );
                    })
                }

            </List>
        </ContentContainer>
    );
};

export default EmployeePage;
