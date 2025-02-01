export function useHapticFeedback() {
    const vibrate = (pattern: number | number[]) => {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    };

    const lightTap = () => vibrate(10);
    const mediumTap = () => vibrate(20);
    const heavyTap = () => vibrate([30, 50, 30]);
    const error = () => vibrate([50, 100, 50, 100]);

    return {
        lightTap,
        mediumTap,
        heavyTap,
        error
    };
} 