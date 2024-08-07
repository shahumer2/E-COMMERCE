import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_Weight_URL, GET_Weight_URL, UPDATE_Weight_URL, DELETE_Weight_URL } from "../constants/utils";

const useWeight = (searchValue) => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Weights, setWeights] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentWeight, setCurrentWeight] = useState({ value: '' });
console.log(token,"hey token");
    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagWeightList: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    });

    useEffect(() => {
        console.log(`Fetching Weight with search value: ${searchValue}`);
        getWeight(pagination.currentPage, searchValue);
    }, [searchValue]);

    const getWeight = async (page, searchValue) => {
        try {
          
            const response = await fetch(`${GET_Weight_URL}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                // body: JSON.stringify({ name: searchValue })
            });
            const data = await response.json();
            console.log('Received Weight data:', data);
            setWeights(data.content);
            setPagination({
                totalItems: data.totalElements,
                pagWeightList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Weight");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_Weight_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`Weight Deleted successfully`);   

                const isCurrentPageEmpty = Weight.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getWeight(pagination.currentPage, searchValue);
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
        setCurrentWeight(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values,"juju");

        try {
            const url = edit ? `${UPDATE_Weight_URL}/${currentWeight.id}` : ADD_Weight_URL;
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
                toast.success(`Weight ${edit ? 'updated' : 'added'} successfully`);
              
                setEdit(false);
                setCurrentWeight({ value: '' });
                // getWeight(pagination.currentPage, searchValue);
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
        getWeight(newPage);
    };

    return {
        Weights,
        edit,
        currentWeight,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useWeight;