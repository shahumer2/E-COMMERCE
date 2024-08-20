import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PRODUCT_URL, customStyles as createCustomStyles } from '../../../constants/utils';
import { fetchcategory } from '../../../redux/Slice/CategorySlice';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import ReactSelect from 'react-select';
import { IoIosAdd } from "react-icons/io";
import useProduct from '../../../hooks/useProduct';
import { fetchbrand } from '../../../redux/Slice/BrandSlice';
import { fetchcolor } from '../../../redux/Slice/ColorSlice';
import { fetchsize } from '../../../redux/Slice/SizeSlice';
import { fetchweight } from '../../../redux/Slice/WeightSlice';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const theme = useSelector(state => state?.persisted?.theme);
    const customStyles = (themeMode) => ({
        menuList: (provided) => ({
            ...provided,
            maxHeight: '150px',
            overflowY: 'auto',
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: themeMode === 'dark' ? '#333' : '#fff',
            color: themeMode === 'dark' ? '#fff' : '#000',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: themeMode === 'dark' ? '#fff' : '#000',
        }),
    });

    const [categories, setCategories] = useState([]);
    const [brands, setbrands] = useState([])
    const [colors, setcolors] = useState([])
    const [sizes, setsizes] = useState([])
    const [weights, setweights] = useState([])

    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchcategory(token));
        dispatch(fetchbrand(token));
        dispatch(fetchcolor(token));
        dispatch(fetchsize(token));
        dispatch(fetchweight(token));
    }, [dispatch, token]);

    const category = useSelector(state => state?.nonPersisted?.category);
    const brand = useSelector(state => state?.nonPersisted?.brand);
    const color = useSelector(state => state?.nonPersisted?.color);
    const size = useSelector(state => state?.nonPersisted?.size);
    const weight = useSelector(state => state?.nonPersisted?.weight);

    useEffect(() => {
        if (category.data) {
            const formattedOptions = category.data.content.map(category => ({
                value: category.id,
                label: category.name,
            }));
            setCategories(formattedOptions);
        }
        if (brand.data) {
            const formattedOptions = brand.data.content.map(brand => ({
                value: brand.id,
                label: brand.name,
            }));
            setbrands(formattedOptions);
        }
        if (color.data) {
            const formattedOptions = color.data.content.map(color => ({
                value: color.id,
                label: color.name,
            }));
            setcolors(formattedOptions);
        }
        if (size.data) {
            const formattedOptions = size.data.content.map(size => ({
                value: size.id,
                label: size.name,
            }));
            setsizes(formattedOptions);
        }
        if (weight.data) {
            const formattedOptions = weight.data.content.map(weight => ({
                value: weight.id,
                label: weight.value,
            }));
            setweights(formattedOptions);
        }
    }, [brand.data, category.data, weight.data, color.data, size.data]);

    console.log(weight, "klklklkl");
    const { handleSubmit } = useProduct();
    // const handleSubmit = async (values) => {
    //     try {
    //         const url = ADD_PRODUCT_URL;
    //         const method = "POST";

    //         // Create FormData instance
    //         const formData = new FormData();

    //         // Create the product object
    //         const product = {};

    //         // Populate the product object with values excluding 'images'
    //         Object.keys(values).forEach(key => {
    //             if (key !== 'images') {
    //                 // Handle SKUs specifically
    //                 if (key === 'skus') {
    //                     product[key] = values[key].map(sku => {
    //                         // If weight is not selected, remove the weights field
    //                         if (!sku.weightSelected) {
    //                             const { weights,sizeSelected, ...rest } = sku;
    //                             return rest;
    //                         }
    //                         // If size is not selected, remove the sizes field
    //                         if (!sku.sizeSelected) {
    //                             const { sizes,sizeSelected, ...rest } = sku;
    //                             return rest;
    //                         }
    //                         return sku;
    //                     });
    //                 } else {
    //                     product[key] = values[key];
    //                 }
    //             }
    //         });

    //         // Append the product object to FormData as a JSON string
    //         formData.append('product', JSON.stringify(product));

    //         // Append images array to FormData
    //         values.images.forEach((file) => {
    //             formData.append('images', file);
    //         });

    //         // Log each key-value pair in FormData
    //         for (let pair of formData.entries()) {
    //             console.log(pair[0] + ':', pair[1]);
    //         }

    //         const response = await fetch(url, {
    //             method: method,
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 // Do not set the Content-Type header manually
    //             },
    //             body: formData, // Send FormData directly as the body
    //         });

    //         const data = await response.json();
    //         if (response.ok) {
    //             toast.success(`Product Added successfully`);
    //         } else {
    //             toast.error(`${data.errorMessage}`);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("An error occurred");
    //     }
    // };






    const [imagePreviews, setImagePreviews] = useState([]);

    const handleFileChange = (event, setFieldValue) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        const previews = fileArray.map(file => URL.createObjectURL(file));

        console.log(fileArray, 'ghghghghghghgh');
        setFieldValue("images", fileArray);
        setImagePreviews(previews);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Products / AddProducts" />
            <div>
                <Formik
                    initialValues={{

                        name: "",
                        slug: "",
                        description: "",
                        basePrice: 0,
                        status: "AVAILABLE",
                        metaTitle: "",
                        metaDescription: "",
                        isFeatured: false,
                        categories: [1],  // Array as expected
                        brandId: 0,       // Single value
                        attributes: [{ name: "", value: "" }],
                        skus: [
                            {
                                sku: "",
                                price: 0,
                                colors: [{
                                    id: 1
                                }], // Single value
                                sizes: [{ sizeId: 0, quantity: 0 }],
                                weights: [{ weightId: 0, quantity: 0 }],
                                attributes: [{ name: "", value: "" }]
                            }
                        ],
                        images: []

                    }}
                    validationSchema={Yup.object({

                        name: Yup.string().required('Required'),
                        description: Yup.string().required('Required'),
                        basePrice: Yup.number().required('Required').positive(),
                        // categories: Yup.array().of(Yup.number().required('Required')).min(1, 'Select at least one category'),



                    })}
                    onSubmit={(values, actions) => {
                        console.log(values, "jigs");
                        handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Add Product
                                        </h3>
                                    </div>
                                    <div className="p-6.5">

                                        {/* Product Name, Price, and Description Fields */}
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Product Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Base Price</label>
                                                <Field
                                                    type="number"
                                                    name="basePrice"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="basePrice" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-[300px]">
                                            <label className="mb-2.5 block text-black dark:text-white">Description</label>
                                            <Field
                                                as="textarea"
                                                rows={4}
                                                name="description"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                            <ErrorMessage name=" description" component="div" className="text-red-500" />
                                        </div>

                                        {/* Status */}
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Status</label>
                                                <Field
                                                    as="select"
                                                    name="status"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                >
                                                    <option value="AVAILABLE">AVAILABLE</option>
                                                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="text-red-500" />
                                            </div>

                                            {/* slug */}
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Slug</label>
                                                <Field
                                                    type="text"
                                                    name="slug"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="basePrice" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        {/* meta Title meta description */}
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Meta Title</label>
                                                <Field
                                                    type="text"
                                                    name="metaTitle"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="basePrice" component="div" className="text-red-500" />
                                            </div>

                                            {/* metaDescription */}
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Meta Description</label>
                                                <Field
                                                    type="text"
                                                    name="metaDescription"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="basePrice" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        {/* Category IDs */}
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Categories</label>
                                                <ReactSelect
                                                    isMulti
                                                    name="categories"
                                                    options={categories}
                                                    classNamePrefix="react-select"
                                                    styles={createCustomStyles(theme)}
                                                    onChange={(selectedOptions) =>
                                                        setFieldValue('categories', selectedOptions.map(option => option.value))
                                                    }
                                                />
                                                <ErrorMessage name="categories" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Brand</label>

                                                <ReactSelect

                                                    name="brandId"
                                                    options={brands}
                                                    classNamePrefix="react-select"
                                                    styles={createCustomStyles(theme)}
                                                    onChange={(selectedOptions) => {
                                                        console.log(selectedOptions, "selectttt");
                                                        setFieldValue("brandId", selectedOptions?.value


                                                        )


                                                    }


                                                    }
                                                />
                                                <ErrorMessage name="brandId" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        {/* Brand ID */}
                                        <div className="mb-4.5 flex flex-wrap gap-6">

                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <FieldArray name="attributes">
                                                {({ push, remove }) => (
                                                    <div className="flex flex-col gap-4 mb-4.5">
                                                        {values.attributes.map((attribute, attrIndex) => (
                                                            <div key={attrIndex} className="flex flex-wrap gap-6">
                                                                <div className="flex-1 min-w-[300px]">
                                                                    <label className="mb-2.5 block text-black dark:text-white">Attribute Name</label>
                                                                    <Field
                                                                        type="text"
                                                                        name={`attributes.${attrIndex}.name`}
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-[300px]">
                                                                    <label className="mb-2.5 block text-black dark:text-white">Attribute Value</label>
                                                                    <Field
                                                                        type="text"
                                                                        name={`attributes.${attrIndex}.value`}
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                    />
                                                                </div>
                                                                <div className="flex items-end mb-4.5">
                                                                    <button
                                                                        type="button"
                                                                        className="text-red-500"
                                                                        onClick={() => remove(attrIndex)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            className="text-blue-500"
                                                            onClick={() => push({ name: "", value: "" })}
                                                        >
                                                            Add Attribute
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>

                                        {/* SKU Fields */}
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <FieldArray name="skus">
                                                {({ push, remove }) => (
                                                    <div className="flex flex-col gap-4">
                                                        {values.skus.map((sku, index) => (
                                                            <div key={index} className="border p-4 rounded-md">
                                                                <div className="flex flex-wrap gap-6 mb-4.5">
                                                                    <div className="flex-1 min-w-[300px]">
                                                                        <label className="mb-2.5 block text-black dark:text-white">SKU</label>
                                                                        <Field
                                                                            type="text"
                                                                            name={`skus.${index}.sku`}
                                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                        />
                                                                        <ErrorMessage name={`skus.${index}.sku`} component="div" className="text-red-500" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-[300px]">
                                                                        <label className="mb-2.5 block text-black dark:text-white">Price</label>
                                                                        <Field
                                                                            type="number"
                                                                            name={`skus.${index}.price`}
                                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                        />
                                                                        <ErrorMessage name={`skus.${index}.price`} component="div" className="text-red-500" />
                                                                    </div>
                                                                </div>

                                                                {/* Attributes */}
                                                                <FieldArray name={`skus.${index}.attributes`}>
                                                                    {({ push: pushAttribute, remove: removeAttribute }) => (
                                                                        <div className="flex flex-col gap-4 mb-4.5">
                                                                            {values.skus[index].attributes.map((attribute, attrIndex) => (
                                                                                <div key={attrIndex} className="flex flex-wrap gap-6">
                                                                                    <div className="flex-1 min-w-[300px]">
                                                                                        <label className="mb-2.5 block text-black dark:text-white">Attribute Name</label>
                                                                                        <Field
                                                                                            type="text"
                                                                                            name={`skus.${index}.attributes.${attrIndex}.name`}
                                                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                        />
                                                                                        <ErrorMessage name={`skus.${index}.attributes.${attrIndex}.name`} component="div" className="text-red-500" />
                                                                                    </div>
                                                                                    <div className="flex-1 min-w-[300px]">
                                                                                        <label className="mb-2.5 block text-black dark:text-white">Attribute Value</label>
                                                                                        <Field
                                                                                            type="text"
                                                                                            name={`skus.${index}.attributes.${attrIndex}.value`}
                                                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                        />
                                                                                        <ErrorMessage name={`skus.${index}.attributes.${attrIndex}.value`} component="div" className="text-red-500" />
                                                                                    </div>
                                                                                    <div className="flex items-end min-w-[50px]">
                                                                                        <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => removeAttribute(attrIndex)}>
                                                                                            Remove
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => pushAttribute({ name: '', value: '' })}>
                                                                                <IoIosAdd size={24} />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </FieldArray>

                                                                {/* Color ID */}
                                                                <FieldArray name={`skus.${index}.colors`}>
                                                                    {({ push: pushColor, remove: removeColor }) => (
                                                                        <div className="mb-4.5 flex flex-col gap-4">
                                                                            {values.skus[index].colors.map((color, colorIndex) => (
                                                                                <div key={colorIndex} className="flex flex-wrap gap-6">
                                                                                    <div className="flex-1 min-w-[300px]">
                                                                                        <label className="mb-2.5 block text-black dark:text-white">Color ID</label>

                                                                                        <ReactSelect
                                                                                            name={`skus.${index}.colors.${colorIndex}.id`}
                                                                                            options={colors}
                                                                                            classNamePrefix="react-select"
                                                                                            styles={createCustomStyles(theme)}
                                                                                            onChange={(selectedOption) =>
                                                                                                setFieldValue(`skus.${index}.colors.${colorIndex}.id`, selectedOption.value)
                                                                                            }
                                                                                        />
                                                                                        <ErrorMessage name={`skus.${index}.colors.${colorIndex}.id`} component="div" className="text-red-500" />
                                                                                    </div>
                                                                                    <div className="flex items-end min-w-[50px]">
                                                                                        <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => removeColor(colorIndex)}>
                                                                                            Remove
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => pushColor({ colorId: '' })}>
                                                                                <IoIosAdd size={24} />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </FieldArray>

                                                                {/* Size or Weight Selection */}
                                                                <div className="flex flex-col gap-4 mb-4.5">
                                                                    <label className="mb-2.5 block text-black dark:text-white">Select Size or Weight</label>
                                                                    <div className="flex items-center gap-4">
                                                                        <label className="flex items-center gap-2">
                                                                            <Field type="checkbox" name={`skus.${index}.sizeSelected`} />
                                                                            Size
                                                                        </label>
                                                                        <label className="flex items-center gap-2">
                                                                            <Field type="checkbox" name={`skus.${index}.weightSelected`} />
                                                                            Weight
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                {/* Sizes or Weights Fields */}
                                                                {values.skus[index].sizeSelected && (
                                                                    <FieldArray name={`skus.${index}.sizes`}>
                                                                        {({ push: pushSize, remove: removeSize }) => (
                                                                            <div className="flex flex-col gap-4 mb-4.5">
                                                                                {values.skus[index].sizes.map((size, sizeIndex) => (
                                                                                    <div key={sizeIndex} className="flex flex-wrap gap-6">
                                                                                        <div className="flex-1 min-w-[300px]">
                                                                                            <label className="mb-2.5 block text-black dark:text-white">Size</label>

                                                                                            <ReactSelect

                                                                                                name={`skus.${index}.sizes.${sizeIndex}.sizeId`}
                                                                                                options={sizes}
                                                                                                classNamePrefix="react-select"
                                                                                                styles={createCustomStyles(theme)}
                                                                                                onChange={(selectedOptions) =>
                                                                                                    setFieldValue(`skus.${index}.sizes.${sizeIndex}.sizeId`, selectedOptions.value)
                                                                                                }
                                                                                                value={sizes.filter(size => values.skus[index].sizes.map(s => s.sizeId).includes(size.value))}
                                                                                            />
                                                                                            <ErrorMessage name={`skus.${index}.sizes.${sizeIndex}.sizeId`} component="div" className="text-red-500" />
                                                                                        </div>
                                                                                        <div className="flex-1 min-w-[300px]">
                                                                                            <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                                                                                            <Field
                                                                                                type="number"
                                                                                                name={`skus.${index}.sizes.${sizeIndex}.quantity`}
                                                                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                            />

                                                                                            <ErrorMessage name={`skus.${index}.sizes.${sizeIndex}.quantity`} component="div" className="text-red-500" />
                                                                                        </div>
                                                                                        <div className="flex items-end min-w-[50px]">
                                                                                            <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => removeSize(sizeIndex)}>
                                                                                                Remove
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                                <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => pushSize({ sizeId: 0, quantity: 0 })}>
                                                                                    <IoIosAdd size={24} />
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </FieldArray>
                                                                )}

                                                                {values.skus[index].weightSelected && (
                                                                    <FieldArray name={`skus.${index}.weights`}>
                                                                        {({ push: pushWeight, remove: removeWeight }) => (
                                                                            <div className="flex flex-col gap-4 mb-4.5">
                                                                                {values.skus[index].weights.map((weight, weightIndex) => (
                                                                                    <div key={weightIndex} className="flex flex-wrap gap-6">
                                                                                        <div className="flex-1 min-w-[300px]">
                                                                                            <label className="mb-2.5 block text-black dark:text-white">Weight</label>

                                                                                            <ReactSelect
                                                                                                isMulti

                                                                                                name={`skus.${index}.weights.${weightIndex}.weightId`}
                                                                                                options={weights}
                                                                                                classNamePrefix="react-select"
                                                                                                styles={createCustomStyles(theme)}
                                                                                                onChange={(selectedOptions) =>
                                                                                                    setFieldValue(`skus.${index}.weights.${weightIndex}.weightId`, selectedOptions.value)
                                                                                                }
                                                                                            />

                                                                                            <ErrorMessage name={`skus.${index}.weights.${weightIndex}.weightId`} component="div" className="text-red-500" />
                                                                                        </div>
                                                                                        <div className="flex-1 min-w-[300px]">
                                                                                            <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                                                                                            <Field
                                                                                                type="number"
                                                                                                name={`skus.${index}.weights.${weightIndex}.quantity`}
                                                                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                            />


                                                                                            <ErrorMessage name={`skus.${index}.weights.${weightIndex}.quantity`} component="div" className="text-red-500" />
                                                                                        </div>


                                                                                        <div className="flex items-end min-w-[50px]">
                                                                                            <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => removeWeight(weightIndex)}>
                                                                                                Remove
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                                <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => pushWeight({ weightId: 0, quantity: 0 })}>
                                                                                    <IoIosAdd size={24} />
                                                                                </button>
                                                                            </div>






                                                                        )}
                                                                    </FieldArray>
                                                                )}
                                                                <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => remove(index)}>
                                                                    Remove SKU
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => push({ sku: '', price: 0, attributes: [], colorId: 0, sizeSelected: false, weightSelected: false, sizes: [], weights: [] })}>
                                                            <IoIosAdd size={24} />
                                                        </button>
                                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                                            <div className="flex-1 min-w-[300px]">
                                                                <label className="mb-2.5 block text-black dark:text-white">Images</label>
                                                                <input
                                                                    name='images'
                                                                    type="file"
                                                                    multiple
                                                                    accept="image/*"
                                                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                />
                                                                <div className="mt-4 flex gap-2">
                                                                    {imagePreviews.map((preview, index) => (
                                                                        <img key={index} src={preview} alt="Preview" className="w-24 h-24 object-cover rounded" />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )}
                                            </FieldArray>
                                        </div>

                                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                            Submit
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
};

export default AddProduct;
