import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import ReactSelect from 'react-select'
import { customStyles as createCustomStyles } from '../../Constants/utils';
import { useSelector } from 'react-redux'
import Pagination from '../Pagination/Pagination'


const MaterialTransfer = () => {
    const [edit, setEdit] = useState(false)
    const [options, setOptions] = useState([]);
    const theme = useSelector(state => state?.persisted?.theme);

    const customStyles = createCustomStyles(theme?.mode);

    console.log(customStyles);




    return (
        <DefaultLayout>
            <Breadcrumb pageName={"material/materialTransfer"} />
            <div>
                <Formik
                // initialValues={currentMaterial}
                // enableReinitialize={true}
                // validationSchema={validationSchema}
                // onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            {edit ? "Update Material" : "Add Material"}
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-6">
                                            <label className="mb-2.5 block text-black dark:text-white">Description</label>
                                            <Field
                                                as="textarea"
                                                rows={3}
                                                name="description"
                                                placeholder="Type your message"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Unit</label>
                                                <ReactSelect
                                                    name="unit"
                                                    value={options.find(option => option.value === values.unit?.id) || null}
                                                    onChange={(option) => setFieldValue('unit', option ? option.unitObject : null)}
                                                    options={options}
                                                    styles={customStyles} // Pass custom styles here
                                                    className="bg-white dark:bg-form-input"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Unit"
                                                />
                                                <ErrorMessage name="unit.id" component="div" className="text-red-600 text-sm" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Material Type</label>
                                                <ReactSelect
                                                    name="materialType"
                                                    // value={seloptions.find(option => option.value === values.materialType?.value) || null}
                                                    onChange={(option) => setFieldValue('materialType', option)}
                                                    // options={seloptions}
                                                    styles={customStyles} // Pass custom styles here
                                                    className="bg-white dark:bg-form-input"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Material Type"
                                                />
                                                <ErrorMessage name="materialType" component="div" className="text-red-600 text-sm" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Grade</label>
                                                <Field
                                                    type="text"
                                                    name="grade"
                                                    placeholder="Grade"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="grade" component="div" className="text-red-600 text-sm" />
                                            </div>
                                        </div>
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                            {edit ? "Update Material" : "Add Material"}
                                        </button>
                                    </div>
                                </div>
                                {!edit && (
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-2 dark:border-strokedark">
                                            <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                                {/* <MaterialTable data={material} totalItems={pagination.totalItems} title={'Material'} handleDelete={handleDelete} handleUpdate={handleUpdate} /> */}
                                                <Pagination
                                                // totalPages={pagination?.totalPages}
                                                // currentPage={pagination?.currentPage}
                                                // handlePageChange={handlePageChange}
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
    )
}

export default MaterialTransfer