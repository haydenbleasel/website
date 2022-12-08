import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  ScrollUpButton,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  ScrollDownButton,
} from '@radix-ui/react-select';
import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import type { FC } from 'react';
import { useId } from 'react';
import LabelComponent from './label';

type SelectProps = {
  options: {
    label: string;
    value: string;
  }[];
  selected: SelectProps['options'][number]['value'];
  onChangeSelected: (value: string) => void;
  label?: string;
};

const Select: FC<SelectProps> = ({
  label,
  selected,
  onChangeSelected,
  options,
}) => {
  const activeValue = options.find((option) => option.value === selected);
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {label && <LabelComponent htmlFor={id}>{label}</LabelComponent>}

      <Root value={selected} onValueChange={onChangeSelected}>
        <Trigger
          className={clsx(
            'relative flex w-full cursor-pointer items-center justify-between rounded-md border py-[6px] px-3 text-left shadow-sm focus:outline-none focus:ring-1',
            'border-zinc-300 bg-white focus:border-teal-500 focus:ring-teal-500',
            'dark:border-zinc-600 dark:bg-zinc-900 dark:focus:border-teal-400 dark:focus:ring-teal-400'
          )}
        >
          <Value className="block truncate">{activeValue?.label}</Value>
          <Icon>
            <ChevronDown
              className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
              aria-hidden="true"
              size={20}
            />
          </Icon>
        </Trigger>

        <Portal>
          <Content
            className={clsx(
              'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              'bg-white',
              'dark:border dark:border-zinc-600 dark:bg-zinc-900'
            )}
          >
            <ScrollUpButton />
            <Viewport>
              {options.map((option) => (
                <Item
                  value={option.value}
                  key={option.value}
                  className={clsx(
                    option.value === selected
                      ? 'bg-teal-500 text-white hover:bg-teal-600'
                      : 'text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800',
                    'group relative cursor-pointer select-none py-2 pl-3 pr-9 outline-none transition-colors'
                  )}
                >
                  <ItemText
                    className={clsx(
                      option.value === selected
                        ? 'font-semibold'
                        : 'font-normal',
                      'block truncate'
                    )}
                  >
                    {option.label}
                  </ItemText>
                  <ItemIndicator>
                    <Check
                      aria-hidden="true"
                      className={clsx(
                        'absolute inset-y-0 right-0 flex h-5 w-5 items-center pr-4',
                        option.value === 'selected'
                          ? 'text-white dark:text-zinc-900'
                          : 'text-teal-600 dark:text-teal-400'
                      )}
                    />
                  </ItemIndicator>
                </Item>
              ))}
            </Viewport>
            <ScrollDownButton />
          </Content>
        </Portal>
      </Root>
    </div>
  );
};

export default Select;
