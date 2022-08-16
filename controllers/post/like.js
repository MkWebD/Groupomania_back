const Post = require('../../models/Post')

exports.likePost = async (req, res) => {
    try{
        // Destructuring
        const {like, userId} = req.body;
        // Find post that needs to be updated
        const post = await Post.findById({_id: req.params.id})
        // Using switch to handle all the cases
        switch(like) {
            // If like === 1
            case 1:
                if(!post.usersLiked.includes(userId) && !post.usersDisliked.includes(userId) && req.auth !== userId) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: userId}})
                    res.status(200).json(post)
                }
                break;
            // If like === 0
            case 0:
                if(post.usersLiked.includes(userId) && req.auth !== userId) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
                    res.status(200).json(post)
                }
                if(post.usersDisliked.includes(userId) && req.auth !== userId) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
                    res.status(200).json(post)
                }
                break;
            // If like === -1
            case -1:
                if(!post.usersDisliked.includes(userId) && !post.usersLiked.includes(userId) && req.auth !== userId) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: userId}})
                    res.status(200).json(post)
                }
                break;
        }
    } catch(err) {
        res.status(400).json({error: err})
    }
}