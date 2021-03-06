

import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NotefulApp from '../NotefulApp/NotefulApp';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListMain}
                        />
                    ))}
                    <Route path="/note/:noteId" component={NotePageMain} />
            </>
        );
    }

    render() {
        const value = { 
            notes: this.state.notes,
            folders: this.state.folders,
            folderVar: this.folderVar,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder
        };

        return (
            <ApiContext.Provider value={value}>
                <NotefulApp 
                renderNavRoutes={this.renderNavRoutes} 
                renderMainRoutes={this.renderMainRoutes} />
            </ApiContext.Provider>
        );
    }
}

export default App;
