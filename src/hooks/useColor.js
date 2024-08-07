import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_Color_URL, GET_Color_URL, UPDATE_Color_URL, DELETE_Color_URL } from "../constants/utils";

const useColor = (searchValue) => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Colors, setColors] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentColor, setCurrentColor] = useState({ name: '' });

    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagColorList: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    });

    useEffect(() => {
        console.log(`Fetching Color with search value: ${searchValue}`);
        getColor(pagination.currentPage, searchValue);
    }, [searchValue]);

    const getColor = async (page, searchValue) => {
        try {
         
            const response = await fetch(`${GET_Color_URL}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                // body: JSON.stringify({ name: searchValue })
            });
            const data = await response.json();
            console.log('Received Color data:', data);
            setColors(data.content);
            setPagination({
                totalItems: data.totalElements,
                pagColorList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Color");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_Color_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`Color Deleted successfully`);   

                const isCurrentPageEmpty = Color.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getColor(pagination.currentPage, searchValue);
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
        setCurrentColor(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values,"juju");

        try {
            const url = edit ? `${UPDATE_Color_URL}/${currentColor.id}` : ADD_Color_URL;
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
                toast.success(`Color ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentColor({ name: '' });
                getColor(pagination.currentPage, searchValue);
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
        getColor(newPage);
    };

    return {
        Colors,
        edit,
        currentColor,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useColor;