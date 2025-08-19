const unhandled = (_req, res) => {
    return res.status(404).json({ msg: "this route is not defined" });
};
export default { unhandled };
