export const BASE_URL = 'http://localhost:8085';
export const SIGNIN_URL = `${BASE_URL}/api/v1/auth/signin`;
export const SIGNUP_URL = `${BASE_URL}/api/v1/auth/signup`;
export const ADMIN_SIGNIN_URL = `${BASE_URL}/api/v1/auth/signin`;


//Unit Url's
export const ADD_UNIT_URL = `${BASE_URL}/unit/addUnit`;
export const GET_UNIT_URL = `${BASE_URL}/unit/search`;
export const UPDATE_UNIT_URL = `${BASE_URL}/unit/updateUnit`;
export const VIEW_ALL_UNITS = `${BASE_URL}/unit/viewAll`;
export const DELETE_UNIT_URL = `${BASE_URL}/unit/deleteUnit/`;

//Location Url's
export const ADD_LOCATION_URL = `${BASE_URL}/location/add`;
export const GET_LOCATION_URL = `${BASE_URL}/location/all`;
export const UPDATE_LOCATION_URL = `${BASE_URL}/location/update`;
export const VIEW_ALL_LOCATIONS = `${BASE_URL}/location/viewAll`;
export const DELETE_LOCATION_URL = `${BASE_URL}/location/delete/`;

// Supplier Urls's
export const ADD_SUPPLIER_URL = `${BASE_URL}/supplier/addSupplier`;
export const GET_SUPPLIER_URL = `${BASE_URL}/supplier/viewAll`;
export const VIEW_ALL_SUPPLIER_URL = `${BASE_URL}/supplier/getAll`;
export const GET_SUPPLIER_ID_URL = `${BASE_URL}/supplier/getSupplier`;
export const UPDATE_SUPPLIER_URL = `${BASE_URL}/supplier/updateSupplier`;
export const DELETE_SUPPLIER_URL = `${BASE_URL}/supplier/deleteSupplier/`;


//Material Url's
export const ADD_MATERIAL_URL = `${BASE_URL}/material/add`;
export const GET_MATERIAL_URL = `${BASE_URL}/material/getAll`;
export const VIEW_ALL_MATERIAL_URL = `${BASE_URL}/material/viewAll`;
export const UPDATE_MATERIAL_URL = `${BASE_URL}/material/update`;
export const DELETE_MATERIAL_URL = `${BASE_URL}/material/delete/`;

// material po

export const ADD_MATERIALPO_URL = `${BASE_URL}/purchaseOrder`;
export const GET_MATERIALPO_BY_ID_URL = `${BASE_URL}/purchaseOrder`;
export const GET_MATERIALPO_URL = `${BASE_URL}/purchaseOrder/search`;
export const UPDATE_MATERIALPO_URL = `${BASE_URL}/purchaseOrder/updatePurchase`;
export const DELETE_MATERIALPO_URL = `${BASE_URL}/purchaseOrder/`;

//signup


export const SIGNUPURL = `${BASE_URL}/api/v1/auth/signup`;

//Category url's
export const ADD_Category_URL = `${BASE_URL}/api/categories`
export const DELETE_Category_URL = `${BASE_URL}/api/categories`
export const UPDATE_Category_URL = `${BASE_URL}/api/categories`
export const GET_Category_URL = `${BASE_URL}/api/categories`



//color

export const ADD_Color_URL = `${BASE_URL}/api/colors`
export const DELETE_Color_URL = `${BASE_URL}/api/colors`
export const UPDATE_Color_URL = `${BASE_URL}/api/colors`
export const GET_Color_URL = `${BASE_URL}/api/colors`

// size

export const ADD_Size_URL = `${BASE_URL}/api/sizes`
export const DELETE_Size_URL = `${BASE_URL}/api/sizes`
export const UPDATE_Size_URL = `${BASE_URL}/api/sizes`
export const GET_Size_URL = `${BASE_URL}/api/sizes`

// weight

export const ADD_Weight_URL = `${BASE_URL}/api/weights`
export const DELETE_Weight_URL = `${BASE_URL}/api/weights`
export const UPDATE_Weight_URL = `${BASE_URL}/api/weights`
export const GET_Weight_URL = `${BASE_URL}/api/weights`



//brand

export const ADD_Brand_URL = `${BASE_URL}/api/brand`
export const DELETE_Brand_URL = `${BASE_URL}/api/brand`
export const UPDATE_Brand_URL = `${BASE_URL}/api/brand`
export const GET_Brand_URL = `${BASE_URL}/api/brand`



//create Inventory Material
export const ADD_INVENTORY_URL = `${BASE_URL}/inventory`
export const GET_INVENTORY_URL = `${BASE_URL}/inventory/search`
export const UPDATE_INVENTORY_URL = `${BASE_URL}/inventory`
export const GET_INVENTORYBYID_URL = `${BASE_URL}/inventory`
export const DELETE_INVENTORY_URL = `${BASE_URL}/inventory`



//stock journel url
export const ADD_STOCKJOURNEL_URL = `${BASE_URL}/stockjournal`

export const GET_STOCK_URL = `${BASE_URL}/stockjournal/search`
export const GET_STOCKBYID_URL = `${BASE_URL}/stockjournal`
export const UPDATE_STOCK_URL = `${BASE_URL}/stockjournal`
export const DELETE_STOCK_URL = `${BASE_URL}/stockjournal/delete`

//PRODUCTS
export const ADD_PRODUCT_URL = `${BASE_URL}/products`


export const options = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    theme: 'dark',
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true
};

//React-select customStyles function


export const customStyles = (theme) => ({
    control: (provided, state) => ({
        ...provided,
        minHeight: '50px',
        fontSize: '16px',
        backgroundCategory: theme === 'dark' ? '#1D2A39' : '#fff',
        Category: theme === 'dark' ? '#fff' : '#000',
        border: `1.5px solid ${theme === 'dark' ? '#3D4D60' : '#E5E5E5'}`, // Border Category based on theme
        borderRadius: '4px', // Assuming the same rounded border
        boxShadow: 'none', // Remove any default box shadow
        '&:hover': {
            borderCategory: state.isFocused ? '#3B82F6' : theme === 'dark' ? '#3D4D60' : '#E5E5E5', // Hover border Category
        },
        '&:focus': {
            borderCategory: state.isFocused ? '#3B82F6' : theme === 'dark' ? '#3D4D60' : '#E5E5E5', // Focus border Category
        },
        '&:active': {
            borderCategory: state.isFocused ? '#3B82F6' : theme === 'dark' ? '#3D4D60' : '#E5E5E5', // Active border Category
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '10px 10px',
        // zIndex: 9999,

    }),
    input: (provided) => ({
        ...provided,
        fontSize: '16px',
        Category: theme === 'dark' ? '#fff' : '#000',
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '16px',
        Category: theme === 'dark' ? '#fff' : '#000',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundCategory: theme === 'dark' ? '#1D2A39' : '#fff',
        zIndex: 99999,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundCategory: state.isFocused ? (theme === 'dark' ? '#000' : '#f0f0f0') : 'transparent',
        Category: state.isFocused ? (theme === 'dark' ? '#fff' : '#000') : (theme === 'dark' ? '#fff' : '#000'),
    }),
});



