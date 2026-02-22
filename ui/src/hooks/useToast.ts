import { useContext } from 'react';
import { AppContext, type Toast, type SetToast } from '@/context/AppContext';

export function useToast(): {
    toast: Toast;
    setToast: SetToast;
} {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useToast must be used within an AppContext.Provider');
    }

    const { toast, setToast } = context;

    return {
        toast,
        setToast,
    };
}
