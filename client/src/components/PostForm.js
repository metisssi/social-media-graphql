import React from 'react'

import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'



import { useForm } from '../util/hooks'

import { FETCH_POSTS_QUERY } from '../util/grapql'


const PostForm = () => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })


    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        onError(err) {
            // здесь можно логировать, показывать UI и т.д.
            console.log(err.graphQLErrors[0].message);
        },
        update(proxy, result) {
            try {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });

                // создаём новый объект, не мутируя старый
                const newData = {
                    ...data,
                    getPosts: [result.data.createPost, ...data.getPosts]
                };

                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: newData
                });

                values.body = '';
            } catch (err) {
                console.error(err);
            }
        }
    });


    function createPostCallback() {
        createPost();
    }

    return (
        <>

            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className='ui error message' style={{marginBottom: 20}}>
                    <ul className='list'>
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}

        </>
    )
}


const CREATE_POST_MUTATION = gql`
mutation craetePost($body: String!){
    createPost(body: $body){
        id
        body
        createdAt
        username
        likes{
            id username createdAt
        }
        likeCount
        comments{
            id 
            body
            username
            createdAt
        }
        commentCount
    }
}
`

export default PostForm