import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BBtn from "@/components/dls/BBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function InfoDialog({ isOpen, onClose }) {
  const closeBtnRef = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}
        initialFocus={closeBtnRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-xl border-2 border-solid border-secondary bg-primary-dark p-6 text-start text-sm text-grey-200 shadow-xl transition-all">
                <div className="flex items-start justify-between">
                  <Dialog.Title as="h3" className="text-lg font-medium text-white">
                    درباره برنومز
                  </Dialog.Title>
                  <button
                    ref={closeBtnRef}
                    aria-label="بستن"
                    onClick={onClose}
                    className="left-4 top-4 absolute grid h-8 w-8 place-items-center rounded-md text-grey-200 transition-colors hover:bg-white/10"
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </button>
                </div>

                <Dialog.Description as="div" className="mt-3 space-y-4" dir="rtl">
                  <p>
                    برنومز ابزار برنامه‌ریزی برای دانشجویان دانشگاه صنعتی شریف است تا بتوانند برای ترم‌های خود سریع‌تر و دقیق‌تر برنامه بسازند و مدیریت کنند.
                  </p>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <h4 className="mb-2 text-sm font-medium text-white">امکانات کلیدی</h4>
                    <ul className="list-disc space-y-1 pe-6 ps-3">
                      <li>ساخت و مدیریت چندین برنامه درسی</li>
                      <li>افزودن و حذف درس‌ها با نمایش زمان‌بندی روی تقویم</li>
                      <li>خروجی گرفتن همه برنامه‌ها به فرمت JSON</li>
                      <li>وارد کردن برنامه‌ها از فایل JSON و ادغام یا جایگزینی</li>
                      <li>خروجی تصویر از برنامهٔ فعلی برای اشتراک‌گذاری</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <h4 className="mb-2 text-sm font-medium text-white">تیم برنومز</h4>
                    <ul className="list-disc space-y-1 pe-6 ps-3">
                      <li>مهدی سعادت بخت</li>
                      <li>هیربد بهنام</li>
                      <li>سهیل نظری</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <h4 className="mb-2 text-sm font-medium text-white">پشتیبانی و ارتباط</h4>
                    <p className="leading-7">اگر پیشنهاد یا مشکلی دارید از طریق تلگرام پیام دهید:</p>
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="https://t.me/ns1934"
                        target="_blank"
                        rel="noreferrer"
                        dir="ltr"
                        className="text-[#60a5fa] hover:underline"
                      >
                        @ns1934
                      </a>
                      <div className="flex items-center gap-2">
                        <BBtn
                          to="https://t.me/barnomzchie"
                          target="_blank"
                          icon={faTelegram}
                          className="h-8 w-8 !p-0 rounded-md text-grey-200 hover:bg-white/10"
                          color="transparent"
                          aria-label="کانال تلگرام برنومز"
                        />
                        <BBtn
                          to="https://github.com/barnomz/barnomz"
                          target="_blank"
                          icon={faGithub}
                          className="h-8 w-8 !p-0 rounded-md text-grey-200 hover:bg-white/10"
                          color="transparent"
                          aria-label="گیت‌هاب برنومز"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-grey-200/80">
                    ممکن است اطلاعات درسی تغییر کند. برای اطمینان همواره به منابع رسمی آموزشی مراجعه کنید.
                  </p>
                </Dialog.Description>

                <div className="mt-5 flex items-center justify-end">
                  <BBtn color="ghost" className="h-10" onClick={onClose}>
                    بستن
                  </BBtn>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
