export function useImageOptimization() {
    const optimizeImage = (url: string, width: number) => {
        // Здесь можно добавить логику для оптимизации изображений
        // Например, использовать сервис типа Cloudinary или свой бэкенд
        return `${url}?w=${width}&q=80`;
    };

    const preloadImage = (url: string) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = reject;
            img.src = url;
        });
    };

    return {
        optimizeImage,
        preloadImage
    };
} 