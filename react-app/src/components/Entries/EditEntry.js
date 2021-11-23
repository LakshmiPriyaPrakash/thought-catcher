import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEntry } from "../../store/entries";
import { useHistory, useParams } from 'react-router-dom';
import './Entries.css'


function EditEntry() {
    const user = useSelector(state => state.session.user);
    const { entryId } = useParams();
    const entry = useSelector(state => state.entries[entryId]);
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if(entry) {
            setTitle(entry.entry_title);
            setContent(entry.content);
        }
    }, [entry]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const user_id = user.id;
        const journal_id = entry.journal_id;
        const entry_title = title || "Untitled"

        const editedEntry = {
            id: entry.id,
            user_id,
            journal_id,
            entry_title,
            content
        };


        const data = await dispatch(updateEntry(editedEntry));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            history.push(`/entries/${data.id}`)
        }

      };


        return (
            <>
                <div className="story-form-container">
                        <form className="story-form" onSubmit={handleSubmit}>
                        <h2 className="ws-title">Your thoughts...</h2>
                        <ul className="ws-errors">
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className="ws-form-field">
                                <input
                                className="sf-input"
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus={true}
                                />
                        </div>
                        <div className="ws-form-field">
                                <textarea
                                className="sf-content"
                                id="content"
                                rows="15"
                                cols="70"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                />
                        </div>
                        <button className="ws-button" type="submit">Update</button>
                        </form>
                </div>
            </>
        );
}



export default EditEntry;
