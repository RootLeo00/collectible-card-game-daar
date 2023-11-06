import React, { useState } from 'react';
import { List, ListItem, TextField } from '@mui/material';
import Link from '@mui/material/Link';

const UsersList = ({ usersData, navigate }) => {
    const [userSearchText, setUserSearchText] = useState('');//state of the searchbar for users

    return (
        <div>
            <h2>Users</h2>
            <div>
                {/* Searchbar */}
                <TextField
                    label="Search user"
                    variant="outlined"
                    value={userSearchText}
                    onChange={(e) => setUserSearchText(e.target.value)}/*change the value of searchText when the textField input changes*/
                />
            </div>
            <List>
                {usersData.filter((user) => user.name.toLowerCase().includes(userSearchText.toLowerCase())).map((user) => (
                    <ListItem key={user.id}>
                        <Link
                            component="button"
                            onClick={() => navigate(`/UserInfoPage/${user.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {user.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
export default UsersList;