import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_Size_URL, GET_Size_URL, UPDATE_Size_URL, DELETE_Size_URL } from "../constants/utils";

const useSize = (searchValue) => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Size, setSize] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentSize, setCurrentSize] = useState({ value: '' });
console.log(token,"hey token");
    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagSizeList: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    });

    useEffect(() => {
        console.log(`Fetching Size with search value: ${searchValue}`);
        getSize(pagination.currentPage, searchValue);
    }, [searchValue]);

    const getSize = async (page, searchValue) => {
        try {
            console.log(`Sending request to fetch Size with search value: ${searchValue}`);
            const response = await fetch(`${GET_Size_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name: searchValue })
            });
            const data = await response.json();
            console.log('Received Size data:', data);
            setSize(data.content);
            setPagination({
                totalItems: data.totalElements,
                pagSizeList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Size");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_Size_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`Size Deleted successfully`);   

                const isCurrentPageEmpty = Size.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getSize(pagination.currentPage, searchValue);
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
        setCurrentSize(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values,"juju");

        try {
            const url = edit ? `${UPDATE_Size_URL}/${currentSize.id}` : ADD_Size_URL;
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
                toast.success(`Size ${edit ? 'updated' : 'added'} successfully`);
              
                setEdit(false);
                setCurrentSize({ value: '' });
                // getSize(pagination.currentPage, searchValue);
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
        getSize(newPage);
    };

    return {
        Size,
        edit,
        currentSize,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useSize;