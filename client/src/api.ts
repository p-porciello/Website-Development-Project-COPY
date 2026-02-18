import axios from 'axios';

const URL = "http://localhost:8080"

//item routes
export async function getAllItems() {
    const response = await axios.get(`${URL}/lost-items`);

    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status); //remove if this causes issues, but i don't think it will
        return
    }
}

export async function getQueriedItems(query) {
    const response = await axios.get(`${URL}/lost-items/search/${query}`);

    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status); //remove if this causes issues, but i don't think it will
        return
    }
}

export async function getApprovedItems() {
    const response = await axios.get(`${URL}/lost-items/admin-approved`);

    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status); //remove if this causes issues, but i don't think it will
        return
    }
}

export async function getSpecificItem(id) {
    const response = await axios.get(`${URL}/lost-items/${id}`);
    
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status);
        return
    }
}

export async function createNewItem(item) {
    const response = await axios.post(`${URL}/lost-items`, item);
    
    /*
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status);
        return;
    }
    */
    return response;
}

export async function updateItem(id, item) {
    const response = await axios.put(`${URL}/lost-items/${id}`, item);

    /*
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status);
        return;
    }
    */
    return response;
}

export async function deleteSpecificItem(id) {
    const response = await axios.delete(`${URL}/lost-items/${id}`);

    /*
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status);
        return;
    }
    */
    return response;
}


//user routes
export async function getAllUsers() {
    const response = await axios.get(`${URL}/user`);

    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status); //remove if this causes issues, but i don't think it will
        return
    }
}

export async function getSpecificUser(id) {
    const response = await axios.get(`${URL}/user/${id}`);

    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status); //remove if this causes issues, but i don't think it will
        return
    }
}

export async function createNewUser(user) {
    const response = await axios.post(`${URL}/user`, user);
    
    /*
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status);
        return;
    }
    */
    return response;
}

export async function updateUser(id, user) {
    const response = await axios.put(`${URL}/user/${id}`, user);

    /*
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status);
        return;
    }
    */
    return response;
}

export async function deleteSpecificUser(id) {
    const response = await axios.delete(`${URL}/user/${id}`);

    /*
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response.status);
        return;
    }
    */
    return response;
}

export async function verifyUser(user) {
    const response = await axios.post(`${URL}/user/login`, user)
    console.log(response)
    if (response.data.success) {
        return response.data.token;
    } else {
        alert(response.statusText)
    }
}