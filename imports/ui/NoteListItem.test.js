import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {

    describe('NoteListItem', function () {

        it('should render title and timestamp', function () {
            const title = 'some title';
            const updatedAt = 1506926832052;

            const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>)

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text().trim()).toBe('02/10/17');

        });

        it('should set default title if none set', function () {

            const updatedAt = 1506926832052;

            const wrapper = mount(<NoteListItem note={{upadtedAt: updatedAt}}/>)

            expect(wrapper.find('h5').text()).toBe('Untitled Note');
            expect(wrapper.find('p').text().trim()).toBe('03/10/17');
        });

    })
}