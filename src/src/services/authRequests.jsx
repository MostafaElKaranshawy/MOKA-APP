import axios from "axios";

async function signUp(formData) {
    try {
        const response = await axios.post("http://localhost:4000/auth/signUp", formData, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = response.data;
    } catch (error) {
        throw new Error(error)
    }
}

async function signIn(formData) {
    try {
        const response = await axios.post("http://localhost:4000/auth/signIn", formData, {
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
        const response = await axios.delete("http://localhost:4000/auth/signout",{
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