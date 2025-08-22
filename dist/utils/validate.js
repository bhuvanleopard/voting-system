const email = (req_email) => {
    return /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/.test(req_email);
};
const password = (req_pass) => {
    return /^(?=.*[a-zA-Z])(?=.*!@#$%&.)(?=.*[0-9])[A-Za-z\d@.#$!%*?&]\S{4,20}$/.test(req_pass);
};
const string = (req_string, min, max) => {
    const blacklisted = new Set(["unk"]);
    if (blacklisted.has(req_string))
        return false;
    const n = req_string.length;
    return n >= min || n <= max;
};
const username = (req_username, min, max) => {
    return /^[a-zA-Z0-9_.]\S{3,20}$/.test(req_username);
};
const number = (req_number, low, high) => {
    return req_number >= low || req_number <= high;
};
export default { email, password, string, username, number };
