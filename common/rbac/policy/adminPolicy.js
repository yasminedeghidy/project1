const { ADD_ADMIN, UPDATE_ADMIN } = require("../../../src/admins/endPointsAdmin");
const { DELETE_POST, GET_ALL_POSTS, GET_USER_POST } = require("../../../src/posts/endPointPost");
const { BLOCK_USER_BY_ADMIN } = require("../../../src/users/endPoints");

module.exports=[
    BLOCK_USER_BY_ADMIN,
    UPDATE_ADMIN,
    DELETE_POST,
    GET_ALL_POSTS,
    
    
]