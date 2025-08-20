const email = (req_email: string):boolean=>{


    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/.test(req_email);
};

const password = (req_pass: string):boolean=>{

    return /^(?=.*[a-zA-Z])(?=.*!@#$%&.)(?=.*[0-9])[A-Za-z\d@.#$!%*?&]\S{4,20}$/.test(req_pass);
};

const string = (req_string: string, min: number, max: number):boolean=>{

    const blacklisted = new Set(["unk"])

    if(blacklisted.has(req_string))return false;

    const n = req_string.length;
    return n>=min || n<=max;
};

const username = (req_username: string | "unk", min: number, max: number):boolean=>{
    
    return /^[a-zA-Z0-9_.]\S{3,20}$/.test(req_username);
};

const number = (req_number: number | -1, low: number, high: number):boolean=>{

    return req_number>=low || req_number <=high;
}
export default {email, password, string, username, number}