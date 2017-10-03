import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {NoteList} from "./NoteList"

const notes = [
    {
        _id: 'noteId1',
        title: 'title1',
        body: '',
        updatedAt: 0,
        userId: 'userId1'
    }, {
        _id: 'noteId2',
        title: 'title2',
        body: 'body2',
        updatedAt: 0,
        userId: 'userId2'
    }
];


if (Meteor.isClient) {

    describe('NoteList', function () {

        it('should render note list item for each note', function () {

            const wrapper = mount(<NoteList notes={notes}/>);

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);

        });


        it('should render NoteListEmptyItem if zero notes', function () {

            const wrapper = mount(<NoteList notes={[]}/>);

            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });

    });
}

