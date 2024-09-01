const checkContentType = (requiredContentType) => {
    return (req, res, next) => {
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.startsWith(requiredContentType)) {
            return res.status(415).json({ message: `Content-Type must start with ${requiredContentType}` });
        }
        next();
    };
};

export { checkContentType };
