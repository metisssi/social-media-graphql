const Post = require('../../models/Post')
const mongoose = require('mongoose');
const checkAuth = require('../../util/check-auth')

const { AuthenticationError } = require('apollo-server');
const { subscribe } = require('graphql');


module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch (error) {
                throw new Error(err)
            }
        },
        async getPost(_, { postId }) {
            try {


                if (!mongoose.Types.ObjectId.isValid(postId)) {
                    throw new Error('Invalid post ID format');
                }


                const post = await Post.findById(postId)

                if (!post) {
                    throw new Error('Post not found');
                }

                return post;


            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        async createPost(_, { body }, context ){
            const user = checkAuth(context)
       
            if(body.trim() === '') {
                throw new Error('Post body must not be empty')
            }
            
            const newPost = new Post({
                body, 
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post
        },

        async deletePost(_, { postId }, context){
            const user = checkAuth(context)

            try {
                const post = await Post.findById(postId)

                if(user.username === post.username) {
                        await post.deleteOne()
                    return 'Post deleted successfully'
                }else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },

    Subscription: {
        newPost: {
              subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }

}