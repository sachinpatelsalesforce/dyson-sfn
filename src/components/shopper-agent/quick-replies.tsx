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
import { Sparkles } from 'lucide-react';

type Chip = { label: string; nextId: string };

type Props = {
    chips: Chip[];
    onSelect: (label: string, nextId: string) => void;
};

export function QuickReplies({ chips, onSelect }: Props) {
    if (!chips.length) return null;

    return (
        <div className="flex flex-wrap gap-2 py-3">
            {chips.map((chip) => (
                <button
                    key={chip.nextId}
                    onClick={() => onSelect(chip.label, chip.nextId)}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:border-foreground/30"
                >
                    <Sparkles className="size-3 shrink-0 text-muted-foreground" />
                    {chip.label}
                </button>
            ))}
        </div>
    );
}
