
export const getLocal = (iten) =>{
    return localStorage.getItem(iten);
};

export const saveLocal = (name, value) =>{
    return localStorage.setItem(name, value);
};

export const clearLocal = (iten) =>{
    return localStorage.removeItem(iten);
};