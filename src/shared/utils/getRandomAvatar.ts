export type Sex = 'men' | 'women';

export const getRandomAvatar = (sex: Sex = 'men', id: number = 1) => {
    return `https://randomuser.me/api/portraits/${sex}/${id}.jpg`;
};