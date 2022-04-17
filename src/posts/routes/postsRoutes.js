const handleValidation = require("../../../common/middleware/validationRequest");
const { addPost, editPost, deletePost, getAllPost, getUserPost } = require("../controller/postController");
const { addPostSchema } = require("../joi/postJoi");
const isAuthorized = require("../../../common/middleware/isAuthorized");
const { EDIT_POST, DELETE_POST, GET_ALL_POSTS, GET_USER_POST } = require("../endPointPost");
const router=require("express").Router();

router.post('/posts', handleValidation(addPostSchema),addPost)

router.put('/posts', isAuthorized(EDIT_POST),editPost)

router.delete('/posts', isAuthorized(DELETE_POST),deletePost)

router.get('/posts', isAuthorized(GET_ALL_POSTS),getAllPost)

router.get('/userPost', isAuthorized(GET_USER_POST),getUserPost)

module.exports=router;