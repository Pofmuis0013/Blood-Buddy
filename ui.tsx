
import React from 'react';
import type { ReactNode } from 'react';

// ====== Layout ======

interface CardProps {
    children: ReactNode;
    className?: string;
}
export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8 ${className}`}>
        {children}
    </div>
);


// ====== Icons ======

export const BloodDropIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 11.25 9.75 11.25S21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25Z" />
    </svg>
);

export const CalendarIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const InfoIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CheckCircleIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ClockIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const SparklesIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
);

export const DonationCounterIcon = ({ count, isUpsideDown }: { count: number, isUpsideDown: boolean }) => (
    <div className={`relative inline-flex items-center justify-center mb-2 transition-transform duration-700 ease-in-out ${isUpsideDown ? 'rotate-180' : ''}`}>
        <BloodDropIcon className="h-24 w-24 text-red-500" />
        <span className={`absolute text-white text-3xl font-bold drop-shadow-md transition-transform duration-700 ease-in-out ${isUpsideDown ? 'rotate-180' : ''}`}>
            {count}
        </span>
    </div>
);


// ====== Functional Components ======

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownItem = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center justify-center bg-red-50 dark:bg-slate-700 rounded-lg p-3">
        <span className="text-3xl font-bold text-red-600 dark:text-red-400">{value.toString().padStart(2, '0')}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{label}</span>
    </div>
);

export const CountdownDisplay = ({ timeRemaining }: { timeRemaining: TimeRemaining | null }) => {
    if (!timeRemaining) return null;
    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <CountdownItem value={timeRemaining.days} label="Days" />
            <CountdownItem value={timeRemaining.hours} label="Hours" />
            <CountdownItem value={timeRemaining.minutes} label="Mins" />
            <CountdownItem value={timeRemaining.seconds} label="Secs" />
        </div>
    );
};


export const ReminderMessage = ({ daysUntilNext }: { daysUntilNext: number | undefined | null }) => {
    if (daysUntilNext === null || daysUntilNext === undefined || daysUntilNext > 3 || daysUntilNext < 0) {
        return null;
    }
    let message = '';
    if (daysUntilNext <= 1) message = "Donation day is tomorrow! Prepare to be a hero.";
    else if (daysUntilNext <= 2) message = "Only 2 days to go! Hydrate well.";
    else if (daysUntilNext <= 3) message = "Just 3 days left until you can donate again.";
    
    return (
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-400 text-yellow-700 dark:text-yellow-300 rounded-r-lg">
            <div className="flex">
                <InfoIcon className="h-5 w-5 text-yellow-500 mr-3" />
                <p className="text-sm font-medium">{message}</p>
            </div>
        </div>
    );
};

export const Confetti = () => (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#ef4444', '#f97316', '#facc15', '#eab308'][Math.floor(Math.random() * 4)],
                width: `${Math.random() * 8 + 6}px`,
                height: `${Math.random() * 8 + 6}px`,
                animationDelay: `${Math.random() * 3}s`,
            };
            return <div key={i} style={style} className="absolute top-0 rounded-full confetti-piece"></div>;
        })}
    </div>
);
