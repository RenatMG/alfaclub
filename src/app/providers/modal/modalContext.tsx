import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react';

export type ModalContentType = 'CREATE' | 'UPDATE' | null;
export type setContentType = Dispatch<SetStateAction<ModalContentType>>;

interface ContextProps {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    contentType: ModalContentType;
    setContentType: setContentType;
}

const initialContext = {
    open: false
};
export const ModalContext = createContext<ContextProps>(initialContext as ContextProps);
export const useModal = () => useContext(ModalContext);

const ModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [contentType, setContentType] = useState<ModalContentType>(null);

    const onClose = () => {
        setOpen(false);
        setContentType(null);
    };
    const onOpen = () => setOpen(true);

    const context = {
        open,
        onOpen,
        onClose,
        contentType,
        setContentType
    };
    return (
        <ModalContext.Provider value={context}> {children} </ModalContext.Provider>
    );
};
export default ModalContextProvider;
