import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_PRODUCT_URL } from "../constants/utils"
import { useNavigate } from 'react-router-dom';

const useProduct = () => {
    console.log("i got here");
    // const navigate = useNavigate();
    // const [rows, setRows] = useState([{ id: Date.now(), selectedOption1: null, selectedOption2: null, selectedOption3: [], numOfLooms: 0 }]);
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    // const [Product, setProduct] = useState([]);
    // const [edit, setEdit] = useState(false);
    
  



    // const [pagination, setPagination] = useState({
    //     totalItems: 0,
    //     data: [],
    //     totalPages: 0,
    //     currentPage: 1,
    //     itemsPerPage: 0
    // });

    // useEffect(() => {
    //     getProduct(pagination.currentPage || 1);
    // }, []);

    // const getProduct = async (page) => {
    //     try {
          
    //         const response = await fetch(`${GET_Product_URL}?page=${page}`, {
    //             method: "GET",
    //             headers: {
                    
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //         const data = await response.json();
           
           
    //         setProduct(data.content);
    //         setPagination({
    //             totalItems: data.totalElements,
    //             data: data.content,
    //             totalPages: data.totalPages,
    //             currentPage: data.number+1 ,
    //             itemsPerPage: data.size,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Failed to fetch Product");
    //     }
    // };

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

    // const handleUpdate = (e, item) => {
    //     console.log(item, "on update");
    //     e.preventDefault();
    //     setEdit(true);
    //     if (item && item.id) {
    //         navigate(`/Product/updateProduct/${item.id}`);
    //     } else {
    //         console.error("Item or its ID is missing");
    //     }
    // };

    const handleSubmit = async (values) => {
        console.log(values, "jammu");
        try {
            const url = ADD_PRODUCT_URL;
            const method = "POST";
    
            const formData = new FormData();
         
            formData.append('name', values.product.name);
            formData.append('description', values.product.description);
            formData.append('price', values.product.price);
            formData.append('status', values.product.status);
    
            // Handle sizes
            if (values.product.sizes.length > 0) {
                values.product.sizes.forEach((size, index) => {
                    formData.append(`sizes[${index}][size]`, size.size);
                    formData.append(`sizes[${index}][quantity]`, size.quantity);
                });
            }
    
            // Handle weights
            if (values.product.weights.length > 0) {
                values.product.weights.forEach((weight, index) => {
                    formData.append(`weights[${index}][weight]`, weight.weight);
                    formData.append(`weights[${index}][quantity]`, weight.quantity);
                });
            }
    
            // Handle images
            if (values.product.images.length > 0) {
                values.product.images.forEach((file) => {
                    formData.append('images', file);
                });
            }
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
    
            const data = await response.json();
            console.log(data, "japan");
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
        // pagination,
        // getProduct,
        // handleDelete,
        // handleUpdate,
        handleSubmit,
        // handlePageChange,
        // seloptions,
        // groups,
   
    };
};

export default useProduct;