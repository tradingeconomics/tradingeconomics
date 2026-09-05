import { useState } from 'react';
import { LuCheck } from "react-icons/lu";
import { Fragment } from 'react/jsx-runtime';
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { Listbox, Transition } from '@headlessui/react';

type Props = {
    label: string,
    [x: string]: any,
    options: string[],
    defaultValue: string,
    onChange: (selected: string) => void;
};

const DropDown = ({ label, defaultValue, onChange, options, ...props }: Props) => {
    const [selected, setSelected] = useState(defaultValue);

    const handleChange = (selected: string) => {
        onChange(selected);
        setSelected(selected);
    };

    return (
        <Listbox value={selected} onChange={handleChange}>
            {({ open }) => (
                <div className='flex items-center justify-center gap-2 w-full'>
                    {label && <Listbox.Label className="block text-base font-normal leading-6 text-gray-900">{label}</Listbox.Label>}
                    <div className="relative w-full">
                        <Listbox.Button className={`relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light sm:text-sm sm:leading-6 ${props.className}`}>
                            <span className="block truncate">{selected}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <HiMiniChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option, index) => (
                                    <Listbox.Option key={index} value={option}
                                        className={`relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-primary-light hover:text-white`}>
                                        {({ selected }) => (
                                            <>
                                                <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                                    {option}
                                                </span>
                                                {selected &&
                                                    <span className={` absolute inset-y-0 right-0 flex items-center pr-4`}>
                                                        <LuCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                }
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    );
};

export default DropDown;
