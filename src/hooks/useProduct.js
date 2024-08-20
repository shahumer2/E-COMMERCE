import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_PRODUCT_URL, GET_PRODUCT_URL,GET_PRODUCTBYID_URL } from "../constants/utils"


import { useNavigate } from 'react-router-dom';

const useProduct = () => {
    

    // const navigate = useNavigate();
    // const [rows, setRows] = useState([{ id: Date.now(), selectedOption1: null, selectedOption2: null, selectedOption3: [], numOfLooms: 0 }]);
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Product, setProduct] = useState([]);
    const [ProductDetails, setProductDetails] = useState([])
    // const [edit, setEdit] = useState(false);





    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0
    });

    useEffect(() => {
        getProduct();
        getProductById();
    }, []);

    const getProduct = async (page) => {
        try {

            const response = await fetch(`${GET_PRODUCT_URL}`, {
                method: "GET",
                // headers: {

                //     "Authorization": `Bearer ${token}`
                // }
            });
            
            const data = await response.json();


            setProduct(data.content);
            setPagination({
                totalItems: data.totalElements,
                data: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Product");
        }
    };

    //product by id

    const getProductById = async (id) => {
       console.log(id,"meihhhhhhhhhhhhhhhhhhhhhhh");
        try {

            const response = await fetch(`${GET_PRODUCTBYID_URL}/${id}`, {
                method: "GET",
                // headers: {

                //     "Authorization": `Bearer ${token}`
                // }
            });
            const data = await response.json();
            console.log(data,"llkkllkk");


            setProductDetails(data);
            setPagination({
                totalItems: data.totalElements,
                data: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Product");
        }
    };

    // const handleDelete = async (e, id) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`${DELETE_Product_URL}${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             toast.success(`Product Deleted Successfully `);

    //             // Check if the current page becomes empty
    //             const isCurrentPageEmpty = Product.length === 1;

    //             if (isCurrentPageEmpty && pagination.currentPage > 1) {
    //                 const previousPage = pagination.currentPage - 1;
    //                 handlePageChange(previousPage);
    //             } else {
    //                 getProduct(pagination.currentPage);
    //             }
    //         } else {
    //             toast.error(`${data.errorMessage}`);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("An error occurred");
    //     }
    // };

    // const GetProductById = async (id) => {
    //     try {
    //         const response = await fetch(`${GET_Product_ID_URL}/${id}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //         });

    //         const data = await response.json();
    //         console.log(data + "xsdfghjkl")
    //         if (response.ok) {
    //             console.log("get Material data", data);
    //             setCurrentProduct(data);
    //             return data; // Return the fetched data
    //         } else {
    //             toast.error(`${data.errorMessage}`);
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("An error occurred");
    //         return null;
    //     }
    // };



    const handleSubmit = async (values) => {
        try {
            const url = ADD_PRODUCT_URL;
            const method = "POST";

            // Create FormData instance
            const formData = new FormData();

            // Create the product object
            const product = {};

            // Populate the product object with values excluding 'images'
            Object.keys(values).forEach(key => {
                if (key !== 'images') {
                    // Handle SKUs specifically
                    if (key === 'skus') {
                        product[key] = values[key].map(sku => {
                            // If weight is not selected, remove the weights field
                            if (!sku.weightSelected) {
                                const { weights, sizeSelected, ...rest } = sku;
                                return rest;
                            }
                            // If size is not selected, remove the sizes field
                            if (!sku.sizeSelected) {
                                const { sizes, sizeSelected, ...rest } = sku;
                                return rest;
                            }
                            return sku;
                        });
                    } else {
                        product[key] = values[key];
                    }
                }
            });

            // Append the product object to FormData as a JSON string
            formData.append('product', JSON.stringify(product));

            // Append images array to FormData
            values.images.forEach((file) => {
                formData.append('images', file);
            });

            // Log each key-value pair in FormData
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    // Do not set the Content-Type header manually
                },
                body: formData, // Send FormData directly as the body
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`Product Added successfully`);
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };


    // const handleSubmit = async (values) => {
    //     console.log(values, "jammu");
    //     try {
    //         const url = ADD_PRODUCT_URL;
    //         const method = "POST";

    //         const formData = new FormData();

    //         // Append basic fields
    //         formData.append('name', values.name);
    //         formData.append('slug', values.slug);
    //         formData.append('description', values.description);
    //         formData.append('basePrice', values.basePrice);
    //         formData.append('status', values.status);
    //         formData.append('metaTitle', values.metaTitle);
    //         formData.append('metaDescription', values.metaDescription);
    //         formData.append('isFeatured', values.isFeatured);

    //         // Handle categories (array to JSON)
    //         values.categories.forEach((category, index) => {
    //             formData.append(`categories[${index}]`, category);
    //         });

    //         formData.append('brandId', values.brandId);

    //         // Handle attributes
    //         values.attributes.forEach((attr, index) => {
    //             formData.append(`attributes[${index}][name]`, attr.name);
    //             formData.append(`attributes[${index}][value]`, attr.value);
    //         });

    //         // Handle SKUs
    //         values.skus.forEach((sku, index) => {
    //             formData.append(`skus[${index}][sku]`, sku.sku);
    //             formData.append(`skus[${index}][price]`, sku.price);
    //             formData.append(`skus[${index}][colorId]`, sku.colorId);

    //             if (sku.sizeSelected) {
    //                 sku.sizes.forEach((size, sizeIndex) => {
    //                     formData.append(`skus[${index}][sizes][${sizeIndex}][sizeId]`, size.sizeId);
    //                     formData.append(`skus[${index}][sizes][${sizeIndex}][quantity]`, size.quantity);
    //                 });
    //             }

    //             if (sku.weightSelected) {
    //                 sku.weights.forEach((weight, weightIndex) => {
    //                     formData.append(`skus[${index}][weights][${weightIndex}][weightId]`, weight.weightId);
    //                     formData.append(`skus[${index}][weights][${weightIndex}][quantity]`, weight.quantity);
    //                 });
    //             }
    //         });

    //         // Handle images
    //         values.images.forEach((file) => {
    //             formData.append('images', file);
    //         });

    //         console.log(formData, "jhjhjhjhjhhhhhhhhhh"); // Log FormData entries for debugging

    //         const response = await fetch(url, {
    //             method: method,
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 // Do not set Content-Type header for FormData; it is set automatically
    //             },
    //             body: formData, // Send FormData directly as the body
    //         });

    //         const data = await response.json();
    //         console.log(data, "japan");
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







    // const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    //     try {
    //         const url = `${UPDATE_Product_URL}/${values.id}`;
    //         const response = await fetch(url, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(values)
    //         });

    //         const data = await response.json();
    //         if (response.ok) {
    //             toast.success(`Product updated successfully`);
    //             // Refresh the Product list to ensure pagination is updated
    //             getProduct(pagination.currentPage);
    //             navigate('/Product/view');
    //         } else {
    //             toast.error(`${data.errorMessage}`);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("An error occurred");
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // const handlePageChange = (newPage) => {
    //     setPagination((prev) => ({ ...prev, currentPage: newPage }));
    //     getProduct(newPage); // API is 0-indexed for pages
    // };

    return {
        // Product,
        // edit,
        // currentProduct,
        // GetProductById,
        getProductById,
        ProductDetails,
        // pagination,
        // getProduct,
        // handleDelete,
        // handleUpdate,
        handleSubmit,
        getProduct,
        Product
        // handlePageChange,
        // seloptions,
        // groups,

    };
};

export default useProduct;