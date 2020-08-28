import commentBox from 'commentbox.io'
import React from 'react'

export default class CommentBox extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }

    componentWillUnmount(){
        this.removeCommentBox()
    }

    componentDidMount(){
        this.removeCommentBox=commentBox('5767093962145792-proj')
    }

    render(){
        return(
            <div className="commentbox" id={this.props.comment_id}></div>
        )
    }
}