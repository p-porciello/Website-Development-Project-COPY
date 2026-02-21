import axios from 'axios';
import type { LostItem } from './types';

const URL = 'http://localhost:8080';

//item routes
export async function getAllItems() {
  const response = await axios.get<LostItem[]>(`${URL}/lost-items`);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response.status); //remove if this causes issues, but i don't think it will
    return;
  }
}

export async function getQueriedItems(query: string) {
  const response = await axios.get<LostItem[]>(
    `${URL}/lost-items/search/${query}`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response.status); //remove if this causes issues, but i don't think it will
    return;
  }
}

export async function getApprovedItems() {
  const response = await axios.get<LostItem[]>(
    `${URL}/lost-items/admin-approved`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response.status); //remove if this causes issues, but i don't think it will
    return;
  }
}

export async function getSpecificItem(id: string | undefined) {
  const response = await axios.get<LostItem>(`${URL}/lost-items/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response.status);
    return;
  }
}

export async function createNewItem(item: Record<string, unknown>) {
  try {
    const response = await axios.post(`${URL}/lost-items`, item);
    return response;
  } catch (error) {
    console.error('Error creating new item:', error);
    throw error;
  }
}

export async function updateItem(id: string, item: Record<string, unknown>) {
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

export async function deleteSpecificItem(id: string) {
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
    return;
  }
}

export async function getSpecificUser(id: string) {
  const response = await axios.get(`${URL}/user/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response.status); //remove if this causes issues, but i don't think it will
    return;
  }
}

export async function createNewUser(user: Record<string, unknown>) {
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

export async function updateUser(id: string, user: Record<string, unknown>) {
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

export async function deleteSpecificUser(id: string) {
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

export async function getAllInquiries() {
  const response = await axios.get(`${URL}/inquiries`);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response.status); //remove if this causes issues, but i don't think it will
    return;
  }
}

export async function getSpecificInquiry(id: string | undefined) {
  const response = await axios.get(`${URL}/inquiries/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response.status);
    return;
  }
}

export async function createNewInquiry(item: Record<string, unknown>) {
  const response = await axios.post(`${URL}/inquiries`, item);

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

export async function updateInquiry(id: string, item: Record<string, unknown>) {
  const response = await axios.put(`${URL}/inquiries/${id}`, item);

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

export async function deleteSpecificInquiry(id: string) {
  const response = await axios.delete(`${URL}/inquiries/${id}`);

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

export async function verifyUser(user: { email: string; password: string }) {
  const response = await axios.post(`${URL}/user/login`, user);
  console.log(response);
  if (response.data.success) {
    return response.data.token;
  } else {
    alert(response.statusText);
  }
}
