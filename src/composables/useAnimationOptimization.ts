export function useAnimationOptimization() {
    const requestAnimationFrameId = ref<number>();

    const animate = (callback: () => void) => {
        if (requestAnimationFrameId.value) {
            cancelAnimationFrame(requestAnimationFrameId.value);
        }
        requestAnimationFrameId.value = requestAnimationFrame(() => {
            callback();
        });
    };

    onUnmounted(() => {
        if (requestAnimationFrameId.value) {
            cancelAnimationFrame(requestAnimationFrameId.value);
        }
    });

    return {
        animate
    };
} 