import { WatchOptions } from "../../constants/constants";
import { LuChevronsUpDown } from "react-icons/lu";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsCheck } from "react-icons/bs";
/* ====================================================== */

export default function Dropdown({ selected, setSelected }) {
  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-3">
          <Listbox.Button className="relative w-full max-w-sm py-3 pl-3 pr-10 text-left bg-transparent border-2 rounded-md shadow-md cursor-pointer border-DimeGray ">
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <LuChevronsUpDown size={20} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full max-w-sm py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-MidnightGray max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {WatchOptions.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-DarkGray text-Crimson" : "text-LightGrey"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium text-Crimson" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-Crimson">
                          <BsCheck size={20} />
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
    </div>
  );
}
