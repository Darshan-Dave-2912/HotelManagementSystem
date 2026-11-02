const userService = require("./users.service");

const createUser = async (req, res, next) => {

    try
    {
        const user = await userService.createUser(req.body);

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    }
    catch(error)
    {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try
    {
        const  result = await userService.getUser(req.query);

        return res.status(200).json({
            success: true,
            message: 'Users fetch successfully',
            data: result.data,
            pagination: result.pagination,
        });
    }
    catch(error)
    {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try
    {
        const user = await userService.getUserById(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'User fetch successfully',
            data: user,
        });
    }
    catch(error)
    {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try
    {
        const user = await userService.updateUser(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    }
    catch(error)
    {
        next(error);
    }
}

const deleteUser = async(req, res, next) => {
    try
    {
        const result = await userService.deleteUser(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: result,
        });
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
}