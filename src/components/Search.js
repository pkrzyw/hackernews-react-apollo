import React, { useState } from 'react';
import { withApollo } from 'react-apollo';

const Search = () => {
    const [links, setLinks] = useState([])
    const [filter, setFilter] = useState('')

    const executeSearch = async () => {

    }
    return (
        <div>
            <div>
                Search
                <input
                    type='text'
                    onChange={e => setFilter(e.target.value)}
                />
                <button onClick={() => executeSearch()}>OK</button>
            </div>
        </div>
    );
}

export default withApollo(Search);
