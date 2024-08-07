import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_Category_URL, GET_Category_URL, UPDATE_Category_URL, DELETE_Category_URL } from "../constants/utils";

const useCategory = (searchValue) => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Category, setCategory] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '',slug:"" });
console.log(Category,"frontttttttttttttttttttttttttt");
    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagCategoryList: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    });

    useEffect(() => {
  
        getCategory(pagination.currentPage, searchValue);
    }, [searchValue]);

    const getCategory = async (page, searchValue) => {
        try {
           
            const response = await fetch(`${GET_Category_URL}`, {
                method: "GET",
                headers: {
                    // "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                // body: JSON.stringify({ name: searchValue })
            });
            const data = await response.json();
           
            setCategory(data.content);
            setPagination({
                totalItems: data.totalElements,
                pagCategoryList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Category");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_Category_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`Category Deleted successfully`);   

                const isCurrentPageEmpty = Category.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getCategory(pagination.currentPage, searchValue);
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
        setCurrentCategory(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values,"juju");

        try {
            const url = edit ? `${UPDATE_Category_URL}/${currentCategory.id}` : ADD_Category_URL;
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
                toast.success(`Category ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentCategory({ name: '' });
                getCategory(pagination.currentPage, searchValue);
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
        getCategory(newPage);
    };

    return {
        Category,
        edit,
        currentCategory,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useCategory;