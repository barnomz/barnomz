import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function CollegeCombobox({
  colleges,
  selectedCollege,
  onSelect,
}) {
  const [query, setQuery] = useState("");

  const filteredColleges =
    query === ""
      ? colleges
      : colleges.filter((college) => college.name.match(query));

  const handleSelect = (college) => {
    onSelect(college);
  };

  return (
    <Combobox value={selectedCollege} onChange={handleSelect}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded bg-primary text-left shadow-md focus-within:ring-1 focus-within:ring-secondary">
          <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-2">
            <FontAwesomeIcon
              icon={faChevronCircleDown}
              className="h-6 w-6 text-grey-400"
              aria-hidden="true"
              size="lg"
            />
          </Combobox.Button>
          <Combobox.Input
            className="placeholder:text-grey-30 h-[57px] w-full border-none py-2 pl-10 pr-3 focus:ring-0 focus-visible:outline-none"
            displayValue={(college) => college?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="دانشکده را انتخاب نمایید."
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-dark py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredColleges.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-grey-100">
                نتیجه‌ای یافت نشد.
              </div>
            ) : (
              filteredColleges.map((college) => (
                <Combobox.Option
                  key={college.code}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary-light text-white" : "text-gray-900"
                    }`
                  }
                  value={college}
                >
                  {({ selected }) => (
                    <>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                      <div
                        className={`mr-6 block truncate ${
                          selected
                            ? "font-medium text-secondary"
                            : "font-normal text-grey-100"
                        }`}
                      >
                        {college?.name}
                      </div>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
