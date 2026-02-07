import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";

export default function VantaBirds() {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Determine mobile state immediately
        if (isMobile) {
            if (vantaEffect) vantaEffect.destroy();
            return;
        }

        if (!vantaEffect) {
            setVantaEffect(
                BIRDS({
                    el: vantaRef.current,
                    THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200,
                    minWidth: 200,
                    scale: 1,
                    scaleMobile: 1,

                    backgroundColor: 0xffffff,
                    color1: 0xbe91ff,
                    color2: 0x6800ff,
                    colorMode: "lerpGradient",

                    birdSize: 0.8,
                    wingSpan: 40,
                    speedLimit: 7,
                    separation: 20,
                    alignment: 20,
                    cohesion: 2,
                    quantity: 4,
                })
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect, isMobile]);

    if (isMobile) return null;

    return (
        <div className="absolute inset-0 z-0">
            {/* Vanta Canvas */}
            <div ref={vantaRef} className="absolute inset-0" />

            {/* 35% transparency overlay */}
            <div className="absolute inset-0 bg-white/35 pointer-events-none" />
        </div>
    );
}
