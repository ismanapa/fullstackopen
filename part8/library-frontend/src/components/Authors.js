import React, { useState } from 'react'
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

const authorQuery = gql`
  {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`;

const updateAuhtorMutation = gql`
  mutation updateAuhtor($name: String!, $year: Int!){
    editAuthor (
      name: $name,
      setBornTo: $year
    ) {
      name
    }
  }
`;

const Authors = (props) => {
  const [author, setAuhtor] = useState('');
  const [year, setYear] = useState('');

  const authorsQuery = useQuery(authorQuery, { pollInterval: 2000 });
  const [updateAuthor] = useMutation(updateAuhtorMutation);

  if (!props.show || authorsQuery.loading) {
    return null
  }

  const authors = authorsQuery.data.allAuthors;

  const submit = async (e) => {
    e.preventDefault()

    await updateAuthor({
      variables: { name: author, year: parseInt(year) }
    });

    setAuhtor('')
    setYear('')
  };

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


      <div>
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
          <div>
            author
          <input
              value={author}
              onChange={({ target }) => setAuhtor(target.value)}
            />
          </div>
          <div>
            year
          <input
              type='number'
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors