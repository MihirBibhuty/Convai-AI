export function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('session', serializedState)

    } catch (e) {
        console.log(e);
    }
}

export function loadFromLocalStorage(state) {
    try {
        const serializedState = localStorage.getItem('session');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined
    }
}


export function deleteFromLocalStorage(state) {
    try {
        const serializedState = localStorage.clear();
        alert("Local Storage Cleared! Refresh to see results.");
    } catch (e) {
        console.log(e);
        // return undefined
    }
}