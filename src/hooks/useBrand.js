import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_Brand_URL, GET_Brand_URL, UPDATE_Brand_URL, DELETE_Brand_URL } from "../constants/utils";

const useBrand = (searchValue) => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Brands, setBrands] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentBrand, setCurrentBrand] = useState({ name: '',slug:"" });

    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagBrandList: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    });

    useEffect(() => {
        console.log(`Fetching Brand with search value: ${searchValue}`);
        getBrand(pagination.currentPage, searchValue);
    }, [searchValue]);

    const getBrand = async (page, searchValue) => {
        try {
            // console.log(`Sending request to fetch Brand with search value: ${searchValue}`);
            const response = await fetch(`${GET_Brand_URL}`, {
                method: "GET",
                headers: {
                    // "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                // body: JSON.stringify({ name: searchValue })
            });
            const data = await response.json();
            console.log('Received Brand data:', data);
            setBrands(data.content);
            setPagination({
                totalItems: data.totalElements,
                pagBrandList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Brand");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_Brand_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`Brand Deleted successfully`);   

                const isCurrentPageEmpty = Brand.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getBrand(pagination.currentPage, searchValue);
                }
            } else {
                const data = await response.json();
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleUpdate = (e, item) => {
        e.preventDefault();
        setEdit(true);
        setCurrentBrand(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values,"juju");

        try {
            const url = edit ? `${UPDATE_Brand_URL}/${currentBrand.id}` : ADD_Brand_URL;
            const method = edit ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Brand ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentBrand({ name: '' });
                getBrand(pagination.currentPage, searchValue);
            } else {
                toast.error(`${data.errorMessage}`); 
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        getBrand(newPage);
    };

    return {
        Brands,
        edit,
        currentBrand,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useBrand;