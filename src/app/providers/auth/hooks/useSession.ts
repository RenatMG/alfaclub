import { useEffect } from 'react';

const useSession = ({ callback, expireTime = 1800000 }: { callback: () => void; expireTime: number }): void => {

    useEffect(() => {
        const updateExpireTime = () => {
            const time = Date.now() + expireTime;
            localStorage.setItem('expireTime', time.toString());
        };
        
        updateExpireTime();
        window.addEventListener('click', updateExpireTime);
        window.addEventListener('scroll', updateExpireTime);
        window.addEventListener('keypress', updateExpireTime);
        window.addEventListener('mousemove', updateExpireTime);
        return () => {
            window.removeEventListener('click', updateExpireTime);
            window.removeEventListener('scroll', updateExpireTime);
            window.removeEventListener('keypress', updateExpireTime);
            window.removeEventListener('mousemove', updateExpireTime);
        };
    }, [expireTime]);

    useEffect(() => {

        const checkForInactivity = () => {
            const expireTime = localStorage.getItem('expireTime');
            const now = Date.now();
            if (expireTime && +expireTime < now) {
                callback();
            }
        };

        const interval = setInterval(() => {
            checkForInactivity();
        }, 5000);
        return () => clearInterval(interval);
    }, [callback]);

    return;
};

export default useSession;
