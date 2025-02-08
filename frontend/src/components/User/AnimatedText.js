import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import customs from '../../assets/customs.mp4' 


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <div className='ml-64'>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-50">
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Manage the Movement of Goods
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Act as an intermediary between businesses and government agencies to facilitate smooth customs processes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/ShipPage"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <Dialog open={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-4">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <video className="rounded-lg w-full max-w-2xl" controls autoPlay>
              <source src={customs} type="video/mp4" />
            </video>
          </div>
        </Dialog>
      )}
    </div>
  )
}
