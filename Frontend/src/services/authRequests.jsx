import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

async function signUp(formData) {
    try {
        const response = await axios.post(`${backendURL}/auth/signUp`, formData, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = response.data;
    } catch (error) {
        throw new Error(`${error.response.data}`)
    }
}

async function signIn(formData) {
    try {
        const response = await axios.post(`${backendURL}/auth/signIn`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = response.data;

        if (response.status !== 200) {
            alert(data);
            return;
        }
        return data;
    } catch (error) {
        console.log(error.response.data);
        throw new Error(`${error.response.data}`)
    }
}
async function signOut(token) {
    try {
        console.log(token);
        const response = await axios.delete(`${backendURL}/auth/signout`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
export {
    signUp,
    signIn,
    signOut
}