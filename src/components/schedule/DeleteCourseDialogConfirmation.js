import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import BBtn from '@/components/dls/BBtn'

export default function DeleteCourseDialogConfirmation({
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50 backdrop-blur' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-xl border-2 border-solid border-secondary bg-primary-dark p-6 text-white shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='w-full text-start text-lg font-medium'
                >
                  حذف درس
                </Dialog.Title>
                <div className='mt-2 w-full'>
                  <p className='text-start text-sm text-grey-200'>
                    آیا از حذف این درس اطمینان دارید؟
                  </p>
                </div>

                <div className='mt-4 flex w-full items-center justify-end gap-4'>
                  <BBtn color='ghost' className='h-8 w-28' onClick={onClose}>
                    انصراف
                  </BBtn>
                  <BBtn className='h-8 w-28' onClick={onConfirm}>
                    حذف
                  </BBtn>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
