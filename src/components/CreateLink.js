import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { FEED_QUERY } from './LinkList'
import { LINKS_PER_PAGE } from '../constants'


const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`
export default function CreateLink(props) {
    const [state, setState] = useState({ url: '', description: '' })
    const { url, description } = state
    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    value={description}
                    onChange={e => setState(Object.assign({}, { ...state }, { description: e.target.value }))}
                    type="text"
                    placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    value={url}
                    onChange={e => setState(Object.assign({}, { ...state }, { url: e.target.value }))}
                    type="text"
                    placeholder="url for the link"
                />
            </div>
            <Mutation
                mutation={POST_MUTATION}
                variables={{ description, url }}
                onCompleted={() => props.history.push('/new/1')}
                update={(store, { data: { post } }) => {
                    const first = LINKS_PER_PAGE
                    const skip = 0
                    const orderBy = 'createdAt_DESC'
                    const data = store.readQuery({
                        query: FEED_QUERY,
                        variables: { first, skip, orderBy }
                    })
                    data.feed.links.unshift(post)
                    store.writeQuery({
                        query: FEED_QUERY,
                        data,
                        variables: { first, skip, orderBy }
                    })
                }}

            >
                {postMutation => <button onClick={postMutation}>Submit</button>}
            </Mutation>
        </div>
    )
}
