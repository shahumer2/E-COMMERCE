import React, { useEffect, useState } from 'react';


import { ErrorMessage, Field, Form, Formik } from 'formik';
import ViewTable from './ViewTable';

import Pagination from '../../Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';

import useSize from '../../../hooks/useSize';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

const Size = () => {
    const [searchvalue, setsearchvalue] = useState(''); // Initialize with empty string
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the actual search query

    const state = useSelector((state) => state);
    const { currentUser } = state.persisted.user;
    const dispatch = useDispatch();
    

  

    const {
        Sizes,
        edit,
        currentSize,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    } = useSize(searchQuery);

    const handleSearch = () => {
        setSearchQuery(searchvalue);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName={edit ? "Configurator/Update Size" : "Configurator/ Add Size"} />
            <div>
                <Formik
                    initialValues={currentSize}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};
                        if (!values.name.trim()) {
                            errors.name = 'Field is required';
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            {edit ? 'Update Size' : 'Add Size'}
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Size Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Size Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4" disabled={isSubmitting}>
                                            {edit ? 'Update Size' : 'Create Size'}
                                        </button>
                                    </div>
                                </div>
                                {!edit && (
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                            <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                                {/* <div className="flex justify-center items-center p-3">
                                                    <input
                                                        type="text"
                                                        name="search"
                                                        placeholder="Search by Name"
                                                        className="w-[300px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                        onChange={(e) => setsearchvalue(e.target.value)}
                                                    />
                                                    <button type="button" className="w-[80px] h-12 rounded-lg bg-blue-700 text-white dark:bg-blue-600 dark:text-slate-300 ml-4" onClick={handleSearch}>Search</button>
                                                </div> */}
                                              

                                                <ViewTable units={Sizes} searchvalue={searchvalue} pagination={pagination} totalItems={pagination.totalItems} title={'Unit'} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                                <Pagination
                                                    totalPages={pagination.totalPages}
                                                    currentPage={pagination.currentPage}
                                                    handlePageChange={handlePageChange}
                                                />
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
};

export default Size ;