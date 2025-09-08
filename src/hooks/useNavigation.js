import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    const navigateWithScroll = (path) => {
        navigate(path, { replace: false });
        // Forzar scroll inmediatamente
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    };

    return navigateWithScroll;
};
