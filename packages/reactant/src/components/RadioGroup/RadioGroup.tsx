import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cs } from '../../utils/cs';

type RadioIndicatorType = typeof RadioGroupPrimitive.Indicator;

export const RadioIndicator = forwardRef<
  ElementRef<RadioIndicatorType>,
  ComponentPropsWithRef<RadioIndicatorType>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Indicator
      className={cs('bg-plue-primary h-2 w-2 rounded-full bg-white', className)}
      {...props}
      ref={ref}
    >
      {children}
    </RadioGroupPrimitive.Indicator>
  );
});

type RadioItemType = typeof RadioGroupPrimitive.Item;

export const RadioItem = forwardRef<
  ElementRef<RadioItemType>,
  ComponentPropsWithRef<RadioItemType>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cs(
        'flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200',
        'hover:border-blue-secondary',
        'focus:ring-primary-blue/20 focus:border-blue-primary focus:outline-none focus:ring-4',
        'focus:hover:border-blue-secondary',
        'radix-state-checked:border-blue-primary radix-state-checked:bg-blue-primary',
        'radix-state-checked:hover:border-blue-secondary radix-state-checked:hover:bg-blue-secondary',
        'disabled:pointer-events-none disabled:bg-gray-100',
        'radix-state-checked:disabled:border-gray-400 radix-state-checked:disabled:bg-gray-400',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children || <RadioIndicator />}
    </RadioGroupPrimitive.Item>
  );
});

type RadioGroupType = typeof RadioGroupPrimitive.Root;

export const RadioGroup = forwardRef<
  ElementRef<RadioGroupType>,
  ComponentPropsWithRef<RadioGroupType>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root className={cs(className)} ref={ref} {...props}>
      {children}
    </RadioGroupPrimitive.Root>
  );
});