import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
    text,
    className = '',
    delay = 30,
    duration = 0.8,
    ease = 'power3.out',
    splitType = 'chars,words',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'inherit',
    tag: Tag = 'span',
    onAnimationComplete
}) => {
    const ref = useRef(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (document.fonts.status === 'loaded') {
            setFontsLoaded(true);
        } else {
            document.fonts.ready.then(() => {
                setFontsLoaded(true);
            });
            // Fallback timeout
            timeoutId = setTimeout(() => {
                setFontsLoaded(true);
            }, 1500);
        }
        return () => clearTimeout(timeoutId);
    }, []);

    useGSAP(
        () => {
            if (!ref.current || !text || !fontsLoaded) return;

            const el = ref.current;
            const splitInstance = new SplitType(el, {
                types: splitType,
                tagName: 'span',
            });

            let targets = [];
            if (splitType.includes('chars')) targets = splitInstance.chars;
            else if (splitType.includes('words')) targets = splitInstance.words;
            else if (splitType.includes('lines')) targets = splitInstance.lines;

            if (!targets || targets.length === 0) return;

            gsap.fromTo(
                targets,
                { ...from },
                {
                    ...to,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    scrollTrigger: {
                        trigger: el,
                        start: `top 85%`,
                        once: true,
                    },
                    onComplete: () => {
                        onAnimationComplete?.();
                    },
                    willChange: 'transform, opacity',
                    force3D: true
                }
            );

            return () => {
                splitInstance.revert();
            };
        },
        {
            dependencies: [text, fontsLoaded, splitType],
            scope: ref
        }
    );

    return (
        <Tag
            ref={ref}
            style={{
                textAlign,
                display: Tag === 'span' ? 'inline' : 'block',
                whiteSpace: 'normal',
                visibility: fontsLoaded ? 'visible' : 'hidden',
                color: 'inherit'
            }}
            className={`split-parent ${className}`}
        >
            {text}
        </Tag>
    );
};

export default SplitText;
