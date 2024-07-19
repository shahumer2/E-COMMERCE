import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import ReactSelect from 'react-select';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';


const AddCustomer = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    

    const productgrp = [
        { value: 'BrandA', label: 'Brand A' },
        { value: 'BrandB', label: 'Brand B' },
        { value: 'BrandC', label: 'Brand C' },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: '50px', 
            fontSize: '16px', 
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '10px 14px', 
        }),
        input: (provided) => ({
            ...provided,
            fontSize: '16px', 
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '16px', 
        }),
    };

    const formik = useFormik({
        initialValues: {
          customerName: '',
          customerGroup: '',
           country: '',
           city:'',
           contactNumber:'',
           billTo:'',
           email:'',
           reference:'',
           billingAddress:'',
           shippingAddress:'',
           gst:'',
           iecNo:'',
           instaId:'',
           discountOffered:'',
           retailLocation:'',
           website:'',
           social:'',
           event:'',
           eventType:'',
        },
        validationSchema: Yup.object({
          customerName: Yup.string().required('Required'),
          customerGroup: Yup.string().required('Required'),
           country: Yup.string().required('Required'),
           city: Yup.string().required('Required'),
           contactNumber: Yup.string().required('Required'),
           billTo: Yup.string().required('Required'),
           email: Yup.string().required('Required'),
           reference: Yup.string().required('Required'),
           billingAddress: Yup.string().required('Required'),
           shippingAddress: Yup.string().required('Required'),
           gst: Yup.string().required('Required'),
           iecNo: Yup.string().required('Required'),
           instaId: Yup.string().required('Required'),
           discountOffered: Yup.string().required('Required'),



        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleRadioChange = (event) => {
        formik.setFieldValue('retailLocation', event.target.value);
        console.log(`Selected Retail Location: ${event.target.value}`);
    };
    const handleRadioChangeWebsite = (event) => {
        formik.setFieldValue('website', event.target.value);
        console.log(`Selected web Location: ${event.target.value}`);
    };
    const handleRadioChangeSocial = (event) => {
        formik.setFieldValue('social', event.target.value);
        console.log(`Selected social : ${event.target.value}`);
    };
    const handleRadioChangeEvent = (event) => {
        formik.setFieldValue('event', event.target.value);
        console.log(`Selected event : ${event.target.value}`);
    };
    const handleRadioChangeEventType = (event) => {
        formik.setFieldValue('eventType', event.target.value);
        console.log(`Selected eventType : ${event.target.value}`);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Customer / Add Customer" />
            <div>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                Add Customer
                            </h3>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div className="p-6.5">
                               

                                <div className="mb-4.5 flex flex-wrap gap-6">
                                <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Customer Name</label>
                                        <input
                                            type="text"
                                            name="customerName"
                                            placeholder="customerName"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.customerName}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.customerName && formik.errors.customerName ? (
                                            <div className="text-red-600 text-sm">{formik.errors.customerName}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Customer Group</label>
                                        <ReactSelect
                                            name="customerGroup"
                                            value={productgrp.find(option => option === option)}
                                            onChange={(option) => formik.setFieldValue('customerGroup', option)}
                                            onBlur={formik.handleBlur}
                                            options={productgrp}
                                            styles={customStyles}
                                            className="bg-white dark:bg-form-input"
                                            classNamePrefix="react-select"
                                            placeholder="select"
                                        />
                                        {formik.touched.customerGroup && formik.errors.customerGroup ? (
                                            <div className="text-red-600 text-sm">{formik.errors.customerGroup}</div>
                                        ) : null}
                                    </div>
                                    
                                </div>

                                <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="Country Name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.country}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.country && formik.errors.country ? (
                                            <div className="text-red-600 text-sm">{formik.errors.country}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City Name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.city}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.city && formik.errors.city ? (
                                            <div className="text-red-600 text-sm">{formik.errors.city}</div>
                                        ) : null}
                                    </div>


                                   

                                </div>
                                <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Contact Number</label>
                                        <input
                                            type="text"
                                            name="contactNumber"
                                            placeholder="Contact Number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.contactNumber}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.contactNumber && formik.errors.contactNumber ? (
                                            <div className="text-red-600 text-sm">{formik.errors.contactNumber}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Bill To</label>
                                        <input
                                            type="text"
                                            name="billTo"
                                            placeholder="Billing To"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.billTo}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.billTo && formik.errors.billTo ? (
                                            <div className="text-red-600 text-sm">{formik.errors.billTo}</div>
                                        ) : null}
                                    </div>
                                  </div>
                                  <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Email id</label>
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="Email id"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-600 text-sm">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Reference</label>
                                        <input
                                            type="text"
                                            name="reference"
                                            placeholder="Reference"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.reference}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.reference && formik.errors.reference ? (
                                            <div className="text-red-600 text-sm">{formik.errors.reference}</div>
                                        ) : null}
                                    </div>
                                  </div>
                                  <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Billing Address</label>
                                        <input
                                            type="text"
                                            name="billingAddress"
                                            placeholder="Billing Address"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.billingAddress}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.billingAddress && formik.errors.billingAddress ? (
                                            <div className="text-red-600 text-sm">{formik.errors.billingAddress}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Shipping Address</label>
                                        <input
                                            type="text"
                                            name="shippingAddress"
                                            placeholder="ShippingAddress"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.shippingAddress}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.shippingAddress && formik.errors.shippingAddress ? (
                                            <div className="text-red-600 text-sm">{formik.errors.shippingAddress}</div>
                                        ) : null}
                                    </div>
                                  </div>
                                  <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">GSTIN/VAT No</label>
                                        <input
                                            type="text"
                                            name="gst"
                                            placeholder="GSTIN/VAT No"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.gst}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.gst && formik.errors.gst ? (
                                            <div className="text-red-600 text-sm">{formik.errors.gst}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">IEC No</label>
                                        <input
                                            type="text"
                                            name="iecNo"
                                            placeholder="IEC No"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.iecNo}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.iecNo && formik.errors.iecNo ? (
                                            <div className="text-red-600 text-sm">{formik.errors.iecNo}</div>
                                        ) : null}
                                    </div>
                                  </div>
                                  <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">INSTA Id</label>
                                        <input
                                            type="text"
                                            name="instaId"
                                            placeholder="INSTA Id"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.instaId}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.instaId && formik.errors.instaId ? (
                                            <div className="text-red-600 text-sm">{formik.errors.instaId}</div>
                                        ) : null}
                                    </div>
                                    
                                  </div>
                                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                 CUSTOMER INTERACTION
                            </h3>
                        </div>
                        

                        <div className="p-4 space-y-4 flex flex-col items-center md:space-y-0 md:flex-row md:justify-center md:items-center ">
                        <form className="md:flex-1 md:px-4">
            <div>
                <p className="flex-none text-left pt-7">Retail Location</p>
                <label className="flex items-center">
                    <input type="radio"
                     name="retailLocation"
                     value="SRX"
                     checked={formik.values.retailLocation === 'SRX'}
                    onChange={handleRadioChange}
 />
                    <span className="ml-1">SRX</span>
                    {formik.touched.retailLocation && formik.errors.retailLocation ? (
                                            <div className="text-red-600 text-sm">{formik.errors.retailLocation}</div>
                                        ) : null}
                </label>
                <label className="flex items-center">
                    <input type="radio"
                     name="retailLocation"
                     value="Delhi"
                     checked={formik.values.retailLocation === 'Delhi'}
                    onChange={handleRadioChange}
 />
                    <span className="ml-1">Delhi</span>
                    {formik.touched.retailLocation && formik.errors.retailLocation ? (
                                            <div className="text-red-600 text-sm">{formik.errors.retailLocation}</div>
                                        ) : null}
                </label>
                <label className="flex items-center">
                    <input type="radio" name="retailLocation" value="SXR and Delhi"
                     
                     checked={formik.values.retailLocation === 'SXR and Delhi'}
                    onChange={handleRadioChange}
                    />
                    <span className="ml-1">SXR and Delhi</span>
                    {formik.touched.retailLocation && formik.errors.retailLocation ? (
                                            <div className="text-red-600 text-sm">{formik.errors.retailLocation}</div>
                                        ) : null}
                </label>
            </div>
        </form>

    <form className="md:flex-1 md:px-4 flex flex-col items-center">
        <div>
            <p>Website</p>
            <label className="flex items-center">
                <input type="radio" name="website"
                 value="Subscribed"
                 checked={formik.values.website === 'Subscribed'}
                 onChange={handleRadioChangeWebsite} />
                 
                <span className="ml-1">Subscribed</span>
                {formik.touched.website && formik.errors.website ? (
                                            <div className="text-red-600 text-sm">{formik.errors.website}</div>
                                        ) : null}
            </label>
            <label className="flex items-center">
                <input type="radio" name="website"
                 value="Subscribed/Purchased"
                 checked={formik.values.website === 'Subscribed/Purchased'}
                 onChange={handleRadioChangeWebsite} />
                 
                <span className="ml-1">Subscribed/Purchased</span>
                {formik.touched.website && formik.errors.website ? (
                                            <div className="text-red-600 text-sm">{formik.errors.website}</div>
                                        ) : null}
            </label>
        </div>
    </form>

    <form className="md:flex-1 md:px-4">
        <div>
            <p className="flex-none">Social</p>
            <label className="flex items-center">
                <input type="radio" name="social"
                 value="Interaction" 
                 checked={formik.values.social === 'Interaction'}
                 onChange={handleRadioChangeSocial}
                 />
                <span className="ml-1">Interaction</span>
                {formik.touched.social && formik.errors.social ? (
                                            <div className="text-red-600 text-sm">{formik.errors.social}</div>
                                        ) : null}
            </label>
            <label className="flex items-center">
                <input type="radio" name="social" 
                value="Purchased"
                checked={formik.values.social === 'Purchased'}
                 onChange={handleRadioChangeSocial}
                />
                 {formik.touched.social && formik.errors.social ? (
                                            <div className="text-red-600 text-sm">{formik.errors.social}</div>
                                        ) : null}
                <span className="ml-1">Purchased</span>
            </label>
        </div>
    </form>
</div>

<div className="p-4 space-y-4 flex flex-col items-center md:space-y-0 md:flex-row md:justify-center md:items-center ">
    <form className="md:flex-1 md:px-4">
        <div>
            <p className="flex-none text-left pt-7">Event</p>
            <label className="flex items-center">
                <input type="radio" name="event"
                 value="Domestic"
                 checked={formik.values.event === 'Domestic'}
                 onChange={handleRadioChangeEvent}
                 />
                 {formik.touched.event && formik.errors.event ? (
                                            <div className="text-red-600 text-sm">{formik.errors.event}</div>
                                        ) : null}
                <span className="ml-1">Domestic</span>
            </label>
            <label className="flex items-center">
                <input type="radio" name="event" value="International" 
                  checked={formik.values.event === 'International'}
                  onChange={handleRadioChangeEvent}
                />
                  {formik.touched.event && formik.errors.event ? (
                                            <div className="text-red-600 text-sm">{formik.errors.event}</div>
                                        ) : null}
                <span className="ml-1">International</span>
            </label>
        </div>
    </form>

    <form className="md:flex-1 md:px-4 flex flex-col  mr-52">
        <div>
            <p>Event Type</p>
            <label className="flex items-center">
                <input type="radio" name="eventType"
                 value="Interaction"
                 checked={formik.values.eventType === 'Interaction'}
                  onChange={handleRadioChangeEventType}
                 />
                  {formik.touched.eventType && formik.errors.eventType ? (
                                            <div className="text-red-600 text-sm">{formik.errors.eventType}</div>
                                        ) : null}
                <span className="ml-1">Interaction</span>
            </label>
            <label className="flex items-center">
                <input type="radio" name="eventType" 
                value="Purchased"
                checked={formik.values.eventType === 'Purchased'}
                onChange={handleRadioChangeEventType}
                />
                <span className="ml-1">Purchased</span>
                {formik.touched.eventType && formik.errors.eventType ? (
                                            <div className="text-red-600 text-sm">{formik.errors.eventType}</div>
                                        ) : null}
            </label>
        </div>
    </form>
</div>







                <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Discount Offered(%) </label>
                                        <input
                                            type="text"
                                            name="discountOffered"
                                            placeholder="Discount Offered(%)"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.discountOffered}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.discountOffered && formik.errors.discountOffered ? (
                                            <div className="text-red-600 text-sm">{formik.errors.discountOffered}</div>
                                        ) : null}
                                    </div>
                                    
                                  </div>







                                  

                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                    Add Customer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddCustomer;
