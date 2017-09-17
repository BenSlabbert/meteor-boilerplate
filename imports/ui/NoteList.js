import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
    return (
        <div>
            NoteList {props.notes.length}
            <div>
                <NoteListHeader />
            </div>
        </div>
    );
};

NoteList.PropTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    }
}, NoteList);