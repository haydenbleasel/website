'use client';

import { Fragment, forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import Label from './label';
import type { ElementRef, ComponentPropsWithoutRef } from 'react';

type SelectProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  placeholder: string;
  label?: string;
  data: {
    label: string;
    items: {
      value: string;
      label: string;
      disabled?: boolean;
    }[];
  }[];
};

const Select = forwardRef<ElementRef<typeof SelectPrimitive.Root>, SelectProps>(
  ({ placeholder, data, ...props }, ref) => (
    <div className="grid w-full items-center gap-1.5">
      {props.label && <Label>{props.label}</Label>}
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={ref}
          className="dark:focus:ring-offset-neutral-900', flex h-10 w-full items-center justify-between rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-50 dark:focus:ring-neutral-400"
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-100 bg-white text-neutral-700 shadow-md animate-in fade-in-80 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
            <SelectPrimitive.Viewport className="p-1">
              {data.map((group, index) => (
                <Fragment key={group.label}>
                  <SelectPrimitive.Group>
                    {data.length > 1 && (
                      <SelectPrimitive.Label className="py-1.5 pl-8 pr-2 text-sm font-semibold text-neutral-900 dark:text-neutral-300">
                        {group.label}
                      </SelectPrimitive.Label>
                    )}
                    {group.items.map((item) => (
                      <SelectPrimitive.Item
                        value={item.value}
                        key={item.value}
                        disabled={item.disabled}
                        className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-medium outline-none focus:bg-neutral-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-700"
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          <SelectPrimitive.ItemIndicator>
                            <CheckIcon className="h-4 w-4" />
                          </SelectPrimitive.ItemIndicator>
                        </span>

                        <SelectPrimitive.ItemText>
                          {item.label}
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Group>
                  {data.length > 1 && index < data.length - 1 && (
                    <SelectPrimitive.Separator className="-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-700" />
                  )}
                </Fragment>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
);
Select.displayName = SelectPrimitive.Trigger.displayName;

export default Select;
