import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Map Shadcn color names to actual Tailwind classes
const colorMap: Record<string, string> = {
  'bg-background': 'bg-slate-950',
  'text-background': 'text-slate-950',
  'bg-foreground': 'bg-slate-100',
  'text-foreground': 'text-slate-100',
  'bg-card': 'bg-slate-900',
  'text-card': 'text-slate-900',
  'text-card-foreground': 'text-slate-100',
  'bg-popover': 'bg-slate-900',
  'text-popover-foreground': 'text-slate-100',
  'bg-primary': 'bg-slate-100',
  'text-primary': 'text-slate-100',
  'bg-primary-foreground': 'bg-slate-950',
  'text-primary-foreground': 'text-slate-950',
  'bg-secondary': 'bg-slate-700',
  'text-secondary-foreground': 'text-slate-100',
  'bg-muted': 'bg-slate-700',
  'text-muted-foreground': 'text-slate-400',
  'bg-accent': 'bg-slate-700',
  'text-accent-foreground': 'text-slate-100',
  'bg-destructive': 'bg-red-600',
  'text-destructive-foreground': 'text-slate-100',
  'border-border': 'border-slate-700',
  'bg-input': 'bg-slate-700',
  'ring-ring': 'ring-slate-400',
};

export function cn(...inputs: ClassValue[]) {
  const classes = clsx(inputs);

  // Replace Shadcn color classes with Tailwind equivalents
  let result = classes;
  for (const [key, value] of Object.entries(colorMap)) {
    result = result.replace(new RegExp(key, 'g'), value);
  }

  return twMerge(result);
}
