import React from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const authorQuery = gql`
  {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`;

const Authors = (props) => {
  const authorsQuery = useQuery(authorQuery);
  if (!props.show || authorsQuery.loading) {
    return null
  }

  const authors = authorsQuery.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors