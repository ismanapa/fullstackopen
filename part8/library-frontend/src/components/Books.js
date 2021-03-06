import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const allBooks = gql`
  {
    allBooks {
      title,
      author,
      published
    }
  }
`;

const Books = (props) => {
  const booksQuery = useQuery(allBooks, { pollInterval: 2000 });
  if (!props.show || booksQuery.loading) {
    return null
  }

  const books = booksQuery.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books