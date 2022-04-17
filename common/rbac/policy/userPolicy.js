const { EDIT_POST, DELETE_POST, GET_USER_POST } = require("../../../src/posts/endPointPost");
const { REPORTED_POST } = require("../../../src/reportPost/endPointReport");
const { UPDATE_PROFILE, UPDATE_PASSWORD, REPORT_USER, DEACTIVATE } = require("../../../src/users/endPoints");

module.exports=[
    UPDATE_PROFILE,
    UPDATE_PASSWORD,
    REPORT_USER,DEACTIVATE,
    EDIT_POST,
    DELETE_POST,DEACTIVATE,
    GET_USER_POST,DEACTIVATE,
    REPORTED_POST

    
]