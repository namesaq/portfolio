import { ref, watch } from 'vue';

export function useTheme() {
    const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleTheme = () => {
        isDark.value = !isDark.value;
        updateTheme();
    };

    const updateTheme = () => {
        document.documentElement.classList.toggle('dark-theme', isDark.value);
    };

    watch(isDark, updateTheme, { immediate: true });

    return {
        isDark,
        toggleTheme
    };
} 