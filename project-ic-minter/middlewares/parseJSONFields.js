// middleware for parsing fields in the request body
// if the value of the field is a valid JSON string, it will be converted to an equivalent object value
const parseJSONFields = (req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                try {
                    // Try to parse as JSON
                    req.body[key] = JSON.parse(req.body[key]);
                } catch (e) {
                    // If parsing fails, keep as string
                }
            }
        });
    }
    next();
};

module.exports = parseJSONFields;