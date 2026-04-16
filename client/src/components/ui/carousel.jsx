import React, { useState, useEffect } from 'react';

const Carousel = ({ images, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images || images.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden bg-neutral-900">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ${
                            index === currentIndex ? 'scale-110' : 'scale-100'
                        }`}
                        style={{
                            backgroundImage: `url('${img}')`,
                            backgroundBlendMode: 'overlay',
                        }}
                    >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-neutral-900/90" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Carousel;
