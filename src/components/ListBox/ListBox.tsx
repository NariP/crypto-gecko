import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface Option {
  id: string;
  label: string;
  unavailable?: boolean;
}

interface ListBoxProps<O extends Option> {
  selected: O;
  options: O[];
  onChange: (option: O) => void;
  className?: string;
}

const ListBox = <O extends Option>({ selected, options, onChange, className }: ListBoxProps<O>) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className={clsx('relative', className)}>
        <Listbox.Button className="relative md:min-w-[200px] w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md shadow-gray-100 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-label1-bold md:text-body1-bold hover:cursor-pointer">
          <span className="block truncate text-gray-900">{selected.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 fill-gray-900" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none hover:cursor-pointer text-label1-bold md:text-body1-bold">
            {options.map(option => (
              <Listbox.Option
                key={option.id}
                value={option}
                disabled={option.unavailable}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      title={option.label}
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5 fill-base-primary" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBox;
