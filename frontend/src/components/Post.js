import React from "react";

const Post = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const datetimeParser = (isoDate) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(isoDate)

        date = monthNames[date.getMonth()] + " " + date.getDate().toString() + ", " + date.getFullYear().toString() + "  -  " + date.getHours().toString() + ":" + date.getMinutes().toString()
        return date
    };

    const deleteHandler = async (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/posts/${props.post_data._id}`, {
            method: 'DELETE'
        })
    }
    return (
        <div className="card text-white bg-dark my-3 text-start">
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{datetimeParser(props.post_data.updatedAt)}</h6>
                <p className="card-text">{props.post_data.value}</p>
                <a href="#" className="card-link" onClick={(e) => deleteHandler(e)}>Delete</a>
            </div>
        </div>
    )
}

export default Post;