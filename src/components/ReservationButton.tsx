import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationButton = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    const handleClick = () => {
        if (isHome) {
            document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/reservations');
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            aria-label="Reserve a table"
        >
            <CalendarDays size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Reserve a Table</span>
        </motion.button>
    );
};

export default ReservationButton;
