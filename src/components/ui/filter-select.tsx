'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  icon,
  className,
}: FilterSelectProps) {
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={cn('relative', className)}>
      <label className='block text-sm font-medium text-slate-700 mb-2'>
        <div className='flex items-center gap-2'>
          {icon && <div className='text-blue-600'>{icon}</div>}
          {label}
        </div>
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-pointer rounded-lg bg-white py-3 pl-4 pr-10 text-left shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-300 transition-colors'>
            <span className='block truncate text-slate-900 font-medium'>
              {selectedOption.label}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <ChevronDownIcon
                className='h-4 w-4 text-slate-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-200'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-3 pl-4 pr-4 transition-colors',
                      active
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-slate-900 hover:bg-slate-50'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <span
                      className={cn(
                        'block truncate',
                        selected ? 'font-semibold text-blue-600' : 'font-normal'
                      )}
                    >
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

interface MultiSelectProps {
  label: string;
  values: string[];
  options: Option[];
  onChange: (values: string[]) => void;
  icon?: React.ReactNode;
  className?: string;
}

export function MultiSelect({
  label,
  values,
  options,
  onChange,
  icon,
  className,
}: MultiSelectProps) {
  const handleToggle = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  const displayText =
    values.length === 0
      ? 'Select options...'
      : values.length === 1
      ? options.find((opt) => opt.value === values[0])?.label || values[0]
      : `${values.length} selected`;

  return (
    <div className={cn('relative', className)}>
      <label className='block text-sm font-medium text-slate-700 mb-2'>
        <div className='flex items-center gap-2'>
          {icon && <div className='text-blue-600'>{icon}</div>}
          {label}
        </div>
      </label>

      <Listbox value={values} onChange={onChange} multiple>
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-pointer rounded-lg bg-white py-3 pl-4 pr-10 text-left shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-300 transition-colors'>
            <span className='block truncate text-slate-900 font-medium'>
              {displayText}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <ChevronDownIcon
                className='h-4 w-4 text-slate-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-200'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-3 pl-8 pr-4 transition-colors',
                      active
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-slate-900 hover:bg-slate-50'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          checked={selected}
                          onChange={() => handleToggle(option.value)}
                          className='absolute left-3 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                        />
                        <span
                          className={cn(
                            'block truncate ml-3',
                            selected
                              ? 'font-semibold text-blue-600'
                              : 'font-normal'
                          )}
                        >
                          {option.label}
                        </span>
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
