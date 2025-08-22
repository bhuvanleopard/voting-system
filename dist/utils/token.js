import jwt from 'jsonwebtoken';
const generate = (payload, secret_key, opts) => {
    const { sub, jti } = payload;
    const { expiresIn } = opts;
    return jwt.sign({ sub, jti }, secret_key, { expiresIn });
};
const verify = (req_token, secret_key) => {
    try {
        const decode = jwt.verify(req_token, secret_key);
        return decode;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    ;
};
export default { generate, verify };
