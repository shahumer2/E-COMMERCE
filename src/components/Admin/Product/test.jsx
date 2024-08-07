// import React, { useEffect, useState } from 'react';
// import DefaultLayout from '../../../layout/DefaultLayout';
// import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { customStyles as createCustomStyles } from '../../../constants/utils';
// import { fetchcategory } from '../../../redux/Slice/CategorySlice';
// import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
// import ReactSelect from 'react-select';
// import { IoIosAdd } from "react-icons/io";
// import useProduct from '../../../hooks/useProduct';

// const AddProduct = () => {
//     const theme = useSelector(state => state?.persisted?.theme);
//     const customStyles = (themeMode) => ({
//         menuList: (provided) => ({
//             ...provided,
//             maxHeight: '150px',
//             overflowY: 'auto',
//         }),
//         control: (provided) => ({
//             ...provided,
//             backgroundColor: themeMode === 'dark' ? '#333' : '#fff',
//             color: themeMode === 'dark' ? '#fff' : '#000',
//         }),
//         singleValue: (provided) => ({
//             ...provided,
//             color: themeMode === 'dark' ? '#fff' : '#000',
//         }),
//     });

//     const [categories, setCategories] = useState([]);
//     const { currentUser } = useSelector((state) => state?.persisted?.user);
//     const { token } = currentUser;
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchcategory(token));
//     }, [dispatch, token]);

//     const category = useSelector(state => state?.nonPersisted?.category);

//     useEffect(() => {
//         if (category.data) {
//             const formattedOptions = category.data.map(category => ({
//                 value: category.id,
//                 label: category.name,
//             }));
//             setCategories(formattedOptions);
//         }
//     }, [category.data]);

//     const { handleSubmit } = useProduct();
//     const [imagePreviews, setImagePreviews] = useState([]);

//     const handleFileChange = (event, setFieldValue) => {
//         const files = event.target.files;
//         const fileArray = Array.from(files);
//         const previews = fileArray.map(file => URL.createObjectURL(file));

//         setImagePreviews(previews);
//         setFieldValue("product.images", fileArray);
//     };

//     return (
//         <DefaultLayout>
//             <Breadcrumb pageName="Products / AddProducts" />
//             <div>
//                 <Formik
//                     initialValues={{
//                         product: {
//                             name: "",
//                             description: "",
//                             basePrice: 0,
//                             status: "AVAILABLE",
//                             categoryIds: [],
//                             brandId: 0,
//                             skus: [{
//                                 sku: "",
//                                 price: 0,
//                                 quantity: 0,
//                                 weight: 0,
//                                 colorId: 0,
//                                 attributes: [{ name: "", value: "" }],
//                                 sizes: [{ sizeId: 0, quantity: 0 }],
//                                 weights: [{ weightId: 0, quantity: 0 }]
//                             }],
//                             images: []
//                         }
//                     }}
//                     validationSchema={Yup.object({
//                         product: Yup.object({
//                             name: Yup.string().required('Required'),
//                             description: Yup.string().required('Required'),
//                             basePrice: Yup.number().required('Required').positive(),
//                             categoryIds: Yup.array().of(Yup.number().required('Required')).min(1, 'Select at least one category'),
//                             brandId: Yup.number().required('Required'),
//                             skus: Yup.array().of(
//                                 Yup.object({
//                                     sku: Yup.string().required('Required'),
//                                     price: Yup.number().required('Required').positive(),
//                                     quantity: Yup.number().required('Required').positive(),
//                                     weight: Yup.number().required('Required').positive(),
//                                     colorId: Yup.number().required('Required').positive(),
//                                     attributes: Yup.array().of(
//                                         Yup.object({
//                                             name: Yup.string().required('Required'),
//                                             value: Yup.string().required('Required')
//                                         })
//                                     ),
//                                     sizes: Yup.array().of(
//                                         Yup.object({
//                                             sizeId: Yup.number().required('Required'),
//                                             quantity: Yup.number().required('Required').positive()
//                                         })
//                                     ),
//                                     weights: Yup.array().of(
//                                         Yup.object({
//                                             weightId: Yup.number().required('Required'),
//                                             quantity: Yup.number().required('Required').positive()
//                                         })
//                                     )
//                                 })
//                             )
//                         })
//                     })}
//                     onSubmit={(values, actions) => {
//                         handleSubmit(values);
//                         actions.setSubmitting(false);
//                     }}
//                 >
//                     {({ isSubmitting, setFieldValue, values }) => (
//                         <Form>
//                             <div className="flex flex-col gap-9">
//                                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                                     <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//                                         <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
//                                             Add Product
//                                         </h3>
//                                     </div>
//                                     <div className="p-6.5">

//                                         {/* Product Name, Price, and Description Fields */}
//                                         <div className="mb-4.5 flex flex-wrap gap-6">
//                                             <div className="flex-1 min-w-[300px]">
//                                                 <label className="mb-2.5 block text-black dark:text-white">Product Name</label>
//                                                 <Field
//                                                     type="text"
//                                                     name="product.name"
//                                                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                 />
//                                                 <ErrorMessage name="product.name" component="div" className="text-red-500" />
//                                             </div>
//                                             <div className="flex-1 min-w-[300px]">
//                                                 <label className="mb-2.5 block text-black dark:text-white">Base Price</label>
//                                                 <Field
//                                                     type="number"
//                                                     name="product.basePrice"
//                                                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                 />
//                                                 <ErrorMessage name="product.basePrice" component="div" className="text-red-500" />
//                                             </div>
//                                         </div>
//                                         <div className="flex-1 min-w-[300px]">
//                                             <label className="mb-2.5 block text-black dark:text-white">Description</label>
//                                             <Field
//                                                 as="textarea"
//                                                 rows={6}
//                                                 name="product.description"
//                                                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                             />
//                                             <ErrorMessage name="product.description" component="div" className="text-red-500" />
//                                         </div>

//                                         {/* Status */}
//                                         <div className="mb-4.5 flex flex-wrap gap-6">
//                                             <div className="flex-1 min-w-[300px]">
//                                                 <label className="mb-2.5 block text-black dark:text-white">Status</label>
//                                                 <Field
//                                                     as="select"
//                                                     name="product.status"
//                                                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                 >
//                                                     <option value="AVAILABLE">AVAILABLE</option>
//                                                     <option value="UNAVAILABLE">UNAVAILABLE</option>
//                                                 </Field>
//                                                 <ErrorMessage name="product.status" component="div" className="text-red-500" />
//                                             </div>
//                                         </div>

//                                         {/* Category IDs */}
//                                         <div className="mb-4.5 flex flex-wrap gap-6">
//                                             <div className="flex-1 min-w-[300px]">
//                                                 <label className="mb-2.5 block text-black dark:text-white">Categories</label>
//                                                 <ReactSelect
//                                                     isMulti
//                                                     name="product.categoryIds"
//                                                     options={categories}
//                                                     classNamePrefix="react-select"
//                                                     styles={createCustomStyles(theme)}
//                                                     onChange={(selectedOptions) =>
//                                                         setFieldValue('product.categoryIds', selectedOptions.map(option => option.value))
//                                                     }
//                                                 />
//                                                 <ErrorMessage name="product.categoryIds" component="div" className="text-red-500" />
//                                             </div>
//                                         </div>

//                                         {/* Brand ID */}
//                                         <div className="mb-4.5 flex flex-wrap gap-6">
//                                             <div className="flex-1 min-w-[300px]">
//                                                 <label className="mb-2.5 block text-black dark:text-white">Brand</label>
//                                                 <Field
//                                                     type="number"
//                                                     name="product.brandId"
//                                                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                 />
//                                                 <ErrorMessage name="product.brandId" component="div" className="text-red-500" />
//                                             </div>
//                                         </div>

//                                         {/* SKU Fields */}
//                                         <div className="mb-4.5 flex flex-wrap gap-6">
//                                             <FieldArray name="product.skus">
//                                                 {({ push, remove }) => (
//                                                     <div className="flex flex-col gap-4">
//                                                         {values.product.skus.map((sku, index) => (
//                                                             <div key={index} className="border p-4 rounded-md">
//                                                                 <div className="flex flex-wrap gap-6 mb-4.5">
//                                                                     <div className="flex-1 min-w-[300px]">
//                                                                         <label className="mb-2.5 block text-black dark:text-white">SKU</label>
//                                                                         <Field
//                                                                             type="text"
//                                                                             name={`product.skus.${index}.sku`}
//                                                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                         />
//                                                                         <ErrorMessage name={`product.skus.${index}.sku`} component="div" className="text-red-500" />
//                                                                     </div>
//                                                                     <div className="flex-1 min-w-[300px]">
//                                                                         <label className="mb-2.5 block text-black dark:text-white">Price</label>
//                                                                         <Field
//                                                                             type="number"
//                                                                             name={`product.skus.${index}.price`}
//                                                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                         />
//                                                                         <ErrorMessage name={`product.skus.${index}.price`} component="div" className="text-red-500" />
//                                                                     </div>
//                                                                 </div>

//                                                                 {/* Attributes */}
//                                                                 <FieldArray name={`product.skus.${index}.attributes`}>
//                                                                     {({ push: pushAttribute, remove: removeAttribute }) => (
//                                                                         <div className="flex flex-col gap-4 mb-4.5">
//                                                                             {values.product.skus[index].attributes.map((attribute, attrIndex) => (
//                                                                                 <div key={attrIndex} className="flex flex-wrap gap-6">
//                                                                                     <div className="flex-1 min-w-[300px]">
//                                                                                         <label className="mb-2.5 block text-black dark:text-white">Attribute Name</label>
//                                                                                         <Field
//                                                                                             type="text"
//                                                                                             name={`product.skus.${index}.attributes.${attrIndex}.name`}
//                                                                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                                         />
//                                                                                         <ErrorMessage name={`product.skus.${index}.attributes.${attrIndex}.name`} component="div" className="text-red-500" />
//                                                                                     </div>
//                                                                                     <div className="flex-1 min-w-[300px]">
//                                                                                         <label className="mb-2.5 block text-black dark:text-white">Attribute Value</label>
//                                                                                         <Field
//                                                                                             type="text"
//                                                                                             name={`product.skus.${index}.attributes.${attrIndex}.value`}
//                                                                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                                         />
//                                                                                         <ErrorMessage name={`product.skus.${index}.attributes.${attrIndex}.value`} component="div" className="text-red-500" />
//                                                                                     </div>
//                                                                                     <div className="flex items-end min-w-[50px]">
//                                                                                         <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => removeAttribute(attrIndex)}>
//                                                                                             Remove
//                                                                                         </button>
//                                                                                     </div>
//                                                                                 </div>
//                                                                             ))}
//                                                                             <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => pushAttribute({ name: '', value: '' })}>
//                                                                                 <IoIosAdd size={24} />
//                                                                             </button>
//                                                                         </div>
//                                                                     )}
//                                                                 </FieldArray>

//                                                                 {/* Color ID */}
//                                                                 <div className="mb-4.5 flex flex-wrap gap-6">
//                                                                     <div className="flex-1 min-w-[300px]">
//                                                                         <label className="mb-2.5 block text-black dark:text-white">Color ID</label>
//                                                                         <Field
//                                                                             type="number"
//                                                                             name={`product.skus.${index}.colorId`}
//                                                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                         />
//                                                                         <ErrorMessage name={`product.skus.${index}.colorId`} component="div" className="text-red-500" />
//                                                                     </div>
//                                                                 </div>

//                                                                 {/* Size or Weight Selection */}
//                                                                 <div className="flex flex-col gap-4 mb-4.5">
//                                                                     <label className="mb-2.5 block text-black dark:text-white">Select Size or Weight</label>
//                                                                     <div className="flex items-center gap-4">
//                                                                         <label className="flex items-center gap-2">
//                                                                             <Field type="checkbox" name={`product.skus.${index}.sizeSelected`} />
//                                                                             Size
//                                                                         </label>
//                                                                         <label className="flex items-center gap-2">
//                                                                             <Field type="checkbox" name={`product.skus.${index}.weightSelected`} />
//                                                                             Weight
//                                                                         </label>
//                                                                     </div>
//                                                                 </div>

//                                                                 {/* Sizes or Weights Fields */}
//                                                                 {values.product.skus[index].sizeSelected && (
//                                                                     <FieldArray name={`product.skus.${index}.sizes`}>
//                                                                         {({ push: pushSize, remove: removeSize }) => (
//                                                                             <div className="flex flex-col gap-4 mb-4.5">
//                                                                                 {values.product.skus[index].sizes.map((size, sizeIndex) => (
//                                                                                     <div key={sizeIndex} className="flex flex-wrap gap-6">
//                                                                                         <div className="flex-1 min-w-[300px]">
//                                                                                             <label className="mb-2.5 block text-black dark:text-white">Size ID</label>
//                                                                                             <Field
//                                                                                                 type="number"
//                                                                                                 name={`product.skus.${index}.sizes.${sizeIndex}.sizeId`}
//                                                                                                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                                             />
//                                                                                             <ErrorMessage name={`product.skus.${index}.sizes.${sizeIndex}.sizeId`} component="div" className="text-red-500" />
//                                                                                         </div>
//                                                                                         <div className="flex-1 min-w-[300px]">
//                                                                                             <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
//                                                                                             <Field
//                                                                                                 type="number"
//                                                                                                 name={`product.skus.${index}.sizes.${sizeIndex}.quantity`}
//                                                                                                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                                             />
//                                                                                             <ErrorMessage name={`product.skus.${index}.sizes.${sizeIndex}.quantity`} component="div" className="text-red-500" />
//                                                                                         </div>
//                                                                                         <div className="flex items-end min-w-[50px]">
//                                                                                             <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => removeSize(sizeIndex)}>
//                                                                                                 Remove
//                                                                                             </button>
//                                                                                         </div>
//                                                                                     </div>
//                                                                                 ))}
//                                                                                 <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => pushSize({ sizeId: 0, quantity: 0 })}>
//                                                                                     <IoIosAdd size={24} />
//                                                                                 </button>
//                                                                             </div>
//                                                                         )}
//                                                                     </FieldArray>
//                                                                 )}

//                                                                 {values.product.skus[index].weightSelected && (
//                                                                     <FieldArray name={`product.skus.${index}.weights`}>
//                                                                         {({ push: pushWeight, remove: removeWeight }) => (
//                                                                             <div className="flex flex-col gap-4 mb-4.5">
//                                                                                 {values.product.skus[index].weights.map((weight, weightIndex) => (
//                                                                                     <div key={weightIndex} className="flex flex-wrap gap-6">
//                                                                                         <div className="flex-1 min-w-[300px]">
//                                                                                             <label className="mb-2.5 block text-black dark:text-white">Weight ID</label>
//                                                                                             <Field
//                                                                                                 type="number"
//                                                                                                 name={`product.skus.${index}.weights.${weightIndex}.weightId`}
//                                                                                                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                                             />
//                                                                                             <ErrorMessage name={`product.skus.${index}.weights.${weightIndex}.weightId`} component="div" className="text-red-500" />
//                                                                                         </div>
//                                                                                         <div className="flex-1 min-w-[300px]">
//                                                                                             <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
//                                                                                             <Field
//                                                                                                 type="number"
//                                                                                                 name={`product.skus.${index}.weights.${weightIndex}.quantity`}
//                                                                                                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                                                                             />
//                                                                                             <ErrorMessage name={`product.skus.${index}.weights.${weightIndex}.quantity`} component="div" className="text-red-500" />
//                                                                                         </div>
//                                                                                         <div className="flex items-end min-w-[50px]">
//                                                                                             <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => removeWeight(weightIndex)}>
//                                                                                                 Remove
//                                                                                             </button>
//                                                                                         </div>
//                                                                                     </div>
//                                                                                 ))}
//                                                                                 <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => pushWeight({ weightId: 0, quantity: 0 })}>
//                                                                                     <IoIosAdd size={24} />
//                                                                                 </button>
//                                                                             </div>
//                                                                         )}
//                                                                     </FieldArray>
//                                                                 )}
//                                                                 <button type="button" className="p-2.5 border rounded-md text-red-500" onClick={() => remove(index)}>
//                                                                     Remove SKU
//                                                                 </button>
//                                                             </div>
//                                                         ))}
//                                                         <button type="button" className="p-2.5 border rounded-md text-green-500" onClick={() => push({ sku: '', price: 0, attributes: [], colorId: 0, sizeSelected: false, weightSelected: false, sizes: [], weights: [] })}>
//                                                             <IoIosAdd size={24} />
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </FieldArray>
//                                         </div>

//                                         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
//                                             Submit
//                                         </button>
                                   
                                   
//                                    </div> </Form>
//                                 )}
//                             </Formik>
//                         </div>
          
       
         
//     );
// };

// export default AddProduct;
