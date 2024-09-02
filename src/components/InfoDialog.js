import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BBtn from "@/components/dls/BBtn";

export default function InfoDialog({ isOpen, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl border-2 border-solid border-secondary bg-primary-dark p-6 text-start text-sm text-grey-200 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="w-full text-lg font-medium text-white"
                >
                  درباره ما
                </Dialog.Title>
                <div className="mt-2 w-full">
                  <p>
                    برنومز یک ابزار کارآمد برای دانشجویان دانشگاه صنعتی شریف است
                    تا بتوانند به راحتی برنامه‌ریزی دقیق‌تری برای ترم آتی خود
                    داشته باشند. این نرم‌افزار به شما امکان می‌دهد تا دروس مورد
                    نظر خود را انتخاب کرده و برنامه‌های درسی خود را به شکلی منظم
                    مدیریت کنید.
                  </p>
                </div>
                <Dialog.Title
                  as="h3"
                  className="mt-4 w-full text-lg font-medium text-white"
                >
                  تیم برنومز
                </Dialog.Title>
                <ul className="prose-invert mt-2">
                  <li> - مهدی سعادت بخت</li>
                  <li> - هیربد بهنام</li>
                  <li> - سهیل نظری</li>
                </ul>
                <p className="mt-4 text-start text-sm text-grey-200">
                  اگر پیشنهاد، ایراد یا هر موضوع دیگری دارید، می‌توانید از طریق
                  تلگرام با من در ارتباط باشید:
                </p>
                <div className="flex items-center justify-end">
                  <a
                    href="https://t.me/mhdisdt"
                    target="_blank"
                    dir="ltr"
                    className="text-[#3b82f6]"
                  >
                    @mhdisdt
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
