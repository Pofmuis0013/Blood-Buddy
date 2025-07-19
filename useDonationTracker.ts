
import { useState, useEffect, useMemo, useCallback } from 'react';

const DONATION_CYCLE_DAYS = 56;
const LOCAL_STORAGE_KEY_DATE = 'bloodDonation_lastDate';
const LOCAL_STORAGE_KEY_NAME = 'bloodDonation_userName';
const LOCAL_STORAGE_KEY_COUNT = 'bloodDonation_donationCount';


export const useDonationTracker = () => {
    const [lastDonationDate, setLastDonationDate] = useState<Date | null>(() => {
        try {
            const savedDate = localStorage.getItem(LOCAL_STORAGE_KEY_DATE);
            return savedDate ? new Date(savedDate) : null;
        } catch (error) {
            console.error("Could not read from localStorage", error);
            return null;
        }
    });
    
    const [userName, setUserName] = useState<string | null>(() => {
        try {
            return localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
        } catch (error) {
            console.error("Could not read name from localStorage", error);
            return null;
        }
    });

    const [donationCount, setDonationCount] = useState<number>(() => {
        try {
            const savedCount = localStorage.getItem(LOCAL_STORAGE_KEY_COUNT);
            return savedCount ? parseInt(savedCount, 10) : 0;
        } catch (error) {
            console.error("Could not read count from localStorage", error);
            return 0;
        }
    });

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const nextDonationDate = useMemo(() => {
        if (!lastDonationDate) return null;
        const nextDate = new Date(lastDonationDate);
        nextDate.setDate(nextDate.getDate() + DONATION_CYCLE_DAYS);
        return nextDate;
    }, [lastDonationDate]);

    const timeDifference = useMemo(() => {
        if (!nextDonationDate) return null;
        return nextDonationDate.getTime() - now.getTime();
    }, [nextDonationDate, now]);

    const isEligible = timeDifference !== null && timeDifference <= 0;

    const timeRemaining = useMemo(() => {
        if (timeDifference === null || timeDifference < 0) return null;
        const totalSeconds = Math.floor(timeDifference / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { days, hours, minutes, seconds };
    }, [timeDifference]);
    
    const initializeUser = useCallback(({ name, count, date }: { name: string; count: number; date: Date }) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0); // Normalize to the start of the day
        
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY_NAME, name);
            localStorage.setItem(LOCAL_STORAGE_KEY_COUNT, count.toString());
            localStorage.setItem(LOCAL_STORAGE_KEY_DATE, newDate.toISOString());
            setUserName(name);
            setDonationCount(count);
            setLastDonationDate(newDate);
        } catch (error) {
            console.error("Could not write to localStorage", error);
        }
    }, []);


    const recordDonationToday = useCallback(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newCount = donationCount + 1;
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY_DATE, today.toISOString());
            localStorage.setItem(LOCAL_STORAGE_KEY_COUNT, newCount.toString());
            setLastDonationDate(today);
            setDonationCount(newCount);
        } catch (error) {
            console.error("Could not write to localStorage", error);
        }
    }, [donationCount]);

    const resetData = useCallback(() => {
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY_DATE);
            localStorage.removeItem(LOCAL_STORAGE_KEY_NAME);
            localStorage.removeItem(LOCAL_STORAGE_KEY_COUNT);
            setLastDonationDate(null);
            setUserName(null);
            setDonationCount(0);
        } catch (error) {
            console.error("Could not remove from localStorage", error);
        }
    }, []);

    return {
        lastDonationDate,
        nextDonationDate,
        timeRemaining,
        daysUntilNext: timeRemaining?.days,
        isEligible,
        userName,
        donationCount,
        initializeUser,
        recordDonationToday,
        resetData
    };
};
