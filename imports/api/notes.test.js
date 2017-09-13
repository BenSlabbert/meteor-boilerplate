import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes'

if (Meteor.isServer) {
    describe('notes', function () {

        const note1 = {
            _id: 'testNoteId1',
            title: 'title 1',
            body: 'body 1',
            updateAt: 0,
            userId: 'testUserId1'
        };

        beforeEach(function () {
            Notes.remove({});
            Notes.insert(note1);
        });

        describe('insert', function () {
            it('should insert new note', function () {
                const userId = 'some user id';
                const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

                expect(Notes.findOne({ _id, userId })).toExist();
            });

            it('not insert note if not authenticated', function () {

                expect(() => {
                    Meteor.server.method_handlers['notes.insert']();
                }).toThrow();
            });
        });

        describe('remove', function () {
            it('should remove note', function () {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: note1.userId }, [note1._id]);

                expect(Notes.findOne({ _id: note1._id })).toNotExist();
            });

            it('should not remove not, not authenticated', function () {

                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({}, [note1._id]);
                }).toThrow();
            });

            it('should not remove not, no note ID', function () {

                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({ userId: note1.userId }, ['']);
                }).toThrow();
            });
        });

        describe('update', function () {
            it('should update note', function () {
                const title = 'updated title';
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: note1.userId
                }, [
                        note1._id,
                        { title }
                    ]
                );

                const note = Notes.findOne(note1._id);
                console.log(note);

                expect(note.updatedAt).toBeGreaterThan(0);

                expect(note).toInclude({
                    title,
                    body: note1.body
                });

            });

            it('should throw error, additional fields added to update', function () {
                const title = 'updated title';
                const other = 'other';

                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({
                        userId: note1.userId
                    }, [
                            note1._id,
                            {
                                title,
                                other
                            }
                        ]
                    );
                }).toThrow();

            });

            it('should not update note if user was not creator', function () {

                const title = 'updated title';
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: 'test Id'
                }, [
                        note1._id,
                        { title }
                    ]
                );

                const note = Notes.findOne(note1._id);
                console.log(note);

                expect(note).toInclude(note1);
            });

            it('should not update not, not authenticated', function () {

                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({}, [note1._id]);
                }).toThrow();
            });

            it('should not update not, no note ID', function () {

                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({ userId: note1.userId }, ['']);
                }).toThrow();
            });
        });

    });
}
