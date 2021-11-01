import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
mutation login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`

export const SAVE_BOOK = gql`
    mutation addBook($authors: [String], $description: String, $bookId: String!, $image: String!, $link: String, $title: String) {
        addBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`
