import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { ErrorMessage, Field, Form, Formik } from 'formik';


const Currency = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Configurator/Add Currency" />
            <div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                {/* <!-- Contact Form --> */}
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Add Currency
                                        </h3>
                                    </div>
                                    <form action="#">
                                        <div className="p-6.5">

                                            <div className="mb-4.5 flex flex-wrap gap-6">
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Currency</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter currency"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>

                                            </div>



                                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                                Add Currency
                                            </button>
                                        </div>

                                    </form>



                                    <div class="container mx-auto px-4 sm:px-8">
                                        <div class="py-8">
                                            <div>
                                                <h2 class="text-2xl font-semibold leading-tight">View Currencies</h2>
                                            </div>
                                            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                                <div
                                                    class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                                                >
                                                    <table class="min-w-full leading-normal">
                                                        <thead>
                                                            <tr>
                                                                <th
                                                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                                >
                                                                    SNO
                                                                </th>
                                                                <th
                                                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                                >
                                                                    Name
                                                                </th>
                                                                <th
                                                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                                >
                                                                    Action
                                                                </th>
                                                                <th
                                                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                                >
                                                                    Status
                                                                </th>
                                                                <th
                                                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                                                ></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <div class="flex">
                                                                        <div class="flex-shrink-0 w-10 h-10">
                                                                            <img
                                                                                class="w-full h-full rounded-full"
                                                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div class="ml-3">
                                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                                Molly Sanders
                                                                            </p>
                                                                            <p class="text-gray-600 whitespace-no-wrap">000004</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">USD</p>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <span
                                                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                                    >
                                                                        <span
                                                                            aria-hidden
                                                                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                                        ></span>
                                                                        <span class="relative">Paid</span>
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        class="inline-block text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <svg
                                                                            class="inline-block h-6 w-6 fill-current"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <div class="flex">
                                                                        <div class="flex-shrink-0 w-10 h-10">
                                                                            <img
                                                                                class="w-full h-full rounded-full"
                                                                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div class="ml-3">
                                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                                Michael Roberts
                                                                            </p>
                                                                            <p class="text-gray-600 whitespace-no-wrap">000003</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">$214,000</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">USD</p>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">Sept 25, 2019</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">Due in 6 days</p>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <span
                                                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                                    >
                                                                        <span
                                                                            aria-hidden
                                                                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                                        ></span>
                                                                        <span class="relative">Paid</span>
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        class="inline-block text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <svg
                                                                            class="inline-block h-6 w-6 fill-current"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <div class="flex">
                                                                        <div class="flex-shrink-0 w-10 h-10">
                                                                            <img
                                                                                class="w-full h-full rounded-full"
                                                                                src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div class="ml-3">
                                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                                Devin Childs
                                                                            </p>
                                                                            <p class="text-gray-600 whitespace-no-wrap">000002</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">USD</p>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">Sept 14, 2019</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">Due in 2 weeks</p>
                                                                </td>
                                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <span
                                                                        class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
                                                                    >
                                                                        <span
                                                                            aria-hidden
                                                                            class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                                                                        ></span>
                                                                        <span class="relative">Pending</span>
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        class="inline-block text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <svg
                                                                            class="inline-block h-6 w-6 fill-current"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-5 py-5 bg-white text-sm">
                                                                    <div class="flex">
                                                                        <div class="flex-shrink-0 w-10 h-10">
                                                                            <img
                                                                                class="w-full h-full rounded-full"
                                                                                src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div class="ml-3">
                                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                                Frederick Nicholas
                                                                            </p>
                                                                            <p class="text-gray-600 whitespace-no-wrap">000001</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-5 py-5 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">$12,000</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">USD</p>
                                                                </td>
                                                                <td class="px-5 py-5 bg-white text-sm">
                                                                    <p class="text-gray-900 whitespace-no-wrap">Sept 6, 2019</p>
                                                                    <p class="text-gray-600 whitespace-no-wrap">
                                                                        Due 3 weeks ago
                                                                    </p>
                                                                </td>
                                                                <td class="px-5 py-5 bg-white text-sm">
                                                                    <span
                                                                        class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                                                    >
                                                                        <span
                                                                            aria-hidden
                                                                            class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                                                        ></span>
                                                                        <span class="relative">Overdue</span>
                                                                    </span>
                                                                </td>
                                                                <td class="px-5 py-5 bg-white text-sm text-right">
                                                                    <button
                                                                        type="button"
                                                                        class="inline-block text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <svg
                                                                            class="inline-block h-6 w-6 fill-current"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>



                        </Form>
                    )}
                </Formik>
            </div>

        </DefaultLayout>
    )
}

export default Currency