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
import { useTranslation } from 'react-i18next';

function ShieldIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11 4.5-.85 8-5.75 8-11V6l-8-4z" />
        </svg>
    );
}

function TruckIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <path d="M16 8h4l3 3v5h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
    );
}

function ReturnIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 14l-4-4 4-4" />
            <path d="M5 10h11a4 4 0 0 1 0 8h-1" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

const ITEMS = [
    { key: 'warranty', Icon: ShieldIcon },
    { key: 'delivery', Icon: TruckIcon },
    { key: 'returns', Icon: ReturnIcon },
    { key: 'secure', Icon: LockIcon },
] as const;

export default function TrustRow() {
    const { t } = useTranslation('trust');

    return (
        <div className="bg-dark-band py-8">
            <ul className="section-container grid grid-cols-2 lg:grid-cols-4 gap-6">
                {ITEMS.map(({ key, Icon }) => (
                    <li key={key} className="flex items-start gap-3">
                        <span className="text-foreground/60 mt-0.5 shrink-0">
                            <Icon />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                {t(`${key}.label`)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {t(`${key}.sub`)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
