import { onMounted, onUnmounted } from 'vue';

export function useSwipeNavigation(
    onSwipeLeft: () => void,
    onSwipeRight: () => void
) {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
        touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                onSwipeRight();
            } else {
                onSwipeLeft();
            }
        }
    };

    onMounted(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    });

    onUnmounted(() => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    });
} 