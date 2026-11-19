/**
 * Copyright 2026 Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'left' | 'none';
    className?: string;
    once?: boolean;
}

export function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className,
    once = true,
}: ScrollRevealProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    const initial = {
        opacity: 0,
        y: direction === 'up' ? 24 : 0,
        x: direction === 'left' ? -24 : 0,
    };

    const animate = { opacity: 1, y: 0, x: 0 };

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
            className={className}>
            {children}
        </motion.div>
    );
}

export default ScrollReveal;
